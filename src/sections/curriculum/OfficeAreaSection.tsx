import { ThemeContextProps } from "@/interfaces/context.interface";
import { useForm, FormProvider } from "react-hook-form"
import SelectField from "#/reusables/fields/Select"

interface OfficeAreaProps extends ThemeContextProps { }

const OfficeAreaSection = ({ theme }: OfficeAreaProps) => {
  const methods = useForm<OfficeAreaProps>();

  return (
    <FormProvider {...methods}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <SelectField
          theme={theme}
          name="headquarter"
          label="Sede"
          options={["Sede 1", "Sede 2", "Sede 3"]}
          placeholder="Seleccionar sede"
        />
        <SelectField
          theme={theme}
          name="area"
          label="Area"
          options={["Area 1", "Area 2", "Area 3"]}
          placeholder="Seleccionar área"
        />
        <SelectField
          theme={theme}
          name="office"
          label="Consultorio"
          options={["Consultorio 1", "Consultorio 2", "Consultorio 3"]}
          placeholder="Seleccionar consultorio"
        />
        <SelectField
          theme={theme}
          name="service"
          label="Servicio"
          options={["Servicio 1", "Servicio 2", "Servicio 3"]}
          placeholder="Seleccionar servicio"
        />

      </div>
    </FormProvider>
  )
}

export default OfficeAreaSection