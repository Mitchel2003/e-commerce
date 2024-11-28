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
    enabled: Boolean(id)
  })


  // Buscar negocios por término
  const fetchBusinessByQuery = (query: string) => useQuery({
    queryKey: ['businesses', 'search', query],
    queryFn: () => context.getByQuery(query),
    enabled: Boolean(query),
    select: (data) => data || []
  })

  // Filtrar negocios por categoría
  const fetchBusinessByCategory = (category: string) => useQuery({
    queryKey: ['businesses', 'category', category],
    queryFn: () => context.filterByCategory(category),
    enabled: Boolean(category),
    select: (data) => data || []
  })
  return {
    fetchAllBusinesses,
    fetchBusinessById,
    fetchBusinessByQuery,
    fetchBusinessByCategory
  }
}
