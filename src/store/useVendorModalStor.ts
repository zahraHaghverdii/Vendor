import { create } from "zustand";
// import type { Vendors } from "../types/Vendors";

interface TVendorModalState {
  isOpen: boolean;
  mode: "add" | "edit" | "delete";
  vendorId: number | null;
  openModal: (
    mode: "add" | "edit" | "delete",
    vendorId?: number | null
  ) => void;
  closeModal: () => void;
}

export const useVendorModalStor = create<TVendorModalState>((set) => ({
  isOpen: false,
  mode: "add",
  vendorId: null,
  openModal: (mode, vendorId = null) => set({ isOpen: true, mode, vendorId }),
  closeModal: () => set({ isOpen: false, vendorId: null }),
}));
