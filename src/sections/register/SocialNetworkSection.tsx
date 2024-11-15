import HeaderCustom from "#/reusables/elements/HeaderCustom"
import IterableCustomCard from "#/reusables/fields/Card"
import InputField from "#/reusables/fields/Input"
import { Button } from "#/ui/button"

import { Theme, ThemeContextProps } from "@/interfaces/context.interface"
import { useForm, UseFormReturn, FieldValues } from "react-hook-form"
import { CardFieldProps } from "@/interfaces/props.interface"

const SocialNetworkSection = ({ theme }: ThemeContextProps) => {
  const methods = useForm()

  return (
    <div className="space-y-6">
      {/* -------------------- Header -------------------- */}
      <HeaderCustom
        to="component"
        theme={theme}
        title="Enlaces de redes sociales"
        className="text-2xl font-bold"
        span="Comparte tus redes sociales o medios de difusión (opcional)"
        iconSpan="warn"
      />

      {/* -------------------- Basic data -------------------- */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <IterableCustomCard
            theme={theme}
            name="add-facebook"
            titleButton="Facebook"
            control={methods.control}
            fields={supplierFields("facebook", { methods, theme })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <IterableCustomCard
            theme={theme}
            name="add-instagram"
            titleButton="Instagram"
            control={methods.control}
            fields={supplierFields("instagram", { methods, theme })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <IterableCustomCard
            theme={theme}
            name="add-other"
            titleButton="Otro"
            control={methods.control}
            fields={supplierFields("other", { methods, theme })}
          />
        </div>
      </div>
    </div>
  )
}

export default SocialNetworkSection

interface configFields {
  methods: UseFormReturn<FieldValues, undefined>
  theme: Theme
}

const supplierFields = (name: string, { methods, theme }: configFields): CardFieldProps[] => [
  {
    name: name,
    component:
      <form className='flex flex-col gap-2' onSubmit={methods.handleSubmit(data => console.log(data))}>
        <InputField name="link" control={methods.control} label="Enlace red social" theme={theme} />
        <Button variant="outline" type="submit">Guardar</Button>
      </form>
  }
]