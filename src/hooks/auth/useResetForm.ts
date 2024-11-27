import { resetPasswordSchema, ResetPasswordFormProps } from "@/schemas/auth.schema"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues = {
  newPassword: '',
  confirmPassword: '',
}

export const useResetPasswordForm = () => {
  const { verifyAction } = useAuthContext()

  const methods = useForm<ResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: object) => await verifyAction('resetPassword', data))
  return { methods, onSubmit }
}