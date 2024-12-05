import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import ProductActions from './ProductActions'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps { }

const ItemProduct = ({ theme, ...product }: ItemProductProps) => {
  //fix color of card
  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      theme === 'dark'
        ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800/90'
        : 'bg-white hover:bg-gray-50 hover:shadow-lg'
    )}>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="font-semibold text-sm">
          ${Number(product.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <img
          alt={product.name}
          src={product.imageUrl}
          className={cn(
            'w-full h-96 object-cover rounded-md',
            'transition-transform duration-300 hover:scale-105'
          )}
        />
        <p className="mt-4 text-sm line-clamp-2 text-muted-foreground">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* Actions */}
        <ProductActions theme={theme} product={product} />
      </CardFooter>
    </Card>
  )
}

export default ItemProduct