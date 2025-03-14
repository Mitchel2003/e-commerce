import { Product as TypeProduct, ProductContext } from "@/interfaces/context.interface";
import { isFirebaseResponse } from "@/interfaces/db.interface";
import { useNotification } from "@/hooks/ui/useNotification";
import { useLoadingScreen } from "@/hooks/ui/useLoading";
import { Props } from "@/interfaces/props.interface";

import { getProducts, getProductById, createProduct, updateProduct, updateProductLikes, deleteProduct } from "@/controllers/product.controller";
import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema";
import { useState, useContext, createContext } from "react";

const Product = createContext<ProductContext>(undefined)

/**
 * Hook personalizado para acceder al contexto de productos.
 * @throws {Error} Si se intenta usar fuera del ProductProvider.
 */
export const useProductContext = () => {
  const context = useContext(Product)
  if (!context) throw new Error('Error al intentar usar productContext')
  return context
}

/**
 * Proveedor del contexto de productos.
 * Maneja el estado de los productos y proporciona funciones para interactuar con ellos.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de productos.
 */
export const ProductProvider = ({ children }: Props): JSX.Element => {
  const { show: showLoading, hide: hideLoading } = useLoadingScreen()
  const { notifyError, notifySuccess } = useNotification()
  const [loading, setLoading] = useState(false)

  /*--------------------------------------------------crud product--------------------------------------------------*/
  /**
   * Obtiene todos los productos de un negocio.
   * @param {string} idBusiness - El ID del negocio (uid).
   * @returns {Promise<TypeProduct[]>} Un array con los datos de los productos encontrados.
   */
  const getAll = async (idBusiness: string): Promise<TypeProduct[]> => {
    setLoadingStatus('Cargando productos...')
    try {
      const result = await getProducts(idBusiness)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {string} idProduct - El ID del producto a obtener, corresponde al uid default.
   * @returns {Promise<TypeProduct | undefined>} Los datos del producto o undefined en caso de error.
   */
  const getById = async (idProduct: string): Promise<TypeProduct | undefined> => {
    setLoadingStatus('Cargando producto...')
    try {
      const result = await getProductById(idProduct)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }

  /**
   * Filtra productos por nombre.
   * @param {string} idBusiness - El ID del negocio (uid) con el que se relaciona el producto.
   * @param {string} name - El nombre a filtrar, se buscaran similitudes con el nombre.
   * @returns {Promise<TypeProduct[]>} Un array con los datos de los productos encontrados.
   */
  const filterByName = async (idBusiness: string, name: string): Promise<TypeProduct[]> => {
    setLoadingStatus('Filtrando productos...')
    try {
      const products = await getAll(idBusiness)
      return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }

  /**
   * Crea un nuevo producto.
   * @param {string} idBusiness - El ID del negocio (uid) con el que se relaciona el producto.
   * @param {ProductFormProps} product - Los datos del producto a crear.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion create
   */
  const create = async (idBusiness: string, product: ProductFormProps): Promise<void> => {
    setLoadingStatus('Creando producto...')
    try {
      const result = await createProduct(idBusiness, product)
      if (!result.success) throw result.error
      notifySuccess({ title: 'Exito', message: 'Producto creado exitosamente' })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {string} idProduct - El ID del producto a actualizar.
   * @param {Partial<ProductFormProps>} product - Los nuevos datos del producto.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion update
   */
  const update = async (idProduct: string, product: Partial<ProductUpdateFormProps>): Promise<void> => {
    setLoadingStatus('Actualizando producto...')
    try {
      const result = await updateProduct(idProduct, product)
      if (!result.success) throw result.error
      notifySuccess({ title: 'Exito', message: 'Producto actualizado exitosamente' })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }

  /**
   * Actualiza el número de likes de un producto.
   * @param {string} idProduct - El ID del producto a actualizar.
   * @returns {Promise<boolean>} Un booleano que resulta de la ejecucion  de la funcion update
   */
  const updateLikes = async (idProduct: string): Promise<boolean> => {
    try {
      const result = await updateProductLikes(idProduct)
      if (!result.success) throw result.error
      return result.success
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return false
    }
  }

  /**
   * Elimina un producto por su ID.
   * @param {string} idBusiness - El ID del negocio (uid).
   * @param {string} idProduct - El ID del producto a eliminar.
   * @returns {Promise<void>} Un void que resulta de la ejecucion de la funcion delete
   */
  const delete_ = async (idBusiness: string, idProduct: string): Promise<void> => {
    setLoadingStatus('Eliminando producto...')
    try {
      const result = await deleteProduct(idBusiness, idProduct)
      if (!result.success) throw result.error
      notifySuccess({ title: 'Exito', message: 'Producto eliminado exitosamente' })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
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
    <Product.Provider value={{
      loading,
      getAll,
      getById,
      filterByName,
      create,
      update,
      updateLikes,
      delete: delete_
    }}>
      {children}
    </Product.Provider>
  )
}