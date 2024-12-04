import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useProductContext } from '@/context/ProductContext'
import { ProductFormProps } from '@/schemas/product.schema'

import {
  CustomMutation_Product,
  QueryReact_Product,
  DeleteProductProps,
  UpdateProductProps
} from '@/interfaces/hook.interface'
import { useAuthContext } from '@/context/AuthContext'
import { User } from '@/interfaces/context.interface'

// Keys constantes para mejor mantenimiento
const QUERY_KEYS = {
  product: (id: string) => ['product', id],
  products: (businessId: string) => ['products', businessId],
  search: (businessId: string, name: string) => ['products', 'search', businessId, name]
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useQuery--------------------------------------------------*/
/** Hook personalizado para gestionar queries de productos */
export const useQueryProduct = (): QueryReact_Product => {
  const product = useProductContext()

  /**
   * Query para todos los productos
   * @param {string} businessId - El ID del negocio.
   */
  const fetchAllProducts = (businessId: string) => useQuery({
    queryKey: QUERY_KEYS.products(businessId),
    queryFn: () => product.getAll(businessId),
    select: (data) => data || [],
    enabled: Boolean(businessId),
    initialData: [],
  })

  /**
   * Query para producto individual con prefetch
   * @param {string} id - El ID del producto, corresponde al uid default.
   */
  const fetchProductById = (id: string) => useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => product.getById(id),
    select: (data) => data,
    enabled: Boolean(id),
  })

  /**
   * Query para búsqueda con debounce integrado
   * @param {string} businessId - El ID del negocio.
   * @param {string} name - El nombre del producto.
   */
  const fetchProductsByName = (businessId: string, name: string) => useQuery({
    queryKey: QUERY_KEYS.search(businessId, name),
    queryFn: () => product.filterByName(businessId, name),
    enabled: Boolean(businessId) && Boolean(name),
    select: (data) => data || [],
    initialData: [],
  })

  return {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByName
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useMutation--------------------------------------------------*/
/** Hook personalizado para gestionar mutaciones de productos */
export const useProductMutation = (): CustomMutation_Product => {
  const { create, update, delete: deleteProduct } = useProductContext()
  const { user = {} as User } = useAuthContext()
  const queryClient = useQueryClient()

  /**
   * Mutation para crear un producto
   * @param {ProductFormProps} product - El producto a crear.
   */
  const createMutation = useMutation({
    mutationFn: async (product: ProductFormProps) => await create(user.uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
    }
  })

  /**
   * Mutation para actualizar un producto
   * @param {UpdateProductProps} product - El producto a actualizar.
   */
  const updateMutation = useMutation({
    mutationFn: async ({ productId, data }: UpdateProductProps) => await update(user.uid, productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.product(variables.productId) })
    }
  })

  /**
   * Mutation para eliminar un producto
   * @param {mutationFn.productId} productId - Corresponde al uid default del producto.
   * @param {mutationFn.productName} productName - Corresponde al nombre del producto.
   */
  const deleteMutation = useMutation({
    mutationFn: async ({ productId, productName }: DeleteProductProps) => await deleteProduct(user.uid, productId, productName),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.product(variables.productId) })
    }
  })

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  }
}