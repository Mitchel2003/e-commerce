import { ThemeContextProps } from '@/interfaces/context.interface'
import ListProduct from '#/dashboard/ListProduct'
import { motion, Variants } from 'framer-motion'
import { products } from '@/utils/constants'
import { PlusCircle } from 'lucide-react'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'

interface ProductsSectionProps extends ThemeContextProps { variants: Variants }

const ProductsSection = ({ theme, variants }: ProductsSectionProps) => {
  return (
    <motion.section
      variants={variants}
      className="space-y-6"
    >
      <Header theme={theme} />
      <ListProduct
        products={products.newProducts}
        isLoading={false}
        theme={theme}
        error={null}
      />
    </motion.section>
  )
}

export default ProductsSection

const Header = ({ theme }: ThemeContextProps) => (
  <div className="flex justify-between items-center">
    <h2 className={cn(
      'text-2xl font-semibold',
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    )}> Tus Productos </h2>

    <Button variant={theme === 'dark' ? 'outline' : 'default'}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Añadir Producto
    </Button>
  </div>
)