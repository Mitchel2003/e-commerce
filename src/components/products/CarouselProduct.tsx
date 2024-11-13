import { CarouselProductsProps } from '@/types/form/product.type'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CardProduct } from '#/products/CardProduct'
import { Button } from '#/ui/button'
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '#/ui/carousel'

export const CarouselHeader = ({ title }: { title: string }) => (
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

export const CarouselCard = ({ products }: { products: CarouselProductsProps['products'] }) => (
  <Carousel
    opts={{ align: 'start', loop: true }}
    className="w-full"
  >
    <CarouselContent className="-ml-4">
      {products.map((product) => (
        <CarouselItem key={product.id} className="pl-4 md:basis-1/3 lg:basis-1/4">
          <CardProduct product={product} />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
) 