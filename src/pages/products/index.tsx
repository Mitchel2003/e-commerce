import { ProductCarousel } from '#/product/ProductCarousel'
import { FeaturesSection } from '#/sections/FeaturesSection'
import { Product } from '@/interfaces/product.interface'

const ProductsPage = () => {
  // Mock data - replace with your API calls
  const newProducts: Product[] = [
    {
      id: '1',
      name: 'Casco Deportivo Pro',
      price: 299999,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Seguridad',
      rating: 4,
      isNew: true,
      discount: 15,
    },
    // Add more products...
  ]

  const bestSellers: Product[] = [
    {
      id: '2',
      name: 'Neumático Todo Terreno',
      price: 199999,
      image: '/placeholder.svg?height=400&width=400',
      category: 'Neumáticos',
      rating: 5,
      isBestSeller: true,
    },
    // Add more products...
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <FeaturesSection />
      
      <ProductCarousel
        title="¡Novedad para ti!"
        products={newProducts}
      />
      
      <ProductCarousel
        title="Más vendidos"
        products={bestSellers}
      />
    </div>
  )
}

export default ProductsPage 