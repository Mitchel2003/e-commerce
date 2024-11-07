import { ProductCarousel } from '@/components/products/ProductCarousel'
import { FeaturesSection } from './FeaturesSection'
import { products } from '@/utils/constants'

const ProductSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FeaturesSection />

      <ProductCarousel
        title="¡Novedad para ti!"
        products={products.newProducts}
      />

      <ProductCarousel
        title="Más vendidos"
        products={products.bestSellers}
      />
    </div>
  )
}

export default ProductSection