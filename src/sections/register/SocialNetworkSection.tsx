import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import { Button } from "#/ui/button"

import { useFormContext, useFieldArray } from "react-hook-form"
import { cn } from "@/lib/utils"

interface SocialNetworkProps extends ThemeContextProps { }

const networks = [
  {
    name: 'facebook',
    label: 'URL de Facebook',
    placeholder: 'Ingrese su URL de Facebook'
  },
  {
    name: 'instagram',
    label: 'URL de Instagram',
    placeholder: 'Ingrese su URL de Instagram'
  },
  {
    name: 'other',
    label: 'URL de Red Social',
    placeholder: 'Ingrese su URL de Red Social'
  }
]

const SocialNetworkSection = ({ theme }: SocialNetworkProps) => {
  const { control } = useFormContext()
  const { fields: items, append, remove } = useFieldArray({ control, name })

  const handleAppend = () => {
    const initialValue = {} as Record<string, string>
    const newItem = networks.reduce((acc, field) => { acc[field.name] = ''; return acc }, initialValue)
    append(newItem)
  }

  const addNetwork = (type: string) => {
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
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="mt-8"
            >
              Eliminar
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => addNetwork('Facebook')}
          className={cn(
            theme === 'dark'
              ? 'bg-zinc-700 text-white'
              : 'bg-white text-black'
          )}
        >
          Agregar Facebook
        </Button>
        <Button
          type="button"
          onClick={() => addNetwork('Instagram')}
          className={cn(
            theme === 'dark'
              ? 'bg-zinc-700 text-white'
              : 'bg-white text-black'
          )}
        >
          Agregar Instagram
        </Button>
        <Button
          type="button"
          onClick={() => addNetwork('Otro')}
          className={cn(
            theme === 'dark'
              ? 'bg-zinc-700 text-white'
              : 'bg-white text-black'
          )}
        >
          Agregar Otro
        </Button>
      </div>
    </div>
  )
}

export default SocialNetworkSection