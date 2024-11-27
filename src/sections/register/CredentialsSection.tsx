import { ThemeContextProps } from '@/interfaces/context.interface'
import HeaderCustom from '#/common/elements/HeaderCustom'
import InputField from '#/common/fields/Input'
import { Lock, Mail } from 'lucide-react'

const CredentialsSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className="space-y-6">
      <HeaderCustom
        to="component"
        theme={theme}
        iconSpan="alert"
        title="Credenciales de acceso"
        className="text-2xl font-semibold"
        span="Para acceder a tus datos y productos"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          name="accessCredentials.email"
          label="Correo electrónico"
          placeholder="Digite su correo electrónico"
          theme={theme}
          type="email"
          icon={Mail}
        />
        <InputField
          name="accessCredentials.password"
          placeholder="Digite su contraseña"
          label="Contraseña"
          theme={theme}
          type="password"
          icon={Lock}
        />
      </div>

    </div>
  )
}

export default CredentialsSection