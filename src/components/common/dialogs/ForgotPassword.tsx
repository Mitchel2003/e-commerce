import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "#/ui/dialog"
import HeaderCustom from "#/common/elements/HeaderCustom"
import InputField from "#/common/fields/Input"
import { Button } from "#/ui/button"
import { Form } from "#/ui/form"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"

import { Mail, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { z } from "zod"

const forgotSchema = z.object({ email: z.string().email("Correo electrónico inválido") })
type ForgotFormData = z.infer<typeof forgotSchema>

interface ForgotPasswordProps extends ThemeContextProps { trigger: React.ReactNode }
const ForgotPassword = ({ theme, trigger }: ForgotPasswordProps) => {
  const [open, setOpen] = useState(false)
  const { sendResetEmail } = useAuthContext()

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" }
  })

  const onSubmit = async (data: ForgotFormData) => {
    await sendResetEmail(data.email)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn(
        'sm:max-w-[425px]',
        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
      )}>
        <DialogHeader>
          <DialogTitle>
            <HeaderCustom
              to="component"
              theme={theme}
              title="Recuperar contraseña"
              span="Te enviaremos un correo para restablecer tu contraseña"
              iconSpan="info"
              className="text-left"
            />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InputField
              name="email"
              type="email"
              label="Correo electrónico"
              icon={Mail}
              theme={theme}
              placeholder="correo@ejemplo.com"
            />

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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ForgotPassword 