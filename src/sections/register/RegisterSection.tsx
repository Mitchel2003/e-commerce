import FooterSubmit from "#/reusables/elements/FooterSubmit"
import PhotoSection from "@/sections/register/PhotoSection"
import DataSection from "@/sections/register/DataSection"
import HeaderForm from "#/reusables/elements/HeaderForm"
import { Card, CardContent } from "#/ui/card"

import { RegisterFormProps, registerSchema } from "@/schemas/auth/register.schema"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { RenderFormat, SectionProps } from "@/utils/RenderFormat"
import { FormProvider, useForm } from "react-hook-form"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

const defaultValues = { email: '', description: '', phone: '', socialNetwork: '', image: undefined }

interface RegisterSectionProps extends ThemeContextProps { }

const RegisterSection = ({ theme }: RegisterSectionProps) => {
  const methods = useForm<RegisterFormProps>({ resolver: zodResolver(registerSchema), defaultValues })
  const { signup, errors: authErrors = [] } = useAuthContext()
  const render = renderCVForm({ theme })

  const onSubmit = methods.handleSubmit(async (data) => await signup(data))

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {/* -------------------- Render errors -------------------- */}
        {authErrors.map((e, i) => (<div key={i} className="bg-red-500 text-white text-center my-2 p-2 rounded">{e}</div>))}

        {/* -------------------- Container card -------------------- */}
        <Card
          id="register-form"
          className={cn(
            'my-6 w-full md:w-[calc(100vw-400px)] shadow-lg',
            'transition-all duration-200 backdrop-filter backdrop-blur-lg',
            theme === 'dark'
              ? 'bg-zinc-800 hover:shadow-gray-900'
              : 'bg-purple-50 hover:shadow-purple-500/60'
          )}
        >

          {/* -------------------- Header form -------------------- */}
          <HeaderForm
            theme={theme}
            title="Registro de emprendimiento"
            description="Formato de datos requeridos para registrar una empresa"
          />

          {/* -------------------- Content form -------------------- */}
          <CardContent className="pt-6 space-y-8">
            <RenderFormat format={render} theme={theme} />
          </CardContent>

          {/* -------------------- Footer form -------------------- */}
          <FooterSubmit theme={theme} />

        </Card>
      </form>
    </FormProvider>
  )
}
export default RegisterSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Nos ayuda a renderizar el curriculum
 * @param {string} theme Corresponde al tema en contexto
 * @returns {SectionProps[]} Arreglo de secciones del curriculum
 */
const renderCVForm = ({ theme }: ThemeContextProps): SectionProps[] => ([
  { component: <DataSection theme={theme} /> },
  { component: <PhotoSection theme={theme} /> },
])
/*---------------------------------------------------------------------------------------------------------*/