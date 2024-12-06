import { productSchema, ProductFormProps, productUpdateSchema, ProductUpdateFormProps } from "@/schemas/product.schema"
import { useProductMutation } from "@/hooks/useProductQuery"
import { Product } from "@/interfaces/context.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

/**
 * Hook personalizado para manejar el formulario de actualización de productos
 * @param product - Producto actual a actualizar
 * @param onSubmitCallback - Callback que se ejecuta al enviar el formulario
 */
export const useUpdateProductForm = (product: Product) => {
  const { updateProduct } = useProductMutation()

  const methods = useForm<ProductUpdateFormProps>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: undefined,
    mode: "onChange"
  })

  // Cargar datos iniciales del producto
  useEffect(() => {
    product && methods.reset({
      name: product.name,
      price: product.price,
      description: product.description
    })
  }, [product])

  // /** Maneja el envío del formulario, procesando solo los campos modificados */
  // const onSubmit = methods.handleSubmit(async (data: any) => {
  //   const changedFields = Object.keys(data).reduce((acc, key) => {
  //     data[key] !== product[key as keyof Product] && (acc[key] = data[key])
  //     return acc
  //   }, {} as Partial<typeof data>)

  //   Object.keys(changedFields).length > 0
  //     && updateProduct({ idProduct: product.uid as string, data: changedFields })
  //   methods.reset()
  // })

  const onSubmit = methods.handleSubmit(async (data: any) => {
    updateProduct({ idProduct: product.uid as string, data })
    methods.reset()
  })

  return { methods, onSubmit }
}


/** Hook personalizado para manejar el formulario de creación de productos */
export const useCreateProductForm = () => {
  const { createProduct } = useProductMutation()

  const methods = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
    defaultValues
  })

  const onSubmit = methods.handleSubmit(async (data: any) => {
    createProduct(data)
    methods.reset()
  })

  return { methods, onSubmit }
}

const defaultValues = {
  imageUrl: undefined,
  description: '',
  price: '',
  name: ''
}