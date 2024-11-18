import SocialNetworkSection from "@/sections/register/SocialNetworkSection"
import PhotoSection from "@/sections/register/PhotoSection"
import DataSection from "@/sections/register/DataSection"

import FooterSubmit from "#/reusables/elements/FooterSubmit"
import HeaderForm from "#/reusables/elements/HeaderForm"
import { Card, CardContent } from "#/ui/card"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { useRegisterForm } from "@/hooks/useRegisterForm"
import { useAuthContext } from "@/context/AuthContext"
import { FormProvider } from "react-hook-form"
import { cn } from "@/lib/utils"

const RegisterSection = ({ theme }: ThemeContextProps) => {
  const { methods, onSubmit } = useRegisterForm()
  const { errors: authErrors = [] } = useAuthContext()

  return (
    <FormProvider {...methods}>
      {authErrors.map((error, index) => (
        <div key={index} className="bg-red-500 text-white text-center my-2 p-2 rounded">
          {error}
        </div>
      ))}

      <form onSubmit={onSubmit}>
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
            <DataSection theme={theme} />
            <PhotoSection theme={theme} />
            <SocialNetworkSection theme={theme} />
          </CardContent>

          <FooterSubmit theme={theme} />
        </Card>
      </form>
    </FormProvider>
  )
}

export default RegisterSection