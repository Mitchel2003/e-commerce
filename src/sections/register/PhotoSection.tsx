import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import ImageField from "#/reusables/fields/Image"
import { useFormContext } from "react-hook-form"

const PhotoSection = ({ theme }: ThemeContextProps) => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Imagen"
        className="text-2xl font-bold"
        span="Tenga en cuenta que sea de buena calidad y promocione su emprendimiento"
        iconSpan="info"
      />

      <div className="md:col-span-3">
        <ImageField
          theme={theme}
          name="references.photo"
          label="Imagen a publicar"
          control={control}
        />
      </div>
    </div>
  )
}

export default PhotoSection