import { ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import { useAuthContext } from '@/context/AuthContext'
import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import InfoSection from './InfoSection'

const DashboardSection = ({ theme }: ThemeContextProps) => {
  const { user } = useAuthContext()
  const { fetchBusinessById } = useQueryBusiness()
  const { data: business } = fetchBusinessById(user?.uid || '')

  const { fetchProducts } = useQueryProduct()
  const { data: products } = fetchProducts(user?.uid || '')

  if (!business) return <div>No business found</div>

  return (
    <div className="container p-8 space-y-8 mx-auto">
      <InfoSection theme={theme} business={business} />
      <StatisticsSection theme={theme} />
      <ProductsSection theme={theme} products={products} />
    </div>
  )
}

export default DashboardSection