import { create } from 'zustand';

/**
 * A simple Zustand store to hold the image file temporarily
 * between the HomePage and the FactCheckDashboard.
 */
const useImageStore = create((set) => ({
  imageFile: null,
  setImageFile: (file) => set({ imageFile: file }),
  clearImageFile: () => set({ imageFile: null }),
}));

export default useImageStore; 