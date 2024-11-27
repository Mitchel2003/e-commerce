import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderCustom from '#/common/elements/HeaderCustom'
import InputField from '#/common/fields/Input'
import AreaField from '#/common/fields/Area'

const BusinessDataSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Información General"
        className="text-2xl font-semibold"
        span="Proporcione los datos básicos del emprendimiento"
        iconSpan="info"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <InputField
          name="businessData.name"
          placeholder="Digite el negocio"
          label="Nombre negocio"
          theme={theme}
        />
        <InputField
          name="businessData.category"
          placeholder="Digite la categoría del negocio"
          label="Categoría"
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