import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import { useFormContext } from "react-hook-form"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"
import InputField from "#/reusables/fields/Input"
import { useFieldArray } from "react-hook-form"

interface SocialNetworkProps extends ThemeContextProps {}

type NetworkType = {
  type: 'Facebook' | 'Instagram' | 'Otro'
  url: string
}

const SocialNetworkSection = ({ theme }: SocialNetworkProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialNetworks"
  })

  const addNetwork = (type: NetworkType['type']) => {
    append({ type, url: '' })
  }

  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Enlaces de redes sociales"
        className="text-2xl font-bold"
        span="Comparta sus redes sociales o medios de difusión (opcional)"
        iconSpan="warn"
      />

      <div className="grid grid-cols-1 gap-4">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="relative p-4 rounded-lg border shadow-sm space-y-4"
            style={{
              backgroundColor: theme === 'dark' ? '#27272a' : '#ffffff',
              borderColor: theme === 'dark' ? '#3f3f46' : '#e5e7eb'
            }}
          >
            <div className="flex justify-between items-center">
              <span className={cn(
                "text-sm font-medium",
                theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'
              )}>
                {field.id[index]}
              </span>
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                size="sm"
                className="h-8"
              >
                Eliminar
              </Button>
            </div>

            <InputField
              name={`socialNetworks.${index}.url`}
              label={`URL de ${field.id[index]}`}
              theme={theme}
              placeholder={`Ingrese su URL de ${field.id[index]}`}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {['Facebook', 'Instagram', 'Otro'].map((networkType) => (
          <Button
            key={networkType}
            type="button"
            onClick={() => addNetwork(networkType as NetworkType['type'])}
            className={cn(
              'flex-1 min-w-[150px]',
              theme === 'dark'
                ? 'bg-zinc-700 text-white hover:bg-zinc-600'
                : 'bg-white text-black hover:bg-gray-100'
            )}
          >
            Agregar {networkType}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SocialNetworkSection