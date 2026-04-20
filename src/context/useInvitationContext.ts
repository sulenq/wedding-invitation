import { create } from "zustand";

interface State {
  isOpened: boolean;
}

interface Store {
  state: State;
  set: (newState: Partial<State>) => void;
}

export const useInvitationContext = create<Store>((set) => ({
  state: {
    isOpened: false,
  },
  set: (newState) =>
    set((s) => ({
      state: {
        ...s.state,
        ...newState,
      },
    })),
}));