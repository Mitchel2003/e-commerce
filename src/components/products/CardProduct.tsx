import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Card, CardContent, CardFooter } from '#/ui/card'
import { Product } from '@/types/form/product.type'
import { Button } from '#/ui/button'
import { Badge } from '#/ui/badge'
import { cn } from '@/lib/utils'

interface CardProductProps { product: Product }
export const CardProduct = ({ product }: CardProductProps) => {
  return (
    <Card className="relative group">
      <ProductBadges product={product} />
      <CardContent className="p-0">
        <ProductImage product={product} />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <ProductRating rating={product.rating} />
        <ProductInfo product={product} />
      </CardFooter>
    </Card>
  )
}

/** ProductBadges: badges of the product */
const ProductBadges = ({ product }: { product: Product }) => (
  <>
    {product.discount && (
      <Badge className="absolute z-[1] top-2 right-2 bg-green-500/80">-{product.discount}%</Badge>
    )}
    {product.isNew && (
      <Badge className="absolute z-[1] top-2 left-2 bg-primary">Nuevo</Badge>
    )}
  </>
)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Content--------------------------------------------------*/
/** ProductImage: image of the product */
const ProductImage = ({ product }: { product: Product }) => (
  <div className="aspect-square relative overflow-hidden rounded-t-lg">
    <img
      src={product.image}
      alt={product.name}
      className={cn(
        'object-cover w-full h-full',
        'transition-transform group-hover:scale-105'
      )}
    />
    <ProductOverlay />
  </div>
)

/** ProductOverlay: overlay of the product */
const ProductOverlay = () => (
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
    <Button size="icon" variant="secondary">
      <ShoppingCart className="h-4 w-4" />
    </Button>
    <Button size="icon" variant="secondary">
      <Heart className="h-4 w-4" />
    </Button>
  </div>
)
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Footer--------------------------------------------------*/
/** ProductRating: rating of the product */
const ProductRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn('h-4 w-4',
          i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'
        )}
      />
    ))}
  </div>
)

/** ProductInfo: information of the product */
const ProductInfo = ({ product }: { product: Product }) => (
  <>
    <h3 className="font-semibold line-clamp-2">{product.name}</h3>
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold">
        ${product.price.toLocaleString('es-ES')}
      </span>
      {product.discount && (
        <span className="text-sm text-muted-foreground line-through">
          ${((product.price * 100) / (100 - product.discount)).toLocaleString('es-ES')}
        </span>
      )}
    </div>
  </>
)
/*---------------------------------------------------------------------------------------------------------*/