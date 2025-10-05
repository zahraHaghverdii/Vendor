import { create } from "zustand";

interface TUserName {
  userName: string;
  setUserName: (userName: string) => void;
}

export const useUserStore = create<TUserName>((set) => ({
  userName: "",
  setUserName: (userName) => set({ userName }),
}));
