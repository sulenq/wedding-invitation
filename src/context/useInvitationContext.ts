import { create } from "zustand";

interface State {
  isOpened: boolean;
}

interface Store {
  invitation: State;
  setInvitation: (newState: Partial<State>) => void;
}

export const useInvitationContext = create<Store>((set) => ({
  invitation: {
    isOpened: false,
  },
  setInvitation: (newState) =>
    set((s) => ({
      invitation: {
        ...s.invitation,
        ...newState,
      },
    })),
}));
