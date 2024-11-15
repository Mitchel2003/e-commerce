import { ThemeContextProps } from '@/interfaces/context.interface'
import { CarouselProducts } from './CarouselSection'
import { FeaturesSection } from './FeaturesSection'
import { products } from '@/utils/constants'

const ProductSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FeaturesSection theme={theme} />

      <CarouselProducts
        title="¡Novedad para ti!"
        products={products.newProducts}
      />

      <CarouselProducts
        title="Más vendidos"
        products={products.bestSellers}
      />
    </div>
  )
}

export default ProductSection