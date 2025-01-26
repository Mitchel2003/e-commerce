import { productSchema, ProductFormProps, productUpdateSchema, ProductUpdateFormProps } from "@/schemas/product.schema"
import { useProductMutation } from "@/hooks/useProductQuery"
import { Product } from "@/interfaces/context.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

const defaultValues = {
  imageUrl: undefined,
  description: '',
  price: '',
  name: ''
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

/**
 * Hook personalizado para manejar el formulario de actualización de productos
 * @param product - Producto actual a actualizar
 */
export const useUpdateProductForm = (product: Product) => {
  const { updateProduct } = useProductMutation()

  const methods = useForm<ProductUpdateFormProps>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: undefined,
    mode: "onSubmit"
  })

  // Cargar datos iniciales del producto
  useEffect(() => {
    product && methods.reset({
      name: product.name,
      price: product.price,
      description: product.description
    })
  }, [product])

  const onSubmit = methods.handleSubmit(async (data: any) => {
    updateProduct({ idProduct: product.uid as string, data })
    methods.reset()
  })

  return { methods, onSubmit }
}