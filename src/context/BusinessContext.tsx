import { BusinessContext, Business as TypeBusiness } from '@/interfaces/context.interface'
import { isFirebaseResponse } from '@/interfaces/db.interface'
import { useNotification } from '@/hooks/ui/useNotification'
import { useLoadingScreen } from '@/hooks/ui/useLoading'
import { Props } from '@/interfaces/props.interface'

import { getBusinesses, getBusinessById, getBusinessByQuery } from '@/controllers/business.controller'
import { createContext, useContext, useState } from 'react'

const Business = createContext<BusinessContext>(undefined)

/**
 * Hook personalizado para acceder al contexto de negocios.
 * @throws {Error} Si se intenta usar fuera del BusinessProvider.
 */
export const useBusinessContext = () => {
  const context = useContext(Business)
  if (!context) throw new Error('Error al intentar usar businessContext')
  return context
}

/**
 * Proveedor del contexto de negocios.
 * Maneja el estado de carga y proporciona funciones para obtener negocios.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de negocios.
 */
export const BusinessProvider = ({ children }: Props): JSX.Element => {
  const { show: showLoading, hide: hideLoading } = useLoadingScreen()
  const { notifyError } = useNotification()
  const [loading, setLoading] = useState(false)

  /**
   * Obtiene todos los negocios registrados
   * @returns {Promise<TypeBusiness[]>} Un array de negocios.
   */
  const getAll = async (): Promise<TypeBusiness[]> => {
    setLoadingStatus('Cargando negocios...')
    try {
      const result = await getBusinesses()
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }
  /**
   * Obtiene un negocio específico por su ID
   * @param {string} id - El ID del negocio.
   * @returns {Promise<TypeBusiness | undefined>} Un negocio encontrado o undefined si no se encuentra.
   */
  const getById = async (id: string): Promise<TypeBusiness | undefined> => {
    setLoadingStatus('Cargando negocio...')
    try {
      const result = await getBusinessById(id)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }
  /**
   * Busca negocios por término de búsqueda
   * @param {string} query - El término de búsqueda.
   * @returns {Promise<TypeBusiness[]>} Un array de negocios encontrados.
   */
  const getByQuery = async (query: string): Promise<TypeBusiness[]> => {
    setLoadingStatus('Buscando negocios...')
    try {
      const result = await getBusinessByQuery(query)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }
  /**
   * Filtra negocios por categoría
   * @param {string} category - La categoría a filtrar.
   * @returns {Promise<TypeBusiness[]>} Un array de negocios filtrados.
   */
  const filterByCategory = async (category: string): Promise<TypeBusiness[]> => {
    setLoadingStatus('Filtrando negocios...')
    try {
      const businesses = await getAll()
      return businesses.filter(business => business?.category.toLowerCase().includes(category.toLowerCase()))
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------tools--------------------------------------------------*/
  /**
   * Actualiza el estado de carga basado en un parametro opcional
   * si valor del param es distinto a undefined, se muestra el loading
   * @param {string | undefined} status - El estado de carga.
   */
  const setLoadingStatus = (status?: string) => {
    status ? showLoading(status) : hideLoading()
    setLoading(Boolean(status))
  }
  /*---------------------------------------------------------------------------------------------------------*/

  return (
    <Business.Provider value={{
      loading,
      getAll,
      getById,
      getByQuery,
      filterByCategory
    }}>
      {children}
    </Business.Provider>
  )
} 