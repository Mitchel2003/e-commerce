import AreaToggleableField from "#/reusables/fields/AreaToggleable"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import SelectField from "#/reusables/fields/Select"
import InputField from "#/reusables/fields/Input"
import { Separator } from "#/ui/separator"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

interface MaintenanceProps extends ThemeContextProps { }
const MaintenanceSection = ({ theme }: MaintenanceProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <div className="space-y-4">
        <HeaderCustom
          to="component"
          theme={theme}
          title="Mantenimiento"
          className="text-2xl font-bold"
        />

        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-12">

          <div className="md:col-span-6">
            <div className="grid grid-cols-1 items-center gap-2">
              <SelectField
                theme={theme}
                name="tipoMantenimiento"
                label="Tipo de mantenimiento"
                control={methods.control}
                options={['preventivo', 'correctivo']}
                placeholder="Seleccione el tipo de mantenimiento"
                //to span
                span="Obligatorio"
                iconSpan="alert"
              />
              <AreaToggleableField
                theme={theme}
                name="equipmentFault"
                className="min-h-[55px]"
                label="¿Equipo presenta falla?"
                inputLabel="Descripción"
                placeholder="Ingrese los detalles"
                control={methods.control}
              />
            </div>
          </div>

          <div className="md:col-span-1 hidden md:flex justify-center items-center">
            <Separator
              orientation="vertical"
              className={`h-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}
            />
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-1 items-center gap-2">
              <InputField
                theme={theme}
                name="voltage"
                label="Voltaje"
                control={methods.control}
                placeholder="Indique el voltaje"
                //to span
                span="Coleccion de datos"
                iconSpan="info"
              />
              <InputField
                theme={theme}
                name="power"
                label="Potencia"
                control={methods.control}
                placeholder="Indique la potencia"
              />
              <InputField
                theme={theme}
                name="current"
                label="Corriente"
                control={methods.control}
                placeholder="Indique la corriente electrica"
              />
            </div>
          </div>

        </div>
      </div>
    </FormProvider>
  )
}

export default MaintenanceSection