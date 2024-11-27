import { ThemeContextProps } from '@/interfaces/context.interface'
import { useResetPasswordForm } from '@/hooks/auth/useResetForm'
import { Lock, KeyRound, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { cn } from '@/lib/utils'

import { Card, CardFooter, CardContent } from '#/ui/card'
import HeaderForm from '@/components/common/elements/HeaderForm'
import InputField from '@/components/common/fields/Input'
import { Button } from '#/ui/button'

const VerifyResetSection = ({ theme }: ThemeContextProps) => {
  const { methods, onSubmit } = useResetPasswordForm()

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Card
          className={cn(
            'relative w-full my-10',
            'transition-all duration-300',
            'backdrop-filter backdrop-blur-lg',
            theme === 'dark'
              ? 'bg-zinc-800/90 hover:shadow-purple-900/60'
              : 'bg-white hover:shadow-purple-500/60'
          )}
        >
          <HeaderForm
            theme={theme}
            title="Restablecer Contraseña"
            className="bg-transparent/0"
            description="Ingresa tu nueva contraseña para continuar"
          />
          <FormSection theme={theme} />
          <FooterSection theme={theme} />
        </Card>
      </form>
    </FormProvider>
  )
}

export default VerifyResetSection

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const FormSection = ({ theme }: ThemeContextProps) => {
  return (
    <CardContent className="space-y-6">
      <InputField
        name="newPassword"
        type="password"
        label="Nueva Contraseña"
        icon={Lock}
        theme={theme}
        span="Mínimo 6 caracteres"
        iconSpan="info"
      />      
      <InputField
        name="confirmPassword"
        type="password"
        label="Confirmar Contraseña"
        icon={KeyRound}
        theme={theme}
      />

      <Button
        type="submit"
        className={cn(
          'text-white w-full',
          'transition-all duration-300 transform hover:scale-105',
          theme === 'dark'
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-purple-800 hover:bg-purple-900'
        )}
      >
        Restablecer Contraseña <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  )
}

const FooterSection = ({ theme }: ThemeContextProps) => {
  const navigate = useNavigate()
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center">
        <button
          type="button"
          onClick={() => navigate('/auth/login')}
          className={cn(
            'font-medium transition-colors duration-300',
            theme === 'dark'
              ? 'text-purple-100 hover:text-purple-200'
              : 'text-purple-600 hover:text-purple-500'
          )}
        >
          Volver al inicio de sesión
        </button>
      </div>
    </CardFooter>
  )
}

