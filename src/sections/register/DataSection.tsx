import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import InputField from "#/reusables/fields/Input"
import AreaField from "#/reusables/fields/Area"
import { useFormContext } from "react-hook-form"

const DataSection = ({ theme }: ThemeContextProps) => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Información General"
        className="text-2xl font-bold"
        span="Proporcione los datos básicos del emprendimiento"
        iconSpan="info"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            name="businessData.name"
            label="Nombre del emprendimiento"
            theme={theme}
            control={control}
            placeholder="Nombre del emprendimiento"
          />
          <InputField
            name="businessData.email"
            label="Correo electrónico"
            theme={theme}
            control={control}
            placeholder="Digite su correo electrónico"
          />
          <InputField
            name="businessData.phone"
            label="Teléfono"
            theme={theme}
            control={control}
            placeholder="Digite su teléfono de contacto"
          />
        </div>
        <AreaField
          name="businessData.description"
          label="Descripción"
          theme={theme}
          control={control}
          placeholder="Describa su emprendimiento"
          className="h-[calc(100%-20px)]"
        />
      </div>
    </div>
  )
}

export default DataSection