import { ThemeContextProps } from "@/interfaces/context.interface"
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import CardIterable from "#/reusables/fields/CardIterable"
import InputField from "#/reusables/fields/Input"
import { CardFieldProps } from "@/interfaces/props.interface"

interface SocialNetworkProps extends ThemeContextProps { }

const SocialNetworkSection = ({ theme }: SocialNetworkProps) => {
  const socialNetworkFields: CardFieldProps[] = [
    {
      name: "url",
      component:
        <InputField
          name="url"
          label="URL de la red social"
          theme={theme}
          placeholder="Ingrese la URL de su red social"
        />
    }
  ]

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
        name="socialNetworks"
        fields={socialNetworkFields}
        limit={3}
        titleButton="Agregar red social"
      />
    </div>
  )
}

export default SocialNetworkSection