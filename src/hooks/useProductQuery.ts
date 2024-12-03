import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useProductContext } from '@/context/ProductContext'
import { ProductFormProps } from '@/schemas/product.schema'
import { Product } from '@/interfaces/context.interface'

import {
  CustomMutation_Product,
  QueryReact_Product,
  DeleteProductProps,
  UpdateProductProps
} from '@/interfaces/hook.interface'

// Keys constantes para mejor mantenimiento
const QUERY_KEYS = {
  product: (id: string) => ['product', id],
  products: (businessId: string) => ['products', businessId],
  search: (businessId: string, name: string) => ['products', 'search', businessId, name]
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useQuery--------------------------------------------------*/
/** Hook personalizado para gestionar queries de productos */
export const useQueryProduct = (businessId: string): QueryReact_Product => {
  const product = useProductContext()
  const queryClient = useQueryClient()

  // Query para todos los productos
  const fetchAllProducts = useQuery({
    queryKey: QUERY_KEYS.products(businessId),
    queryFn: () => product.getAll(businessId),
    select: (data) => data || [],
    enabled: Boolean(businessId),
    staleTime: 5 * 60 * 1000, // 5 minutos de cache fresco
    initialData: [],
  })

  // Query para producto individual con prefetch
  const fetchProductById = (id: string) => {
    const query = useQuery({
      queryKey: QUERY_KEYS.product(id),
      queryFn: () => product.getById(id),
      staleTime: 5 * 60 * 1000,
      select: (data) => data,
      enabled: Boolean(id),
    })

    /* Prefetch del producto siguiente/anterior
     * un ejemplo sencillo de esto es en caso de que la persona
     * se vaya a la pagina de detalles del producto, este ya este cargado en el cache
     */
    const prefetchProduct = async (productId: string) => await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.product(productId),
      queryFn: () => product.getById(productId)
    })

    return { ...query, prefetchProduct }
  }

  // Query para búsqueda con debounce integrado
  const fetchProductsByName = (name: string) => useQuery({
    queryKey: QUERY_KEYS.search(businessId, name),
    queryFn: () => product.filterByName(businessId, name),
    enabled: Boolean(businessId) && Boolean(name),
    select: (data) => data || [],
    staleTime: 2 * 60 * 1000,
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
export const useProductMutation = (businessId: string): CustomMutation_Product => {
  const { create, update, delete: deleteProduct } = useProductContext()
  const queryClient = useQueryClient()

  // Crear producto con optimistic updates
  const createMutation = useMutation({
    mutationFn: async (product: ProductFormProps) => await create(businessId, product),
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.products(businessId) })
      const previousProducts = queryClient.getQueryData<Product[]>(QUERY_KEYS.products(businessId))

      const optimisticProduct = {// Optimistic update
        id: 'temp-id',
        ...newProduct,
        imageUrl: URL.createObjectURL(newProduct.imageUrl)
      }
      updateProductsCache(optimisticProduct)
      return { previousProducts }
    },
    onError: (_, __, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData<Product[]>(QUERY_KEYS.products(businessId), context.previousProducts)
      }
    },
    onSettled: () => { queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(businessId) }) }
  })

  // Actualizar producto
  const updateMutation = useMutation({
    mutationFn: async ({ productId, data }: UpdateProductProps) => await update(businessId, productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(businessId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.product(variables.productId) })
    }
  })

  // Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: async ({ productId, productName }: DeleteProductProps) => await deleteProduct(businessId, productId, productName),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products(businessId) })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.product(variables.productId) })
    }
  })

  //Helper para actualizar el cache
  const updateProductsCache = (newProduct: Product) => {
    queryClient.setQueryData<Product[]>(
      QUERY_KEYS.products(businessId),
      (old = []) => [...old.filter(p => p.id !== newProduct.id), newProduct]
    )
  }

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  }
}