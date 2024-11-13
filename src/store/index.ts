// import { create } from "zustand";

// export type FavoriteTaskState = {
//     favoriteTaskIds: string[];
//     addFavoriteTask: (id: string) => void;
//     removeFavoriteTask: (id: string) => void;
//   }

// export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
//   favoriteTaskIds: [],
//   addFavoriteTask: (id: string) => set((state) => ({
//     favoriteTaskIds: [...state.favoriteTaskIds, id]
//   })),
//   removeFavoriteTask: (id: string) => set((state) => ({
//     favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
//   }))
// }));