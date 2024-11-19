import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import SelectField from "#/reusables/fields/Select"
import InputField from "#/reusables/fields/Input"
// import AreaField from "#/reusables/fields/Area"
import { useFormContext } from "react-hook-form"

const DataSection = ({ theme }: ThemeContextProps) => {
  const { control } = useFormContext();
  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Información General"
        className="text-2xl font-bold"
        span="Proporcione los datos básicos del usuario"
        iconSpan="info"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
          <InputField
            name="name"
            label="Nombre"
            theme={theme}
            placeholder="Nombre del usuario"
          />
          <InputField
            name="email"
            label="Correo electrónico"
            theme={theme}
            placeholder="Digite su correo electrónico"
          />
          <InputField
            name="phone"
            label="Teléfono"
            theme={theme}
            placeholder="Digite su teléfono de contacto"
          />
          <SelectField
            name="role"
            label="Rol"
            theme={theme}
            control={control}
            options={['engineer', 'admin']}
            placeholder="Seleccione el rol a desempeñar"
          />
        
        {/* <AreaField
          name="businessData.description"
          label="Descripción"
          theme={theme}
          placeholder="Describa su emprendimiento"
          className="h-[calc(100%-20px)]"
        /> */}
      </div>
    </div>
  )
}

export default DataSection