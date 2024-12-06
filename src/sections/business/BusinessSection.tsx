import BusinessSkeleton from '#/common/skeletons/BusinessSkeleton'
import ItemProduct from "#/pages/business/CardProduct"
import NotProducts from '#/common/states/NotProducts'
import Carousel from '#/common/elements/Carousel'
import NotFound from '#/common/states/NotFound'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import { useParams } from 'react-router-dom'
import { Building2 } from 'lucide-react'

import { BusinessDescription } from './DescriptionSection'
import { SocialMediaSection } from './SocialMediaSection'
import { BusinessHeader } from './HeaderSection'

export const BusinessSection = ({ theme }: ThemeContextProps) => {
  const { id = '' } = useParams()
  const { fetchBusinessById } = useQueryBusiness()
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(id)

  const { fetchAllProducts } = useQueryProduct()
  const { data: products, isLoading: isLoadingProducts } = fetchAllProducts(id)

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
      {/* products */}
      {products && products.length > 0 ? (
        <Carousel
          autoplay
          withButtons
          items={products}
          className_Carousel="w-full"
          className_Item="md:basis-1/3"
          render={(item) => <ItemProduct theme={theme} {...item} />}
        />
      ) : (
        <NotProducts
          theme={theme}
          className='rounded-none'
          header='No se han encontrado productos'
          message='Por el momento no hay productos disponibles para mostrar'
        />
      )}
      {business.socialNetworks && (
        <SocialMediaSection
          socialMedia={business.socialNetworks}
          theme={theme}
        />
      )}
    </div>
  )
}