import { RegisterFormProps as BusinessFormProps, RegisterUpdateFormProps as BusinessUpdateFormProps } from '@/schemas/auth.schema'
import { BusinessContext, Business as TypeBusiness } from '@/interfaces/context.interface'
import { isFirebaseResponse, Metadata, QueryProps } from '@/interfaces/db.interface'
import { useNotification } from '@/hooks/ui/useNotification'
import { useLoadingScreen } from '@/hooks/ui/useLoading'
import { Props } from '@/interfaces/props.interface'

import { getBusinesses, getBusinessById, getBusinessByQuery, updateBusiness, deleteBusiness, getAllBusinessImages, createBusinessImage, deleteBusinessImage } from '@/controllers/business.controller'
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
  const { notifySuccess, notifyError } = useNotification()
  const [loading, setLoading] = useState(true)

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
   * @param {QueryProps} query - El término de búsqueda.
   * @returns {Promise<TypeBusiness[]>} Un array de negocios encontrados.
   */
  const getByQuery = async (query: QueryProps): Promise<TypeBusiness[]> => {
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
   * Actualiza un negocio existente por su ID.
   * @param {string} idBusiness - El ID del negocio (uid).
   * @param {Partial<BusinessUpdateFormProps>} business - Los nuevos datos del negocio.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion update
   */
  const update = async (idBusiness: string, business: Partial<BusinessUpdateFormProps>): Promise<void> => {
    setLoadingStatus('Actualizando negocio...')
    try {
      const result = await updateBusiness(idBusiness, business)
      if (!result.success) throw result.error
      notifySuccess({ title: "Actualización exitosa", message: "Negocio actualizado correctamente" })
    } catch (e: unknown) { isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message }) }
    finally { setLoadingStatus() }
  }

  /**
   * Elimina un negocio por su ID.
   * @param {string} idBusiness - El ID del negocio (uid).
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion delete
   */
  const delete_ = async (idBusiness: string): Promise<void> => { //dont works yet
    setLoadingStatus('Eliminando negocio...')
    try {
      const result = await deleteBusiness(idBusiness)
      if (!result.success) throw result.error
      notifySuccess({ title: "Eliminación exitosa", message: "Negocio eliminado correctamente" })
    } catch (e: unknown) { isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message }) }
    finally { setLoadingStatus() }
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------images--------------------------------------------------*/
  /**
   * Obtiene las imágenes de un negocio
   * @param {string} idBusiness - El ID del negocio.
   * @returns {Promise<TypeBusinessImage[]>} Un array de imágenes.
   */
  const getAllImages = async (idBusiness: string): Promise<Metadata[]> => {
    setLoadingStatus('Cargando imágenes...')
    try {
      const result = await getAllBusinessImages(idBusiness)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message });
      return []
    } finally { setLoadingStatus() }
  }

  /**
   * Crea una imagen de un negocio
   * @param {string} idBusiness - El ID del negocio (uid).
   * @param {File[]} files - Las imagenes a crear.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion create
   */
  const createImage = async (idBusiness: string, files: BusinessFormProps['references']['photoUrl']): Promise<void> => {
    setLoadingStatus('Creando imagen...')
    try {
      const result = await createBusinessImage(idBusiness, files)
      if (!result.success) throw result.error
      notifySuccess({ title: "Creación exitosa", message: "Imagen creada correctamente" })
    } catch (e: unknown) { isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message }) }
    finally { setLoadingStatus() }
  }

  /**
   * Elimina una imagen de un negocio por su ID.
   * @param {string} idBusiness - El ID del negocio (uid).
   * @param {string} nameImage - El nombre de la imagen a eliminar.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion delete
   */
  const deleteImage = async (idBusiness: string, nameImage: string): Promise<void> => {
    setLoadingStatus('Eliminando imagen...')
    try {
      const result = await deleteBusinessImage(idBusiness, nameImage)
      if (!result.success) throw result.error
      notifySuccess({ title: "Eliminación exitosa", message: "Imagen eliminada correctamente" })
    } catch (e: unknown) { isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message }) }
    finally { setLoadingStatus() }
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
      update,
      delete: delete_,
      getAllImages,
      createImage,
      deleteImage
    }}>
      {children}
    </Business.Provider>
  )
} 