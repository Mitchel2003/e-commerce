import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CardIterable from "#/reusables/fields/CardIterable"
import ImageField from "#/reusables/fields/Image"

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
        className="text-2xl font-bold"
        span="Sube hasta 3 imágenes representativas de tu negocio"
        iconSpan="info"
      />

      <CardIterable
        theme={theme}
        name="references.photoUrl.place"
        titleButton="Agregar imagen"
        fields={fields}
        limit={3}
      />
    </div>
  )
}

export default PhotoSection