import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#/ui/carousel'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Button } from '#/ui/button'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { SkeletonProduct } from '#/dashboard/SkeletonProduct'
import { EmptyProduct } from '#/dashboard/EmptyProduct'
import { Product } from '@/types/form/product.type'
import { Trash2, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ListProductProps extends ThemeContextProps {
  products?: Product[]
  isLoading: boolean
  error: Error | null
}

const ListProduct = ({ products, isLoading, error, theme }: ListProductProps) => {
  if (isLoading) return <SkeletonProduct />
  if (error) return <div className="text-center text-red-500">Error al cargar los productos</div>
  if (!products?.length || products.length === 0) return <EmptyProduct />

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/3">
            <ItemProduct {...product} theme={theme} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute size-10 -left-5" />
      <CarouselNext className="absolute size-10 -right-5" />
    </Carousel>
  )
}

export default ListProduct

interface ItemProductProps extends Product, ThemeContextProps { }
const ItemProduct = ({ name, price, image, theme }: ItemProductProps) => (
  <Card className={cn(
    theme === 'dark'
      ? 'bg-zinc-900 border-zinc-800 text-white'
      : 'bg-gray-100 border-purple-300 text-zinc-900'
  )}>
    {/* Header */}
    <CardHeader>
      <CardTitle className="text-lg">{name}</CardTitle>
      <CardDescription>${price.toFixed(2)}</CardDescription>
    </CardHeader>

    {/* Content */}
    <CardContent>
      <img
        alt={name}
        src={image}
        className={cn('w-full h-[calc(100vh-300px)] object-cover rounded-md')}
      />
    </CardContent>

    {/* Footer */}
    <CardFooter className="flex justify-between">
      <Button
        size="sm"
        variant="ghost"
        className={cn(
          theme === 'dark'
            ? 'bg-zinc-700/70 hover:bg-zinc-800'
            : 'bg-gray-300 hover:bg-gray-300/70'
        )}
      >
        <Edit className="mr-2 h-4 w-4" />
        Editar
      </Button>
      <Button
        size="sm"
        variant="destructive"
        className={cn(theme === 'dark' ? 'bg-red-700' : 'bg-red-500')}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Eliminar
      </Button>
    </CardFooter>
  </Card>
)