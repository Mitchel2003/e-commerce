import { Business, Product, ThemeContextProps } from '@/interfaces/context.interface'
import ProductDialog from '#/pages/business/ProductDialog'
import { formatPrice, formatLikes } from '@/utils/format'
import { useIsMobile } from '@/hooks/ui/use-mobile'
import { Heart, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '#/ui/card'
import { Badge } from '#/ui/badge'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps {
  business: Business
}

const ItemProduct = ({ theme, business, ...product }: ItemProductProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <Card
        onClick={() => setIsDialogOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn('group relative h-full overflow-hidden cursor-pointer border-2',
          'transform transition-all duration-300 hover:scale-[0.98]',
          isHovered && (theme === 'dark' ? 'border-purple-500/30' : 'border-purple-500/20'),
          theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700/90' : 'bg-gray-100 hover:bg-gray-50/90',
          theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'
        )}
      >
        {/* Decorative gradient background */}
        <div className={cn(
          'absolute inset-0 opacity-10',
          'transition-opacity duration-300',
          'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
          isHovered && 'opacity-20'
        )} />

        {/* Likes Badge */}
        <Badge
          variant="secondary"
          className={cn(
            'group-hover:text-white',
            'backdrop-blur-md shadow-lg',
            'absolute top-2 right-2 z-10',
            'flex items-center gap-2 px-4 py-2',
            'transform transition-all duration-300',
            theme === 'dark'
              ? 'bg-zinc-800/90 text-purple-400 group-hover:bg-purple-500/20'
              : 'bg-white/90 text-purple-600 group-hover:bg-purple-500/10'
          )}
        >
          <Heart className={cn(
            'w-5 h-5 transition-transform duration-300',
            product.likes && product.likes > 0 ? 'fill-pink-500 text-pink-500' : 'group-hover:text-pink-500'
          )} />
          <span className="font-semibold text-base">{formatLikes(product.likes)}</span>
        </Badge>

        {/* Trending Badge - Show if product has more than 100 likes */}
        {product.likes && product.likes > 100 && (
          <Badge
            variant="secondary"
            className={cn(
              'absolute top-2 left-2 z-10',
              'backdrop-blur-md shadow-lg',
              'flex items-center gap-2 px-4 py-2',
              'transform transition-all duration-300',
              theme === 'dark'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400'
                : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600'
            )}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold text-base">Trending</span>
          </Badge>
        )}

        <div className="relative">
          <img
            alt={product.name}
            src={product.imageUrl}
            className={cn(
              'group-hover:shadow-lg',
              'w-full h-48 object-cover',
              'transform transition-all duration-300',
              theme === 'dark' ? 'group-hover:shadow-purple-500/10' : 'group-hover:shadow-purple-500/20'
            )}
          />
          {/* Overlay gradient on hover */}
          <div className={cn(
            'absolute inset-0',
            'transition-opacity duration-300',
            'opacity-0 group-hover:opacity-100',
            'bg-gradient-to-t from-black/50 via-black/30 to-transparent'
          )} />
        </div>

        <CardContent className="relative p-4 z-10">
          <div className={cn('grid gap-2', !isMobile && 'grid-cols-[1fr,auto]')}>
            <h3 className={cn('text-lg font-semibold line-clamp-2',
              theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
            )}>
              {product.name}
            </h3>
            <p className={cn('text-lg font-bold', !isMobile && 'text-right',
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            )}>
              {formatPrice(product.price)}
            </p>
          </div>
          <p className={cn('mt-2 text-sm line-clamp-3', theme === 'dark' ? 'text-zinc-400' : 'text-gray-600')}>
            {product.description}
          </p>
        </CardContent>
      </Card>

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