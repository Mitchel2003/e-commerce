import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useProductContext } from '@/context/ProductContext'
import { ProductFormProps } from '@/schemas/product.schema'
import { useAuthContext } from '@/context/AuthContext'
import { User } from '@/interfaces/context.interface'

import {
  CustomMutation_Product,
  QueryReact_Product,
  DeleteProductProps,
  UpdateProductProps
} from '@/interfaces/hook.interface'

// Keys constantes para mejor mantenimiento
const QUERY_KEYS = {
  product: (idProduct: string) => ['product', idProduct],
  products: (idBusiness: string) => ['products', idBusiness],
  search: (idBusiness: string, name: string) => ['products', 'search', idBusiness, name]
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useQuery--------------------------------------------------*/
/** Hook personalizado para gestionar queries de productos */
export const useQueryProduct = (): QueryReact_Product => {
  const product = useProductContext()

  /**
   * Query para todos los productos
   * @param {string} idBusiness - El ID del negocio.
   */
  const fetchAllProducts = (idBusiness: string) => useQuery({
    queryKey: QUERY_KEYS.products(idBusiness),
    queryFn: () => product.getAll(idBusiness),
    select: (data) => data || [],
    enabled: Boolean(idBusiness),
    initialData: [],
  })

  /**
   * Query para producto individual con prefetch
   * @param {string} idProduct - El ID del producto, corresponde al uid default.
   */
  const fetchProductById = (idProduct: string) => useQuery({
    queryKey: QUERY_KEYS.product(idProduct),
    queryFn: () => product.getById(idProduct),
    select: (data) => data,
    enabled: Boolean(idProduct),
  })

  /**
   * Query para búsqueda con debounce integrado
   * @param {string} idBusiness - El ID del negocio.
   * @param {string} name - El nombre del producto.
   */
  const fetchProductsByName = (idBusiness: string, name: string) => useQuery({
    queryKey: QUERY_KEYS.search(idBusiness, name),
    queryFn: () => product.filterByName(idBusiness, name),
    enabled: Boolean(idBusiness) && Boolean(name),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
  })

  /**
   * Mutation para actualizar un producto
   * @param {UpdateProductProps["idProduct"]} idProduct - Corresponde al uid default del producto.
   * @param {UpdateProductProps["data"]} data - Los datos del producto a actualizar.
   */
  const updateMutation = useMutation({
    mutationFn: async ({ idProduct, data }: UpdateProductProps) => await update(idProduct, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.product(variables.idProduct) })
    }
  })

  /**
   * Mutation para eliminar un producto
   * @param {DeleteProductProps.idProduct} idProduct - Corresponde al uid default del producto.
   */
  const deleteMutation = useMutation({
    mutationFn: async ({ idProduct }: DeleteProductProps) => await deleteProduct(user.uid, idProduct),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(user.uid) })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.product(variables.idProduct) })
    }
  })

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  }
}