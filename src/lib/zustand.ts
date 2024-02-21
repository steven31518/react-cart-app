import { create } from "zustand";

export interface State {
  imageUrls: string[];
  mainImageUrl: string;
  addImage: (urls: string[]) => void;
  pickMainImage: (url: string) => void;
  removeAllImage: () => void;
}

export const useImageDropzoneStore = create<State>((set) => ({
  imageUrls: [],
  mainImageUrl: "",
  addImage: (urls) =>
    set((state) => ({ imageUrls: [...state.imageUrls, ...urls] })),
  pickMainImage: (url) => set({ mainImageUrl: url }),
  removeAllImage: () => set({ imageUrls: [], mainImageUrl: "" }),
}));
