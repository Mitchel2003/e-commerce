import BusinessSkeleton from '#/common/skeletons/BusinessSkeleton'
import ItemProduct from "#/pages/business/CardProduct"
import NotProducts from '#/common/states/NotProducts'
import Carousel from '#/common/elements/Carousel'
import NotFound from '#/common/states/NotFound'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'
import { useQueryProduct } from '@/hooks/useProductQuery'
import { Metadata } from '@/interfaces/db.interface'
import { Building2 } from 'lucide-react'
import { cn } from "@/lib/utils"

import { BusinessDescription } from './DescriptionSection'
import { SocialMediaSection } from './SocialMediaSection'
import { BusinessHeader } from './HeaderSection'
import { BusinessStats } from './StatsSection'

interface BusinessSectionProps extends ThemeContextProps {
  idBusiness: string
}
export const BusinessSection = ({ theme, idBusiness }: BusinessSectionProps) => {
  const { fetchBusinessById, fetchAllBusinessImages } = useQueryBusiness()
  const { data: business, isLoading: isLoadingBusiness } = fetchBusinessById(idBusiness)
  const { data: images, isLoading: isLoadingImages } = fetchAllBusinessImages(idBusiness)

  const { fetchAllProducts } = useQueryProduct()
  const { data: products, isLoading: isLoadingProducts } = fetchAllProducts(idBusiness)

  if (isLoadingBusiness || isLoadingProducts || isLoadingImages) return <BusinessSkeleton theme={theme} />
  if (!business) return <NotFoundBusiness theme={theme} />

  const imagesBusiness = getImagesBusiness(images)
  return (
    <div className="container p-0 mx-auto">
      {/* header */}
      <BusinessHeader
        theme={theme}
        name={business.name}
        imageUrl={getRandomImage(imagesBusiness)}
      />

      {/* description */}
      <BusinessDescription
        theme={theme}
        images={imagesBusiness}
        description={business.description}
      />

      {/* Stats */}
      <BusinessStats
        theme={theme}
      />

      {/* products */}
      <section className={cn('py-16',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}>
        <div className="container mx-auto px-4">
          <h2 className={cn(
            'text-3xl font-semibold mb-8 text-center',
            theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
          )}>
            Nuestros Productos
          </h2>

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
              header='No se han encontrado productos'
              message='Por el momento no hay productos disponibles para mostrar'
            />
          )}
        </div>
      </section>

      {/* social networks */}
      {business.socialNetworks && (
        <SocialMediaSection
          contact={business.phone}
          socialMedia={business.socialNetworks}
          theme={theme}
        />
      )}
    </div>
  )
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const getImagesBusiness = (images: Metadata[] | undefined) => (images?.map(image => image.url) || ['https://placehold.co/600x400'])
const getRandomImage = (images: string[]) => (images[Math.floor(Math.random() * images.length)])

const NotFoundBusiness = ({ theme }: ThemeContextProps) => (
  <NotFound
    theme={theme}
    title="Negocio no encontrado"
    message="No pudimos encontrar la información de este negocio."
    illustration={<Building2 className="w-16 h-16" />}
  />
)
/*---------------------------------------------------------------------------------------------------------*/