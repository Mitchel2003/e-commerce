import { RegisterFormProps, registerSchema } from "@/schemas/auth/register.schema"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues: RegisterFormProps = {
  password: '',
  name: '',
  email: '',
  phone: '',
  description: '',
  photo: undefined,
  socialNetworks: []
}

export const useRegisterForm = () => {
  const { signup } = useAuthContext()

  const methods = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues
  })

  const onSubmit = async (data: RegisterFormProps) => {
    try { await signup(data) }
    catch (error) { throw new Error(error as string) }
  }

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit)
  }
} 