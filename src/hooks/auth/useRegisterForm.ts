import { RegisterFormProps, registerSchema, RegisterUpdateFormProps, RegisterUpdateImageFormProps, registerUpdateImageSchema, registerUpdateSchema } from "@/schemas/auth.schema"
import { useBusinessMutation } from "@/hooks/useBusinessQuery"
import { Business } from "@/interfaces/context.interface"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

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

/** Hook personalizado para manejar el formulario de registro */
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

const defaultValuesUpdate = {
  name: '',
  phone: '',
  address: '',
  category: '',
  isLocal: false,
  description: '',
  socialNetworks: []
}
/**
 * Hook personalizado para manejar el formulario de actualización de productos
 * @param product - Producto actual a actualizar
 * @param onSubmitCallback - Callback que se ejecuta al enviar el formulario
 */
export const useUpdateBusinessForm = (business: Business) => {
  const { updateBusiness } = useBusinessMutation()

  const methods = useForm<RegisterUpdateFormProps>({
    resolver: zodResolver(registerUpdateSchema),
    defaultValues: defaultValuesUpdate,
    mode: "onSubmit"
  })

  // Cargar datos iniciales del negocio
  useEffect(() => {
    business && methods.reset({
      name: business.name,
      phone: business.phone,
      address: business.address,
      category: business.category,
      isLocal: business.isLocal,
      description: business.description,
      socialNetworks: business.socialNetworks
    })
  }, [business])

  const onSubmit = methods.handleSubmit(async (data: RegisterUpdateFormProps) => {
    updateBusiness({ idBusiness: business.id, data })
    methods.reset()
  })

  return { methods, onSubmit }
}

/**
 * Hook personalizado para manejar el formulario de actualización de imágenes de un negocio
 * @param business - Negocio actual a actualizar
 */
export const useUpdateBusinessImageForm = (id: string) => {
  const { createBusinessImage } = useBusinessMutation()

  const methods = useForm<RegisterUpdateImageFormProps>({
    resolver: zodResolver(registerUpdateImageSchema),
    defaultValues: { photoUrl: [] },
    mode: "onSubmit"
  })

  const onSubmit = methods.handleSubmit(async (data: RegisterUpdateImageFormProps) => {
    createBusinessImage({ idBusiness: id, images: data.photoUrl })
    methods.reset()
  })

  return { methods, onSubmit }
}