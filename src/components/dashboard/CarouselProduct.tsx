import { ThemeContextProps } from '@/interfaces/context.interface'
import { ShoppingBag, PlusCircle } from 'lucide-react'
import Carousel from '#/reusables/elements/Carousel'
import { Product } from '@/types/form/product.type'
import ItemProduct from '#/dashboard/ItemProduct'

import { Card, CardContent, CardFooter, CardHeader } from '#/ui/card'
import { Skeleton } from '#/ui/skeleton'
import { Button } from '#/ui/button'

interface CarouselProductProps extends ThemeContextProps {
  products?: Product[]
  isLoading: boolean
  error: Error | null
}

const CarouselProduct = ({ products, isLoading, error, theme }: CarouselProductProps) => {
  if (isLoading) return <SkeletonProduct />
  if (error) return <div className="text-center text-red-500">Error al cargar los productos</div>
  if (!products?.length || products.length === 0) return <EmptyProduct />

  return (
    <Carousel
      autoplay
      withButtons
      items={products}
      className_Carousel="w-full"
      className_Item="md:basis-1/3"
      render={(item) => ItemProduct({ theme, ...item })}
    />
  )
}

export default CarouselProduct

const EmptyProduct = () => (
  <Card className="p-8 text-center">
    <CardContent>
      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-semibold">No tienes productos aún</h3>
      <p className="mt-2 text-muted-foreground">Comienza añadiendo tu primer producto para mostrar en tu tienda.</p>
    </CardContent>
    <CardFooter className="justify-center">
      <Button><PlusCircle className="mr-2 h-4 w-4" /> Añadir tu primer producto</Button>
    </CardFooter>
  </Card>
)


export const SkeletonProduct = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <Card key={index}>
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </CardFooter>
      </Card>
    ))}
  </div>
)