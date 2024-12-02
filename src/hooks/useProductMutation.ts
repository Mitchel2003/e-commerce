import { useProductContext } from '@/context/ProductContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductFormProps } from '@/schemas/product.schema'
import { Product } from '@/interfaces/context.interface'

export const useProductMutation = (businessId: string) => {
  const queryClient = useQueryClient()
  const { create, update, delete: deleteProduct } = useProductContext()

  // Crear producto
  const createMutation = useMutation({
    mutationFn: (product: ProductFormProps) => create(businessId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', businessId] })
    }
  })

  // Actualizar producto
  const updateMutation = useMutation({
    mutationFn: ({ productId, data }: { productId: string, data: Partial<ProductFormProps> }) =>
      update(businessId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', businessId] })
    }
  })

  // Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: ({ productId, product }: { productId: string, product: Product }) =>
      deleteProduct(businessId, productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', businessId] })
    }
  })

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  }
} 