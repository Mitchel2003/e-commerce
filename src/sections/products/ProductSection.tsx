import { CarouselProducts } from './CarouselSection'
import { FeaturesSection } from './FeaturesSection'
import { products } from '@/utils/constants'

const ProductSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FeaturesSection />

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