import { Business, Product, ThemeContextProps } from '@/interfaces/context.interface'
import ProductDialog from '#/pages/business/ProductDialog'
import { formatPrice } from '@/utils/format'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps {
  business: Business
}

const ItemProduct = ({ theme, business, ...product }: ItemProductProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className={cn(
          'h-full p-2 rounded-lg overflow-hidden shadow-lg cursor-pointer',
          'transform transition-all duration-300 hover:scale-[0.99]',
          theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-50'
        )}
      >
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
            {formatPrice(product.price)}
          </p>
          <p className={cn(
            'mt-2 text-sm line-clamp-3',
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          )}>
            {product.description}
          </p>
        </div>
      </div>

      <ProductDialog
        theme={theme}
        product={product}
        business={business}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  )
}

export default ItemProduct