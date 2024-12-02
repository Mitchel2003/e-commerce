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

  const { fetchAllProducts } = useQueryProduct()
  const { data: products } = fetchAllProducts(user?.uid || '')

  if (!business) return <div>Business not found</div>

  return (
    <div className="container p-8 space-y-8 mx-auto">
      <InfoSection theme={theme} business={business} />
      <StatisticsSection theme={theme} />
      <ProductsSection theme={theme} products={products} />
    </div>
  )
}

export default DashboardSection