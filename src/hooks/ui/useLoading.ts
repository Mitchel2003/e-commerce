import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  text: string
  hide: () => void
  show: (text?: string) => void
}

export const useLoadingScreen = create<LoadingState>((set) => ({
  isLoading: false,
  text: 'Cargando...',
  hide: () => set({ isLoading: false }),
  show: (text = 'Cargando...') => set({ isLoading: true, text }),
}))