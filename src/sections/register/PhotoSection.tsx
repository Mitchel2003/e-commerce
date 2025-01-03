import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderCustom from '#/common/elements/HeaderCustom'
import CardIterable from '#/common/fields/CardIterable'
import ImageField from '#/common/fields/Image'

const PhotoSection = ({ theme }: ThemeContextProps) => {
  const fields = [{
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

      <CardIterable
        theme={theme}
        name="references.photoUrl"
        titleButton="Agregar imagen"
        fields={fields}
        limit={3}
      />
    </div>
  )
}

export default PhotoSection