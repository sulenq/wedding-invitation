# Final Fix: CSS-Class-Persistence Pattern

This plan resolves the persistent `Node.insertBefore` crash by ensuring the React component tree of pinned elements remains static during the "Open Invitation" transition.

## User Review Required

> [!IMPORTANT]
> **No UI Changes**: I will not change your design. The fix only changes the internal mechanism of how elements are hidden/shown and how state is managed to satisfy React and GSAP's pinning logic.

## Proposed Changes

### 1. Decouple Pinned Sections from React State
- [MODIFY] [page.tsx](file:///d:/.Personal/Works/.Personal/Template/Wedding/Invitation/wedding-invitation/src/app/page.tsx)
    - Remove `isOpened` prop from `Cover`.
    - Render all sections (`Intro`, `Gallery`, etc.) as static components.
    - Remove the `isOpened` dependency from the `Page` component's main rendering logic to prevent a root-level re-render.

### 2. Global CSS State Control
- [MODIFY] [page.tsx](file:///d:/.Personal/Works/.Personal/Template/Wedding/Invitation/wedding-invitation/src/app/page.tsx)
    - Add a `<style jsx global>` block.
    - Use selectors like `body:not(.is-opened) .chevron_down { visibility: hidden; }` and `body.is-opened .chevron_down { visibility: visible; }`.
    - This ensures the nodes exist in the DOM (static structure) but their visibility is toggled by the browser's CSS engine.

### 3. Isolated Entry Overlay
- [MODIFY] [page.tsx](file:///d:/.Personal/Works/.Personal/Template/Wedding/Invitation/wedding-invitation/src/app/page.tsx)
    - The "Open Invitation" overlay will be a separate component that manages its own animation.
    - Upon clicking the button, it will:
        1. Add `.is-opened` class to `document.body`.
        2. Set `document.body.style.overflow = "auto"`.
        3. Dispatch a custom window event `invitationOpened`.
        4. Fade itself out and then set its own state to `isOpen = true` (only affecting its locally).

### 4. Audio Graceful Degradation
- [MODIFY] [BgMusic.tsx](file:///d:/.Personal/Works/.Personal/Template/Wedding/Invitation/wedding-invitation/src/components/widget/BgMusic.tsx)
    - Listen for the `invitationOpened` event.
    - Add a `handleError` implementation to the `<audio>` element to prevent crashes if the file is missing or unsuitable.

## Verification Plan
1. **Load Page**: Verify it's locked and elements are hidden.
2. **Click Open**: Verify transition is smooth with NO console errors.
3. **Verify Integrity**: Verify GSAP scrub animations work perfectly.
4. **Audio Check**: Verify it plays if present, or fails silently if missing.
