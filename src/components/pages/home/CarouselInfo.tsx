import { ThemeContextProps } from '@/interfaces/context.interface'
import Carousel from '#/common/elements/Carousel'
import { cn } from '@/lib/utils'

interface Info { image: string, title: string, description: string }
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
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/

interface ItemInfoProps extends ThemeContextProps {
  description: string
  image: string
  title: string
}

const ItemInfo = ({ image, title, description, theme }: ItemInfoProps) => {
  return (
    <div className="relative w-full h-[500px]">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div
        className={cn(
          'p-8 absolute inset-0 text-white bg-black',
          'flex flex-col justify-center items-center',
          theme === 'dark'
            ? 'bg-opacity-50'
            : 'bg-opacity-25'
        )}
      >
        <h2 className={cn(
          'text-4xl font-bold mb-4',
          theme === 'dark'
            ? 'text-gray-200'
            : 'text-white'
        )}>{title}</h2>

        <p className={cn(
          'text-xl',
          theme === 'dark'
            ? 'text-gray-200'
            : 'text-white'
        )}>{description}</p>
      </div>
    </div >
  )
}