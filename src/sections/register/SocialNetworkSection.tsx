import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CardIterable from "#/reusables/fields/CardIterable"
import SelectField from "#/reusables/fields/Select"
import InputField from "#/reusables/fields/Input"

interface SocialNetworkProps extends ThemeContextProps { }

const SocialNetworkSection = ({ theme }: SocialNetworkProps) => {
  const fields = socialNetworkFields({ theme })

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

      <CardIterable
        theme={theme}
        name="references.socialNetworks"
        fields={fields}
        titleButton="Agregar red social"
        limit={3}
      />
    </div>
  )
}

export default SocialNetworkSection

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const socialNetworkFields = ({ theme }: ThemeContextProps) => ([
  {
    name: "references.socialNetworks.type",
    component: (
      <SelectField
        name="references.socialNetworks.type"
        label="Tipo de red social"
        options={['Facebook', 'Instagram', 'Otro']}
        placeholder="Seleccione el tipo de red social"
        theme={theme}
      />
    )
  },
  {
    name: "references.socialNetworks.url",
    component:
      <InputField
        name="references.socialNetworks.url"
        label="URL de la red social"
        theme={theme}
        placeholder="Ingrese la URL de su red social"
      />
  }
])