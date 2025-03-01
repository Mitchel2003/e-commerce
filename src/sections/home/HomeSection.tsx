import { ThemeContextProps } from '@/interfaces/context.interface'
import DiscoverSection from '@/sections/home/DiscoverSection'
import BusinessSection from '@/sections/home/BusinessSection'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import InfoSection from '@/sections/home/InfoSection'
import { useState } from 'react'

const HomeSection = ({ theme }: ThemeContextProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { fetchAllBusinesses, fetchBusinessByQuery } = useQueryBusiness()

  const { data: allBusinesses } = fetchAllBusinesses()
  const { data: filteredBusinesses } = fetchBusinessByQuery({
    filters: selectedCategory ? [{ field: 'tag', operator: '==', value: selectedCategory }] : undefined,
    enabled: !!selectedCategory,
    limit: 50,
  })

  const businesses = selectedCategory ? (filteredBusinesses || []) : (allBusinesses || [])
  return (
    <div>
      <InfoSection theme={theme} />
      <DiscoverSection theme={theme} onCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <BusinessSection businesses={businesses} theme={theme} />
    </div>
  )
}

export default HomeSection