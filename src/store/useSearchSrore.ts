// store/useVendorSearchStore.ts
import { create } from "zustand";

interface TVendorSearch {
  companyName: string;
  setCompanyName: (companyName: string) => void;
}

export const useVendorSearchStore = create<TVendorSearch>((set) => ({
  companyName: "",
  setCompanyName: (companyName) => set({ companyName }),
}));
