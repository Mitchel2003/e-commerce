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
        fields={fields}
        name="references.socialNetworks"
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
        theme={theme}
        label="Tipo de red social"
        name="references.socialNetworks.type"
        options={['Facebook', 'Instagram', 'Otro']}
        placeholder="Seleccione el tipo de red social"
      />
    )
  },
  {
    name: "references.socialNetworks.url",
    component: (
      <InputField
        theme={theme}
        label="URL de la red social"
        name="references.socialNetworks.url"
        placeholder="Ingrese la URL de su red social"
      />
    )
  }
])