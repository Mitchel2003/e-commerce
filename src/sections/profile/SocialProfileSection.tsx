import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderCustom from '#/common/elements/HeaderCustom'
import CardIterable from '#/common/fields/CardIterable'
import SelectField from '#/common/fields/Select'
import InputField from '#/common/fields/Input'

interface SocialNetworkProps extends ThemeContextProps { }

const SocialNetworkSection = ({ theme }: SocialNetworkProps) => {
  const fields = socialNetworkFields({ theme })

  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        title="Enlaces de redes sociales"
        className="text-2xl font-semibold"
        span="Comparta sus medios de difusión (opcional)"
        iconSpan="warn"
      />

      <CardIterable
        theme={theme}
        fields={fields}
        name="socialNetworks"
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
    name: "socialNetworks.type",
    component: (
      <SelectField
        theme={theme}
        label="Tipo de red social"
        name="socialNetworks.type"
        options={['Facebook', 'Instagram', 'Otro']}
        placeholder="Seleccione el tipo de red social"
      />
    )
  },
  {
    name: "socialNetworks.url",
    component: (
      <InputField
        theme={theme}
        label="URL de la red social"
        name="socialNetworks.url"
        placeholder="Ingrese la URL de su red social"
      />
    )
  }
])