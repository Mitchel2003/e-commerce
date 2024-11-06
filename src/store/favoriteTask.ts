import { FavoriteTaskState } from "../interfaces/props.interface";
import { create } from "zustand";

export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
  favoriteTaskIds: [],
  addFavoriteTask: (id: string) => set((state) => ({
    favoriteTaskIds: [...state.favoriteTaskIds, id]
  })),
  removeFavoriteTask: (id: string) => set((state) => ({
    favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
  }))
}));