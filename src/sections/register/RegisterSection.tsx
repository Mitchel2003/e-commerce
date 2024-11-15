import SocialNetworkSection from "@/sections/register/SocialNetworkSection"
import PhotoSection from "@/sections/register/PhotoSection"
import DataSection from "@/sections/register/DataSection"

import FooterSubmit from "#/reusables/elements/FooterSubmit"
import HeaderForm from "#/reusables/elements/HeaderForm"
import { Card, CardContent } from "#/ui/card"

import { RegisterFormProps, registerSchema } from "@/schemas/auth/register.schema"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, useForm } from "react-hook-form"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { RenderFormat } from "@/utils/RenderFormat"
import { cn } from "@/lib/utils"

interface RegisterSectionProps extends ThemeContextProps { }

const RegisterSection = ({ theme }: RegisterSectionProps) => {
  const methods = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      photo: undefined,
      name: '',
      email: '',
      phone: '',
      description: '',
      socialNetworks: []
    }
  })

  const { signup, errors: authErrors = [] } = useAuthContext()

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log('Form data:', data)
    await signup(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {/* Errores de autenticación */}
        {authErrors.map((error, index) => (
          <div key={index} className="bg-red-500 text-white text-center my-2 p-2 rounded">
            {error}
          </div>
        ))}

        <Card className={cn(
          'my-6 w-full md:w-[calc(100vw-400px)] shadow-lg',
          'transition-all duration-200 backdrop-filter backdrop-blur-lg',
          theme === 'dark'
            ? 'bg-zinc-800 hover:shadow-gray-900'
            : 'bg-purple-50 hover:shadow-purple-500/60'
        )}>
          <HeaderForm
            theme={theme}
            title="Registro de emprendimiento"
            description="Formato de datos requeridos para registrar una empresa"
          />

          <CardContent className="pt-6 space-y-8">
            <RenderFormat
              format={[
                { component: <DataSection theme={theme} /> },
                { component: <PhotoSection theme={theme} /> },
                { component: <SocialNetworkSection theme={theme} /> }
              ]}
              theme={theme}
            />
          </CardContent>

          <FooterSubmit theme={theme} />
        </Card>
      </form>
    </FormProvider>
  )
}

export default RegisterSection