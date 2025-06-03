import { CustomMutation_Business, QueryReact_Business, UpdateBusinessProps, DeleteBusinessProps, DeleteBusinessImageProps, CreateBusinessImageProps } from '@/interfaces/hook.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useBusinessContext } from '@/context/BusinessContext'
import { QueryProps } from '@/interfaces/db.interface'

// Keys constantes para mejor mantenimiento
const QUERY_KEYS = {
  businesses: () => ['businesses'],
  business: (idBusiness: string) => ['business', idBusiness],
  businessStats: (idBusiness: string) => ['business', 'stats', idBusiness],
  searchByQuery: (options: QueryProps) => ['businesses', 'search', { ...options }],
  businessImages: (idBusiness: string) => ['business', 'images', idBusiness]
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useQuery--------------------------------------------------*/
/** Hook personalizado para gestionar queries de negocios */
export const useQueryBusiness = (): QueryReact_Business => {
  const business = useBusinessContext()

  /**
   * Query para todos los negocios
   */
  const fetchAllBusinesses = () => useQuery({
    queryKey: QUERY_KEYS.businesses(),
    queryFn: () => business.getAll(),
    select: (data) => data || [],
    initialData: []
  })

  /**
   * Query para negocio individual con prefetch
   * @param {string} id - El ID del negocio.
   */
  const fetchBusinessById = (id: string) => useQuery({
    queryKey: QUERY_KEYS.business(id),
    queryFn: () => business.getById(id),
    select: (data) => data || undefined,
    enabled: Boolean(id)
  })

  /**
   * Query para obtener las estadísticas de un negocio
   * @param {string} idBusiness - El ID del negocio.
   */
  const fetchBusinessStatsById = (idBusiness: string) => useQuery({
    queryKey: QUERY_KEYS.businessStats(idBusiness),
    queryFn: () => business.getStatsById(idBusiness),
    select: (data) => data || undefined,
    enabled: Boolean(idBusiness)
  })

  /**
   * Query para buscar negocios con filtros
   * @param {QueryProps} options - Opciones de búsqueda
   */
  const fetchBusinessByQuery = (options: QueryProps) => useQuery({
    queryKey: QUERY_KEYS.searchByQuery(options),
    queryFn: () => business.getByQuery(options),
    select: (data) => data || [],
    enabled: options.enabled ?? true
  })

  /**
   * Query para obtener las imágenes de un negocio
   * @param {string} idBusiness - El ID del negocio.
   */
  const fetchAllBusinessImages = (idBusiness: string) => useQuery({
    queryKey: QUERY_KEYS.businessImages(idBusiness),
    queryFn: () => business.getAllImages(idBusiness),
    select: (data) => data || [],
    enabled: Boolean(idBusiness)
  })

  return {
    fetchAllBusinesses,
    fetchBusinessById,
    fetchBusinessByQuery,
    fetchBusinessStatsById,
    fetchAllBusinessImages,
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------useMutation--------------------------------------------------*/
/** Hook personalizado para gestionar mutaciones de negocios */
export const useBusinessMutation = (): CustomMutation_Business => {
  const { deleteImage: deleteBusinessImage, createImage: createBusinessImage, delete: deleteBusiness, update: updateBusiness, recordVisit } = useBusinessContext()
  const queryClient = useQueryClient()

  /**
   * Mutation para actualizar un negocio
   * @param {UpdateBusinessProps} props - Propiedades para actualizar el negocio
   */
  const updateMutation = useMutation({
    mutationFn: async ({ idBusiness, data }: UpdateBusinessProps) => await updateBusiness(idBusiness, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businesses() })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.business(variables.idBusiness) })
    }
  })

  /**
   * Mutation para eliminar un negocio
   * @param {DeleteBusinessProps} props - Propiedades para eliminar el negocio
   */
  const deleteMutation = useMutation({
    mutationFn: async ({ idBusiness }: DeleteBusinessProps) => await deleteBusiness(idBusiness),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businesses() })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.business(variables.idBusiness) })
    }
  })
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------images--------------------------------------------------*/
  /**
   * Mutation para crear una imagen de un negocio
   * @param {CreateBusinessImageProps} props - Propiedades para crear la imagen
   */
  const createImageMutation = useMutation({
    mutationFn: async ({ idBusiness, images }: CreateBusinessImageProps) => await createBusinessImage(idBusiness, images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.business(variables.idBusiness) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businessImages(variables.idBusiness) })
    }
  })

  /**
   * Mutation para eliminar una imagen de un negocio
   * @param {DeleteImageProps} props - Propiedades para eliminar la imagen
   */
  const deleteImageMutation = useMutation({
    mutationFn: async ({ idBusiness, nameImage }: DeleteBusinessImageProps) => await deleteBusinessImage(idBusiness, nameImage),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.business(variables.idBusiness) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businessImages(variables.idBusiness) })
    }
  })
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------analytics--------------------------------------------------*/
  const recordVisitMutation = useMutation({
    retry: false,
    mutationFn: async ({ idBusiness }: { idBusiness: string }) => await recordVisit(idBusiness),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.business(variables.idBusiness) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.businessStats(variables.idBusiness) })
    }
  })

  return {
    updateBusiness: updateMutation.mutateAsync,
    deleteBusiness: deleteMutation.mutateAsync,
    recordVisit: recordVisitMutation.mutateAsync,
    deleteBusinessImage: deleteImageMutation.mutateAsync,
    createBusinessImage: createImageMutation.mutateAsync,
    isLoading: updateMutation.isPending || deleteMutation.isPending || deleteImageMutation.isPending
  }
}