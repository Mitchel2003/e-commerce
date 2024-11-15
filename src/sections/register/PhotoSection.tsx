import { ThemeContextProps } from "@/interfaces/context.interface"
import ImageField from "#/reusables/fields/Image"
import { useForm } from "react-hook-form"
import HeaderCustom from "@/components/reusables/elements/HeaderCustom"

const PhotoSection = ({ theme }: ThemeContextProps) => {
  const methods = useForm()

  return (
    <div className="space-y-6">
      {/* -------------------- Header -------------------- */}
      <HeaderCustom
        to="component"
        theme={theme}
        title="Imagen"
        className="text-2xl font-bold"
        span="Tenga en cuenta que sea de buena calidad y promocione su emprendimiento"
        iconSpan="info"
      />

      {/* -------------------- Image field -------------------- */}
      <div className="md:col-span-3">
        <ImageField
          theme={theme}
          name="image"
          label="Imagen a publicar"
          control={methods.control}
        />
      </div>
    </div>
  )
}

export default PhotoSection