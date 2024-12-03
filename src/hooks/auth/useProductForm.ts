import { ProductFormProps, productSchema, productUpdateSchema } from "@/schemas/product.schema"
import { useProductContext } from "@/context/ProductContext"
import { Product } from "@/interfaces/context.interface"
import { useAuthContext } from "@/context/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

const defaultValues = {
  imageUrl: undefined,
  description: '',
  price: '',
  name: '',
}

/**
 * Hook para crear un producto
 * @argument user - contiene el uid del usuario autenticado
 */
export const useCreateProductForm = () => {
  const { create } = useProductContext()
  const { user } = useAuthContext()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: ProductFormProps) => {
    await create(user?.uid || '', data)
    methods.reset()
  })

  return { methods, onSubmit }
}

/**
 * Hook para actualizar un producto
 * @param {string} idBusiness - El ID del negocio (uid).
 * @param {Product} product - El producto a actualizar.
 * @argument id - El ID del producto, lo obtenemos de los params de la ruta.
 */
export const useUpdateProductForm = (idBusiness: string, product: Product) => {
  const { update } = useProductContext()
  const { id = '' } = useParams()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: undefined,
    mode: "onSubmit",
  })

  /**
   * Update the product only if there are changes
   * @argument data: any - The data to update the product
   * first, create an object with only the modified fields
   * then, update the product only if there are changes
   */
  const onSubmit = methods.handleSubmit(async (data: any) => {
    const changedFields = Object.keys(data).reduce((acc, key) => {
      data[key] !== product[key as keyof Product] && (acc[key] = data[key])
      return acc
    }, {} as Partial<typeof data>)

    Object.keys(changedFields).length > 0 && update(idBusiness, id, changedFields)
    methods.reset()
  })

  return { methods, onSubmit }
}