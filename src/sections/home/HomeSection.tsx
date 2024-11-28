import { ThemeContextProps } from '@/interfaces/context.interface'
import DiscoverSection from '@/sections/home/DiscoverSection'
import { useBusinesses } from '@/hooks/business/useBusinessQuery'
import StoreSection from '@/sections/home/StoreSection'
import InfoSection from '@/sections/home/InfoSection'

const HomeSection = ({ theme }: ThemeContextProps) => {
  const { businesses } = useBusinesses()

  return (
    <div>
      <InfoSection theme={theme} />
      <DiscoverSection theme={theme} />
      <StoreSection
        stores={businesses}
        theme={theme}
      />
    </div>
  )
}

export default HomeSection