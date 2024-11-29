import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import CarouselProduct from '#/pages/dashboard/CarouselProduct'
import { PlusCircle } from 'lucide-react'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'

interface ProductsSectionProps extends ThemeContextProps {
  products: Product[]
}

const ProductsSection = ({ theme, products }: ProductsSectionProps) => {
  return (
    <section
      className={cn(
        'space-y-6 py-12 px-8 bg-gradient-to-bl rounded-xl',
        theme === 'dark'
          ? 'from-zinc-950/80 to-purple-950/80'
          : 'from-purple-500/10 to-pink-500/10'
      )}
    >
      <Header theme={theme} />
      <CarouselProduct
        products={products}
        isLoading={false}
        theme={theme}
        error={null}
      />
    </section>
  )
}

export default ProductsSection

const Header = ({ theme }: ThemeContextProps) => (
  <div className="flex justify-between items-center">
    <h2 className={cn(
      'text-3xl font-bold',
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    )}> Tus Productos </h2>

    <Button variant="outline">
      <PlusCircle className="mr-2 h-4 w-4" />
      Añadir Producto
    </Button>
  </div>
)