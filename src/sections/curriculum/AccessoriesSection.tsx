import HeaderCustom from "#/reusables/elements/HeaderCustom"
import IterableCard from "#/reusables/fields/Card"
import InputField from "#/reusables/fields/Input"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { CardFieldProps } from "@/interfaces/form.interface"
import { FormProvider, useForm } from "react-hook-form"

interface AccessoriesProps extends ThemeContextProps { }

const AccessoriesSection = ({ theme }: AccessoriesProps) => {
  const methods = useForm<AccessoriesProps>()

  const accessoriesFields: CardFieldProps[] = [
    {
      name: "name",
      component: <InputField name="name" theme={theme} label="Nombre" control={methods.control} />
    },
    {
      name: "type",
      component: <InputField name="type" theme={theme} label="Tipo" control={methods.control} />
    },
    {
      name: "series",
      component: <InputField name="series" theme={theme} label="Serie" control={methods.control} />
    },
    {
      name: "model",
      component: <InputField name="model" theme={theme} label="Modelo" control={methods.control} />
    }
  ]

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <HeaderCustom
          to="component"
          theme={theme}
          title="Accesorios"
          className="text-2xl font-bold"
          span="Máximo 10 accesorios"
          iconSpan="alert"
        />

        <div className="grid grid-cols-1 gap-2">
          <HeaderCustom
            to="component"
            theme={theme}
            title="Crea accesorios para este equipo"
            span="Referencia periféricos, herramientas, etc."
            iconSpan="info"
          />

          <IterableCard
            limit={10}
            theme={theme}
            name="accessories"
            fields={accessoriesFields}
            control={methods.control}
            titleButton="Añadir accesorio para este equipo"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default AccessoriesSection