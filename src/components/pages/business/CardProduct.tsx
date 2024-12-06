import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps { }

const ItemProduct = ({ theme, ...product }: ItemProductProps) => {
  return (
    <div className={cn(
      'h-full p-2 rounded-lg overflow-hidden shadow-lg',
      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
    )}>
      <div className="relative h-48">
        <img
          alt={product.name}
          src={product.imageUrl}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="p-4">
        <h3 className={cn(
          'text-lg font-semibold mb-2',
          theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
        )}>
          {product.name}
        </h3>
        <p className={cn(
          'text-lg font-bold',
          theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
        )}>
          ${Number(product.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </p>
        <p className={cn(
          'mt-2 text-sm line-clamp-3',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}>
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ItemProduct