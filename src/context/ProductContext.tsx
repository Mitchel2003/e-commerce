import { Product as TypeProduct, ProductContext } from "@/interfaces/context.interface";
import { isFirebaseResponse } from "@/interfaces/db.interface";
import { useNotification } from "@/hooks/ui/useNotification";
import { useLoadingScreen } from "@/hooks/ui/useLoading";
import { Props } from "@/interfaces/props.interface";

import { getProducts, getProductById, createProduct as create, updateProduct as update, deleteProduct as delete } from "@/controllers/product.controller";
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
  const [loading, setLoading] = useState(false)
  const { notifyError } = useNotification()

  /**
   * Obtiene todos los productos de un negocio.
   * @param {string} id - El ID del negocio (uid).
   * @returns {Promise<TypeProduct[]>} Un array con los datos de los productos encontrados.
   */
  const getAll = async (id: string): Promise<TypeProduct[]> => {
    setLoadingStatus('Cargando productos...')
    try {
      const result = await getProducts(id)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {string} id - El ID del producto a obtener.
   * @returns {Promise<TypeProduct | undefined>} Los datos del producto o undefined en caso de error.
   */
  const getById = async (id: string): Promise<TypeProduct | undefined> => {
    setLoadingStatus('Cargando producto...')
    try {
      const result = await getProductById(id)
      if (!result.success) throw result.error
      return result.data
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }

  /**
   * Filtra productos por nombre.
   * @param {string} name - El nombre a filtrar.
   * @param {string} id - El ID del negocio (uid) con el que se relaciona el producto.
   * @returns {Promise<TypeProduct[]>} Un array con los datos de los productos encontrados.
   */
  const filterByName = async (name: string, id: string): Promise<TypeProduct[]> => {
    setLoadingStatus('Filtrando productos...')
    try {
      const products = await getAll(id)
      return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
      return []
    } finally { setLoadingStatus() }
  }

  /**
   * Crea un nuevo producto.
   * @param {object} product - Los datos del producto a crear.
   * @returns {Promise<TypeProduct>} Los datos del producto creado o undefined en caso de error.
   */
  const createProduct = async (product: object): Promise<void> => {
    setLoadingStatus('Filtrando productos...')
    try {
      const product = await create(id, Product)
      if (!product.success) throw product.error
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: 'Error', message: e.message })
    } finally { setLoadingStatus() }
  }

  /**
   * Actualiza un producto existente por su ID.
   * @param {string} id - El ID del producto a actualizar.
   * @param {object} product - Los nuevos datos del producto.
   * @returns {Promise<TypeProduct>} Los datos del producto actualizado o undefined en caso de error.
   */
  const updateProduct = async (id: string, product: object): Promise<TypeProduct> => {
    try { console.log(`updateProduct ${id} ${product}`); return undefined }
    catch (e: unknown) { setProductStatus(e); return undefined }
  }

  /**
   * Elimina un producto por su ID.
   * @param {string} id - El ID del producto a eliminar.
   * @returns {Promise<TypeProduct>} Los datos del producto eliminado o undefined en caso de error.
   */
  const deleteProduct = async (id: string): Promise<TypeProduct> => {
    try { console.log(`deleteProduct ${id}`); return undefined }
    catch (e: unknown) { setProductStatus(e); return undefined }
  }

  /**
   * Maneja los errores de las operaciones de productos.
   * @param {unknown} e - El error capturado.
   */
  const setProductStatus = (e: unknown) => {
    if (isFirebaseResponse(e)) setErrors([e.message])
  }
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
    <Product.Provider value={{ errors, getProduct, getProducts, createProduct, updateProduct, deleteProduct }}>
      {children}
    </Product.Provider>
  )
}