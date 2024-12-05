import { ThemeContextProps, User } from '@/interfaces/context.interface'
import DashboardSkeleton from '#/common/skeletons/DashboardSkeleton'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import { useAuthContext } from '@/context/AuthContext'
import NotFound from '#/common/states/NotFound'
import { Building2 } from 'lucide-react'

import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import InfoSection from './InfoSection'

const DashboardSection = ({ theme }: ThemeContextProps) => {
  const { user = {} as User } = useAuthContext()
  const { fetchBusinessById } = useQueryBusiness()
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(user.uid)
  const { fetchAllProducts } = useQueryProduct()
  const { data: products, isLoading: isLoadingProducts, error } = fetchAllProducts(user.uid)

  if (isLoadingBusiness || isLoadingProducts) return <DashboardSkeleton theme={theme} />
  if (!business) return (
    <NotFound
      theme={theme}
      title="Negocio no encontrado"
      message="No pudimos encontrar la información de tu negocio."
      illustration={<Building2 className="w-16 h-16" />}
    />
  )

  return (
    <div className="container p-8 space-y-8 mx-auto">
      <InfoSection theme={theme} business={business} />
      <StatisticsSection theme={theme} products={products} />
      <ProductsSection
        error={error}
        theme={theme}
        products={products}
      />
    </div>
  )
}

export default DashboardSection
