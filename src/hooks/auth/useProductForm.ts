import { productSchema, ProductFormProps } from "@/schemas/product.schema"
import { useProductContext } from "@/context/ProductContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthContext } from "@/context/AuthContext"
import { useForm } from "react-hook-form"

const defaultValues = {
  name: '',
  price: 0,
  description: '',
  imageUrl: undefined
}

export const useProductForm = (onSuccess?: () => void) => {
  const { user } = useAuthContext()
  const { create } = useProductContext()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: ProductFormProps) => {
    await create(user?.uid || '', data).then(() => { methods.reset(); onSuccess?.() })
  })

  return { methods, onSubmit }
} 