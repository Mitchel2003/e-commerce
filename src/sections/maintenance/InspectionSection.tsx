import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CheckboxField from "#/reusables/fields/Checkbox"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"

const inspectionOptions = [
  "Pedal", "Reles", "On/off", "Agujas",
  "Teclado", "Jeringas", "Sensores", "Pantalla"
]

interface InspectionProps extends ThemeContextProps { }
const InspectionSection = ({ theme }: InspectionProps) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <div className="space-y-4">
        <HeaderCustom
          to="component"
          theme={theme}
          title="Inspección"
          className="text-2xl font-bold"
          span="Seleccione las inspecciones realizadas"
          iconSpan="warn"
        />

        <CheckboxField
          theme={theme}
          isMultiple={true}
          label="Campos de inspección"
          control={methods.control}
          options={inspectionOptions}
        />
      </div>
    </FormProvider>
  )
}

export default InspectionSection