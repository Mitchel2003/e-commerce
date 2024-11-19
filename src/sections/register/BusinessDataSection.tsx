import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import InputField from "#/reusables/fields/Input"
import AreaField from "#/reusables/fields/Area"

const BusinessDataSection = ({ theme }: ThemeContextProps) => {
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InputField
          name="businessData.name"
          placeholder="Nombre del emprendimiento"
          label="Nombre"
          theme={theme}
        />
        <InputField
          name="businessData.address"
          placeholder="Digite su dirección"
          label="Dirección"
          theme={theme}
        />
        <InputField
          name="businessData.phone"
          placeholder="Digite su teléfono de contacto"
          label="Teléfono"
          theme={theme}
        />
      </div>
      <AreaField
        name="businessData.description"
        label="Descripción promocional"
        placeholder="Describa el emprendimiento en un texto promocional"
        className="h-[calc(100%-20px)]"
        theme={theme}
      />
    </div>
  )
}

export default BusinessDataSection