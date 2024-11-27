import { forgotSchema, ForgotFormProps } from "@/schemas/auth.schema"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues = {
  email: '',
}

export const useForgotForm = () => {
  const { sendResetEmail } = useAuthContext()

  const methods = useForm<ForgotFormProps>({
    resolver: zodResolver(forgotSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: ForgotFormProps) => {
    await sendResetEmail(data.email)
    methods.reset()
  })
  return { methods, onSubmit }
}