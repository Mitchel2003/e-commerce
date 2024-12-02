import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import CarouselProduct from '#/pages/dashboard/CarouselProduct'
import NewProduct from '#/common/dialogs/NewProduct'
import { cn } from '@/lib/utils'

interface ProductsSectionProps extends ThemeContextProps {
  products: Product[]
  isLoading: boolean
  error: Error | null
}

const ProductsSection = ({ theme, products, isLoading, error }: ProductsSectionProps) => {
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
        error={error}
        theme={theme}
        products={products}
        isLoading={isLoading}
      />
    </section>
  )
}

export default ProductsSection

const Header = ({ theme }: ThemeContextProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className={cn(
        'text-3xl font-bold',
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      )}> Tus Productos </h2>

      <NewProduct theme={theme} />
    </div>
  )
}