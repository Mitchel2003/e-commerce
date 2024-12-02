import { productSchema, ProductFormProps } from "@/schemas/product.schema"
import { useProductContext } from "@/context/ProductContext"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const defaultValues = {
  name: '',
  price: '',
  description: '',
  imageUrl: undefined,
}

export const useUpdateProductForm = () => {
  const { update } = useProductContext()
  const { user } = useAuthContext()
  const { id = '' } = useParams()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: ProductFormProps) => {
    await update(user?.uid || '', id, data)
    methods.reset()
  })
  return { methods, onSubmit }
}