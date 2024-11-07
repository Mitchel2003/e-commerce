import { CarouselHeader, CarouselCard } from '#/products/CarouselProduct'
import { CarouselProductsProps } from '@/interfaces/product.interface'
import { cn } from '@/lib/utils'

export const CarouselProducts = ({ title, products, className }: CarouselProductsProps) => {
  return (
    <section className={cn('space-y-4', className)}>
      <CarouselHeader title={title} />
      <CarouselCard products={products} />
    </section>
  )
}