export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
}

export interface CarouselProductsProps {
  title: string
  products: Product[]
  className?: string
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
} 