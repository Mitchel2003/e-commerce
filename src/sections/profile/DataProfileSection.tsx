import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderCustom from '#/common/elements/HeaderCustom'
import CheckboxField from '#/common/fields/Checkbox'
import InputField from '#/common/fields/Input'
import AreaField from '#/common/fields/Area'

const DataSection = ({ theme }: ThemeContextProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="name"
          placeholder="Digite el negocio"
          label="Nombre negocio"
          theme={theme}
        />
        <InputField
          name="category"
          placeholder="Digite la categoría del negocio"
          label="Categoría"
          theme={theme}
        />

        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="address"
              placeholder="Digite su dirección"
              label="Dirección"
              theme={theme}
            />
            <InputField
              name="phone"
              placeholder="Digite su teléfono de contacto"
              label="Teléfono"
              theme={theme}
            />
            <CheckboxField
              name="isLocal"
              description="¿Es regional?"
              label="Negocio regional"
              span="Opcional"
              iconSpan="info"
              theme={theme}
            />
          </div>
        </div>

      </div>
      <AreaField
        name="description"
        label="Descripción promocional"
        placeholder="Describa el emprendimiento en un texto promocional"
        className="h-[calc(100%-20px)]"
        theme={theme}
      />
    </div>
  )
}

export default DataSection