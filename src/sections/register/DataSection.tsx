import HeaderCustom from "#/reusables/elements/HeaderCustom"
import InputField from "#/reusables/fields/Input"
import AreaField from "#/reusables/fields/Area"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { useForm } from "react-hook-form"

const DataSection = ({ theme }: ThemeContextProps) => {
  const methods = useForm()

  return (
    <div className="space-y-6">
      {/* -------------------- Header -------------------- */}
      <HeaderCustom
        to="component"
        theme={theme}
        title="Información General"
        className="text-2xl font-bold"
        span="Propocione los datos básicos del emprendimiento"
        iconSpan="info"
      />

      {/* -------------------- Basic data -------------------- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            name="businessName"
            label="Nombre del emprendimiento"
            theme={theme}
            control={methods.control}
            placeholder="Nombre del emprendimiento"
          />
          <InputField
            name="email"
            label="Correo electrónico"
            theme={theme}
            control={methods.control}
            placeholder="Digite su correo electrónico"
          />
          <InputField
            name="phone"
            label="Teléfono"
            theme={theme}
            control={methods.control}
            placeholder="Digite su teléfono de contacto"
          />
        </div>
        <AreaField
          name="description"
          label="Descripción"
          theme={theme}
          control={methods.control}
          placeholder="Describa su emprendimiento"
          className="h-[calc(100%-20px)]"
        />
      </div>


    </div >
  )
}

export default DataSection