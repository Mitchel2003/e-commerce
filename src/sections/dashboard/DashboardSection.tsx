import { ThemeContextProps, BusinessStats } from '@/interfaces/context.interface'
import DashboardSkeleton from '#/common/skeletons/DashboardSkeleton'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import { useAuthContext } from '@/context/AuthContext'
import { ShieldCheck, Building2 } from 'lucide-react'
import NotFound from '#/common/states/NotFound'

import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import InfoSection from './InfoSection'

const DashboardSection = ({ theme }: ThemeContextProps): JSX.Element => {
  const { fetchBusinessById, fetchBusinessStatsById } = useQueryBusiness()
  const { fetchAllProducts } = useQueryProduct()
  const { user } = useAuthContext()

  if (!user?.uid) return <SessionExpired theme={theme} />
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(user.uid)
  const { data: products, isLoading: isLoadingProducts, error } = fetchAllProducts(user.uid)
  const { data: stats = { uniqueVisitors: 0, totalVisits: 0 } as BusinessStats, isLoading: isLoadingStats } = fetchBusinessStatsById(user.uid)

  if (isLoadingBusiness || isLoadingProducts || isLoadingStats) return <DashboardSkeleton theme={theme} />
  if (!business) return <BusinessNotFound theme={theme} />
  return (
    <div className='container p-4 md:p-8 space-y-4 md:space-y-8 mx-auto'>
      <InfoSection business={business} theme={theme} />
      <StatisticsSection theme={theme} products={products} stats={stats} />
      <ProductsSection products={products} theme={theme} error={error} />
    </div>
  )
}

export default DashboardSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const SessionExpired = ({ theme }: ThemeContextProps) => {
  return (
    <NotFound
      theme={theme}
      title="La sesión ha expirado"
      message="Por favor, vuelve a iniciar sesión"
      illustration={<ShieldCheck className="w-16 h-16" />}
    />
  )
}

const BusinessNotFound = ({ theme }: ThemeContextProps) => {
  return (
    <NotFound
      theme={theme}
      title="Negocio no encontrado"
      message="No pudimos encontrar la información de tu negocio."
      illustration={<Building2 className="w-16 h-16" />}
    />
  )
}
