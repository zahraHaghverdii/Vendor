import { create } from "zustand";

interface Location {
  lat: number | null;
  lng: number | null;
}

interface TShowLocationMapStore {
  id: number | null;
  setLocationId: (id: number | null) => void;
  location: Location;
  setLocation: (location: Location) => void;
}

export const useShowLocationMapStore = create<TShowLocationMapStore>((set) => ({
  id: null,
  setLocationId: (id) => set({ id }),
  location: {
    lat: null,
    lng: null,
  },
  setLocation: (location) => set({ location }),
}));
