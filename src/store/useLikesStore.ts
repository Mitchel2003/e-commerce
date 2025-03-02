import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LikedProduct {
  productId: string
  businessId: string
}

interface LikesState {
  likedProducts: LikedProduct[]
  hasLiked: (productId: string) => boolean
  addLike: (productId: string, businessId: string) => void
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      likedProducts: [],
      addLike: (productId: string, businessId: string) => set((state) => ({
        likedProducts: [...state.likedProducts, { productId, businessId }]
      })),
      hasLiked: (productId: string) => get().likedProducts.some((product) => product.productId === productId)
    }),
    { name: 'likes-storage' }
  )
)
