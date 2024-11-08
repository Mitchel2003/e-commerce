import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '#/ui/carousel'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Button } from '#/ui/button'

import { SkeletonProduct } from '#/dashboard/SkeletonProduct'
import { EmptyProduct } from '#/dashboard/EmptyProduct'
import { Product } from '@/interfaces/product.interface'
import { Trash2, Edit } from 'lucide-react'

interface ListProductProps {
  products?: Product[]
  isLoading: boolean
  error: Error | null
}

const ListProduct = ({ products, isLoading, error }: ListProductProps) => {
  if (isLoading) return <SkeletonProduct />
  if (error) return <div className="text-center text-red-500">Error al cargar los productos</div>
  if (!products?.length || products.length === 0) return <EmptyProduct />

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/3">
            <ItemProduct {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ListProduct

// Componente de Producto
const ItemProduct: React.FC<Product> = ({ name, price, image }) => (
  <Card>
    {/* Header */}
    <CardHeader>
      <CardTitle className="text-lg">{name}</CardTitle>
      <CardDescription>${price.toFixed(2)}</CardDescription>
    </CardHeader>

    {/* Content */}
    <CardContent>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
    </CardContent>

    {/* Footer */}
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm">
        <Edit className="mr-2 h-4 w-4" />
        Editar
      </Button>
      <Button variant="destructive" size="sm">
        <Trash2 className="mr-2 h-4 w-4" />
        Eliminar
      </Button>
    </CardFooter>
  </Card>
)