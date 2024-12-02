import { ThemeContextProps } from "@/interfaces/context.interface"
import { useForgotForm } from "@/hooks/auth/useForgotForm"
import { DialogField } from "@/interfaces/props.interface"
import { Mail, ChevronRight } from "lucide-react"
import InputField from "#/common/fields/Input"
import Dialog from "#/common/dialogs/Dialog"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"

const ForgotPassword = ({ theme }: ThemeContextProps) => {//working here...
  const { methods, onSubmit } = useForgotForm()

  return (
    <Dialog
      // props header custom
      theme={theme}
      iconSpan="info"
      title="Recuperar contraseña"
      description="Te enviaremos un correo para restablecer tu contraseña"

      // props form
      fields={fields({ theme })}
      form={{ methods, onSubmit }}
      trigger={<Trigger theme={theme} />}
      submitButton={<SubmitButton theme={theme} />}
    />
  )
}

export default ForgotPassword

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const Trigger = ({ theme }: ThemeContextProps) => (
  <button
    type="button"
    className={cn(
      'font-medium transition-colors duration-300',
      theme === 'dark'
        ? 'text-purple-100 hover:text-purple-200'
        : 'text-purple-600 hover:text-purple-500'
    )}
  >
    ¿Olvidaste tu contraseña? <Mail className="ml-2 h-4 w-4" />
  </button>
)

const SubmitButton = ({ theme }: ThemeContextProps) => (
  <Button
    type="submit"
    className={cn(
      'w-full text-white',
      'transition-all duration-300 transform hover:scale-105',
      theme === 'dark'
        ? 'bg-purple-600 hover:bg-purple-700'
        : 'bg-purple-800 hover:bg-purple-900'
    )}
  >
    Enviar correo <ChevronRight className="ml-2 h-4 w-4" />
  </Button>
)

const fields = ({ theme }: ThemeContextProps): DialogField[] => [
  {
    name: "email",
    component: (
      <InputField
        name="email"
        type="email"
        icon={Mail}
        theme={theme}
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
      />
    )
  }
] 