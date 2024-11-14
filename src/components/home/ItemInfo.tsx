import { ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface ItemInfoProps extends ThemeContextProps {
  image: string
  title: string
  description: string
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

export default ItemInfo