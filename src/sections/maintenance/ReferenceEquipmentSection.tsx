import HeaderCustom from "#/reusables/elements/HeaderCustom"
import SelectField from "#/reusables/fields/Select"
import InputField from "#/reusables/fields/Input"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

const optionsEquipment = [
  'Compac Q - servicio recepcion - salon 12 - odontologia',
  'Taladro metalico - servicio dental - salon 12 - odontologia'
]

interface EquipmentProps extends ThemeContextProps { }
const ReferenceEquipmentSection = ({ theme }: EquipmentProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <div className="space-y-4">
        <HeaderCustom
          to="component"
          theme={theme}
          title="Referencia al equipo"
          className="text-2xl font-bold"
          span={'Equipo asociado al formato'}
          iconSpan='warn'
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SelectField
            theme={theme}
            name="equipment"
            label="Equipo para mantenimiento"
            control={methods.control}
            options={optionsEquipment}
            placeholder="Seleccionar el equipo"
          />

          <InputField
            theme={theme}
            name="service"
            label="Servicio"
            control={methods.control}
            placeholder="Servicio del equipo"
          />

          <InputField
            theme={theme}
            name="address"
            label="Ubicación"
            control={methods.control}
            placeholder="Ubicación del equipo"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default ReferenceEquipmentSection