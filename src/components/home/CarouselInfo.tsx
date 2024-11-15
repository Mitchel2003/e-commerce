import { ThemeContextProps } from '@/interfaces/context.interface'
import Carousel from '#/reusables/elements/Carousel'
import ItemInfo from '#/home/ItemInfo'

interface Info {
  image: string
  title: string
  description: string
}

interface CarouselInfoProps extends ThemeContextProps {
  informations?: Info[]
  isLoading: boolean
  error: Error | null
}

const CarouselInfo = ({ informations, isLoading, error, theme }: CarouselInfoProps) => {
  if (isLoading) return <div>Cargando...</div>
  if (error) return <div className="text-center text-red-500">Error al cargar el carousel</div>
  if (!informations?.length || informations.length === 0) return <div>No hay información</div>

  return (
    <Carousel
      autoplay
      items={informations}
      className_Carousel="flex relative overflow-hidden"
      className_Item="flex-shrink-0 w-full"
      render={(item) => ItemInfo({ theme, ...item })}
    />
  )
}

export default CarouselInfo