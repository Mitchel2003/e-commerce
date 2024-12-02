import { useBusinessContext } from '@/context/BusinessContext'
import { useQuery } from '@tanstack/react-query'

export const useQueryBusiness = () => {
  const context = useBusinessContext()

  // Obtener todos los negocios
  const fetchAllBusinesses = () => useQuery({
    queryKey: ['businesses'],
    queryFn: () => context.getAll(),
    select: (data) => data || [],
    initialData: []
  })

  // Obtener negocio por ID
  const fetchBusinessById = (id: string) => useQuery({
    queryKey: ['business', id],
    queryFn: () => context.getById(id),
    select: (data) => data || undefined,
    enabled: Boolean(id)
  })

  // Buscar negocios por término
  const fetchBusinessByQuery = (query: string) => useQuery({
    queryKey: ['businesses', 'search', query],
    queryFn: () => context.getByQuery(query),
    select: (data) => data || [],
    enabled: Boolean(query)
  })

  // Filtrar negocios por categoría
  const fetchBusinessByCategory = (category: string) => useQuery({
    queryKey: ['businesses', 'category', category],
    queryFn: () => context.filterByCategory(category),
    select: (data) => data || [],
    enabled: Boolean(category)
  })

  return {
    fetchAllBusinesses,
    fetchBusinessById,
    fetchBusinessByQuery,
    fetchBusinessByCategory
  }
}