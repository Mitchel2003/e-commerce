import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CheckboxField from "#/reusables/fields/Checkbox"
import SelectField from "#/reusables/fields/Select"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

interface MaintenanceProps extends ThemeContextProps { }

const MaintenanceSection = ({ theme }: MaintenanceProps) => {
  const methods = useForm<MaintenanceProps>()

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* -------------------- Header -------------------- */}
        <HeaderCustom
          to="component"
          theme={theme}
          title="Mantenimiento"
          className="text-2xl font-bold"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            theme={theme}
            name="performing_maintenance"
            label="Realización de Mantenimiento"
            placeholder="Seleccionar tipo"
            options={['Propio', 'Contratado']}
          />
          <CheckboxField
            theme={theme}
            isMultiple={true}
            label="Tipo de Mantenimiento"
            control={methods.control}
            options={['Preventivo', 'Correctivo', 'Predictivo']}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectField
            theme={theme}
            name="frequency_maintenance"
            label="Frecuencia de Mantenimiento"
            placeholder="Seleccionar frecuencia"
            options={['3 meses', '4 meses', '6 meses', '12 meses']}
          />
          <CheckboxField
            theme={theme}
            label="Manuales"
            control={methods.control}
            options={['servicio', 'componentes', 'usuario', 'despiece']}
          />
        </div>

      </div>
    </FormProvider>
  )
}

export default MaintenanceSection