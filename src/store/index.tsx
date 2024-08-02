import { create } from "zustand";

interface StoreState {
  me: any | null;
}

export const useStore = create<StoreState>(() => ({
  me: null,
}));
