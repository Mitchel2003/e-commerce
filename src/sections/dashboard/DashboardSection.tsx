import { ThemeContextProps } from '@/interfaces/context.interface'
import { useAuthContext } from '@/context/AuthContext'
import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import InfoSection from './InfoSection'

const DashboardSection = ({ theme }: ThemeContextProps) => {
  const { business } = useAuthContext()

  if (!business) return <div>No business found</div>
  
  return (
    <div className="container space-y-8 p-0 mx-auto">
      <InfoSection theme={theme} auth={business} />
      <StatisticsSection theme={theme} />
      <ProductsSection theme={theme} />
    </div>
  )
}

export default DashboardSection