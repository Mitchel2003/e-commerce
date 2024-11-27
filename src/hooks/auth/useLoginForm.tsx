import { loginSchema, LoginFormProps } from '@/schemas/auth.schema'
import { useAuthContext } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const defaultValues = {
  email: '',
  password: ''
}

export const useLoginForm = () => {
  const { signin } = useAuthContext()

  const methods = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data) => await signin(data))
  return { methods, onSubmit }
}