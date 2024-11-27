import { Carousel as ShadcnCarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#/ui/carousel'
import { Props } from '@/interfaces/props.interface'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

interface CarouselProps<T> extends Props {
  items: T[]
  autoplay?: boolean
  withButtons?: boolean
  className_Item?: string
  className_Carousel?: string
  render: (item: T) => React.ReactNode
}

const Carousel = ({
  items,
  render,
  autoplay,
  className_Item,
  className_Carousel,
  withButtons = false,
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