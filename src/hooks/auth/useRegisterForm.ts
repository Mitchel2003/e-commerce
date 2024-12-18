import { RegisterFormProps, registerSchema } from "@/schemas/auth.schema"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues = {
  accessCredentials: {
    email: '',
    password: ''
  },
  businessData: {
    name: '',
    phone: '',
    address: '',
    category: '',
    isLocal: false,
    description: ''
  },
  references: {
    photoUrl: [],
    socialNetworks: []
  }
}

export const useRegisterForm = () => {
  const { signup } = useAuthContext()

  const methods = useForm<RegisterFormProps>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: RegisterFormProps) => await signup(data))
  return { methods, onSubmit }
}