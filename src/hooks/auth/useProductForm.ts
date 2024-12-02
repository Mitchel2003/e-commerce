import { productSchema, ProductFormProps } from "@/schemas/product.schema"
import { useProductContext } from "@/context/ProductContext"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues = {
  name: '',
  price: '',
  description: '',
  imageUrl: undefined
}

export const useProductForm = () => {
  const { user } = useAuthContext()
  const { create } = useProductContext()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: ProductFormProps) => {
    await create(user?.uid || '', data).then(() => { methods.reset() })
  })

  return { methods, onSubmit }
} 