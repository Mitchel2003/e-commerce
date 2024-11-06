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
          control={methods.control}
          options={["Sede 1", "Sede 2", "Sede 3"]}
          placeholder="Seleccionar sede"
        />
        <SelectField
          theme={theme}
          name="area"
          label="Area"
          control={methods.control}
          options={["Area 1", "Area 2", "Area 3"]}
          placeholder="Seleccionar área"
        />
        <SelectField
          theme={theme}
          name="office"
          label="Consultorio"
          control={methods.control}
          options={["Consultorio 1", "Consultorio 2", "Consultorio 3"]}
          placeholder="Seleccionar consultorio"
        />
        <SelectField
          theme={theme}
          name="service"
          label="Servicio"
          control={methods.control}
          options={["Servicio 1", "Servicio 2", "Servicio 3"]}
          placeholder="Seleccionar servicio"
        />

      </div>
    </FormProvider>
  )
}

export default OfficeAreaSection