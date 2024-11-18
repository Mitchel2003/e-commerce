import HeaderCustom from "#/reusables/elements/HeaderCustom"
import IterableCard from "#/reusables/fields/CardIterable"
import InputField from "#/reusables/fields/Input"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { CardFieldProps } from "@/interfaces/props.interface"
import { FormProvider, useForm } from "react-hook-form"

interface AccessoriesProps extends ThemeContextProps { }

const AccessoriesSection = ({ theme }: AccessoriesProps) => {
  const methods = useForm<AccessoriesProps>()

  const accessoriesFields: CardFieldProps[] = [
    {
      name: "name",
      component: <InputField name="name" theme={theme} label="Nombre" />
    },
    {
      name: "type",
      component: <InputField name="type" theme={theme} label="Tipo" />
    },
    {
      name: "series",
      component: <InputField name="series" theme={theme} label="Serie" />
    },
    {
      name: "model",
      component: <InputField name="model" theme={theme} label="Modelo" />
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
            titleButton="Añadir accesorio para este equipo"
          />
        </div>
      </div>
    </FormProvider>
  )
}

export default AccessoriesSection