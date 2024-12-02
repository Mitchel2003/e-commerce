import { useProductContext } from '@/context/ProductContext'
import { useQuery } from '@tanstack/react-query'

export const useQueryProduct = () => {
  const context = useProductContext()

  // Obtener todos los productos de un negocio
  const fetchAllProducts = (businessId: string) => useQuery({
    queryKey: ['products', businessId],
    queryFn: () => context.getAll(businessId),
    select: (data) => data || [],
    enabled: Boolean(businessId),
    initialData: []
  })

  // Obtener producto por ID
  const fetchProductById = (id: string) => useQuery({
    queryKey: ['product', id],
    queryFn: () => context.getById(id),
    select: (data) => data || undefined,
    enabled: Boolean(id)
  })

  // Buscar productos por nombre
  const fetchProductsByName = (businessId: string, name: string) => useQuery({
    queryKey: ['products', 'search', businessId, name],
    queryFn: () => context.filterByName(businessId, name),
    select: (data) => data || [],
    enabled: Boolean(businessId) && Boolean(name)
  })

  return {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByName
  }
} 