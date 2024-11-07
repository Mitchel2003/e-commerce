import { ProductCarouselProps } from '@/interfaces/product.interface'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '#/ui/carousel'

export const ProductCarousel = ({ title, products, className }: ProductCarouselProps) => {
  return (
    <section className={cn('space-y-4', className)}>
      <CarouselHeader title={title} />
      <CarouselCard products={products} />
    </section>
  )
}

const CarouselHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">{title}</h2>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
)

const CarouselCard = ({ products }: { products: ProductCarouselProps['products'] }) => (
  <Carousel
    opts={{ align: 'start', loop: true }}
    className="w-full"
  >
    <CarouselContent className="-ml-4">
      {products.map((product) => (
        <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
          <ProductCard product={product} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
) 