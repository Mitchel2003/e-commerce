import BusinessSkeleton from '#/common/skeletons/BusinessSkeleton'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import NotFound from '#/common/states/NotFound'
import { useParams } from 'react-router-dom'
import { Building2 } from 'lucide-react'

import { ProductCarousel } from './ProductCarouselSection'
import { BusinessDescription } from './DescriptionSection'
import { SocialMediaSection } from './SocialMediaSection'
import { BusinessHeader } from './HeaderSection'

export const BusinessSection = ({ theme }: ThemeContextProps) => {
  const { id = '' } = useParams()
  const { fetchBusinessById } = useQueryBusiness()
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(id)

  const { fetchAllProducts } = useQueryProduct(id)
  const { data: products, isLoading: isLoadingProducts } = fetchAllProducts()

  if (isLoadingBusiness || isLoadingProducts) return <BusinessSkeleton theme={theme} />
  if (!business) return (
    <NotFound
      theme={theme}
      title="Negocio no encontrado"
      message="No pudimos encontrar la información de este negocio."
      illustration={<Building2 className="w-16 h-16" />}
    />
  )

  return (
    <div className="container p-0 mx-auto">
      <BusinessHeader
        name={business.name}
        imageUrl={business.photoUrl[0]}
        theme={theme}
      />
      <BusinessDescription
        description={business.description}
        images={business.photoUrl}
        theme={theme}
      />
      <ProductCarousel
        products={products || []}
        theme={theme}
      />
      {business.socialNetworks && (
        <SocialMediaSection
          socialMedia={business.socialNetworks}
          theme={theme}
        />
      )}
    </div>
  )
}