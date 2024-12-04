import { ThemeContextProps } from '@/interfaces/context.interface'
import { Product } from '@/interfaces/context.interface'
import ItemProduct from '#/pages/dashboard/ItemProduct'
import NotProducts from '#/common/states/NotProducts'
import Carousel from '#/common/elements/Carousel'

interface CarouselProductProps extends ThemeContextProps {
  products?: Product[]
  error: Error | null
}

const CarouselProduct = ({ products, error, theme }: CarouselProductProps) => {
  if (error) return <div className="text-center text-red-500">Error al cargar los productos: {error.message}</div>
  if (!products?.length || products.length === 0) return <NotProducts theme={theme} />

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