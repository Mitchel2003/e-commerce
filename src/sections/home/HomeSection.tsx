import { ThemeContextProps } from '@/interfaces/context.interface'
import DiscoverSection from '@/sections/home/DiscoverSection'
import BusinessSection from '@/sections/home/BusinessSection'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import InfoSection from '@/sections/home/InfoSection'

const HomeSection = ({ theme }: ThemeContextProps) => {
  const { fetchAllBusinesses } = useQueryBusiness()
  const { data: businesses, isLoading } = fetchAllBusinesses()

  if (isLoading) return <div> Cargando... </div>
  return (
    <div>
      <InfoSection theme={theme} />
      <DiscoverSection theme={theme} />
      <BusinessSection businesses={businesses || []} theme={theme} />
    </div>
  )
}

export default HomeSection