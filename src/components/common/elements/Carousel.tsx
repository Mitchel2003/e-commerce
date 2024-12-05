import { Carousel as ShadcnCarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

interface CarouselProps<T> {
  items: T[]
  autoplay?: boolean
  withButtons?: boolean
  className_Item?: string
  className_Carousel?: string
  render: (item: T) => React.ReactNode
}

const Carousel = ({
  withButtons = false,
  className_Carousel,
  className_Item,
  autoplay,
  render,
  items,
}: CarouselProps<any>) => {

  return (
    <ShadcnCarousel
      className={cn(className_Carousel)}
      plugins={autoplay ? [Autoplay({ delay: 5000 })] : []}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={cn(className_Item)}>
            {render(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
      {withButtons && (
        <>
          <CarouselPrevious className="absolute size-10 -left-5" />
          <CarouselNext className="absolute size-10 -right-5" />
        </>
      )}
    </ShadcnCarousel>
  )
}

export default Carousel