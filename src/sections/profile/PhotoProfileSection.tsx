import DashboardSkeleton from '#/common/skeletons/DashboardSkeleton'
import HeaderCustom from '#/common/elements/HeaderCustom'
import CardIterable from '#/common/fields/CardIterable'
import Carousel from '#/common/elements/Carousel'
import ItemPhoto from '#/pages/profile/ItemPhoto'
import NotFound from '#/common/states/NotFound'
import ImageField from '#/common/fields/Image'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { useQueryBusiness } from '@/hooks/useBusinessQuery'

interface PhotoProfileSectionProps extends ThemeContextProps {
  idBusiness: string
}
const PhotoProfileSection = ({ theme, idBusiness }: PhotoProfileSectionProps) => {
  const { fetchAllBusinessImages } = useQueryBusiness()
  const { data: images, isLoading: isLoadingImages } = fetchAllBusinessImages(idBusiness)

  if (isLoadingImages) return <DashboardSkeleton theme={theme} />

  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Imágenes del lugar"
        className="text-2xl font-semibold"
        span="Sube hasta 3 imágenes representativas de tu negocio"
        iconSpan="info"
      />

      {/* preview */}
      {images && images.length > 0 ? (
        <Carousel
          autoplay
          withButtons
          items={images}
          className_Carousel="w-full"
          className_Item="md:basis-1/3"
          render={(item) => <ItemPhoto theme={theme} idBusiness={idBusiness} {...item} />}
        />
      ) : (
        <NotFound
          theme={theme}
          title='No tienes ninguna foto aún'
          message='Comienza añadiendo tu primera foto para mostrar en tu perfil.'
        />
      )}

      <CardIterable
        theme={theme}
        name="photoUrl"
        titleButton="Agregar imagen"
        fields={fields({ theme })}
        limit={3 - (images?.length ?? 0)}
      />
    </div>
  )
}

export default PhotoProfileSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const fields = ({ theme }: ThemeContextProps) => [{
  name: "file",
  component: (
    <ImageField
      name="file"
      theme={theme}
      label="Imagen referencial"
      span="La imagen debe ser clara y representativa"
      iconSpan="info"
    />
  )
}]