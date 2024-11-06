import HeaderForm from "#/reusables/elements/HeaderForm"
import { Card } from "#/ui/card"

import FooterSection from "./FooterSection"
import FormSection from "./FormSection"

import { loginSchema, LoginFormProps } from "@/schemas/loginSchema"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

interface LoginProps extends ThemeContextProps { }

const Login = ({ theme }: LoginProps) => {
  const { signin, errors: authErrors = [] } = useAuthContext()

  const methods = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = methods.handleSubmit(async (data) => await signin(data))

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {/* -------------------- Render errors -------------------- */}
        {authErrors.map((e, i) => (
          <div key={i} className="bg-red-500 text-white text-center my-2 p-2 rounded">
            {e}
          </div>
        ))}

        {/* -------------------- Container card -------------------- */}
        <Card
          className={cn(
            'relative w-full transition-all duration-300 backdrop-filter backdrop-blur-lg',
            theme === 'dark'
              ? 'bg-zinc-800/90 hover:shadow-purple-900/60'
              : 'bg-white hover:shadow-purple-500/60'
          )}
        >
          {/* -------------------- Header -------------------- */}
          <HeaderForm
            theme={theme}
            title="Bienvenido"
            className="bg-transparent/0"
            description="Ingresa tus credenciales para acceder"
          />

          {/* -------------------- Form -------------------- */}
          <FormSection theme={theme} />

          {/* -------------------- Footer -------------------- */}
          <FooterSection theme={theme} />

        </Card>
      </form>
    </FormProvider>
  )
}

export default Login