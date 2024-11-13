import { CarouselProps, CarouselContext as TypeCarouselContext } from '@/interfaces/props.interface'
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CarouselContext = createContext<TypeCarouselContext | null>(null)

export const useCarouselContext = () => {
  const context = useContext(CarouselContext)
  if (!context) throw new Error('Carousel components must be used within a Carousel')
  return context
}

export const Carousel = ({ children, autoPlay = true, interval = 5000 }: CarouselProps) => {
  const childrenArray = React.Children.toArray(children)
  const [index, setIndex] = useState(0)

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % childrenArray.length)
  }, [childrenArray.length])

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + childrenArray.length) % childrenArray.length)
  }, [childrenArray.length])

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next])

  return (
    <CarouselContext.Provider value={{ index, setIndex, next, prev }}>
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {children}
        </div>
        <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2" onClick={prev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={next}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </CarouselContext.Provider>
  )
}

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-shrink-0 w-full">{children}</div>
}