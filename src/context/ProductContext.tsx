import { Product as TypeProduct, ProductContext } from "@/interfaces/context.interface";
import { isFirebaseResponse } from "@/interfaces/db.interface";
import { Props } from "@/interfaces/props.interface";

import { useState, useContext, createContext, useEffect } from "react";

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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => timeAlert(), [errors])

  /** Configura un temporizador para limpiar los errores después de 5 segundos */
  const timeAlert = () => {
    if (errors.length === 0) return;
    const timer = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(timer);
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param {string} id - El ID del producto a obtener.
   * @returns {Promise<TypeProduct>} Los datos del producto o undefined en caso de error.
   */
  const getProduct = async (id: string): Promise<TypeProduct> => {
    try { console.log(`getProduct ${id}`); return undefined }
    catch (e: unknown) { setProductStatus(e); return undefined }
  }

  /**
   * Obtiene todos los productos.
   * @returns {Promise<TypeProduct[]>} Un array con los datos de todos los productos.
   */
  const getProducts = async (): Promise<TypeProduct[]> => {
    try { console.log('getProducts'); return [] }
    catch (e: unknown) { setProductStatus(e); return [] }
  }

  /**
   * Crea un nuevo producto.
   * @param {object} product - Los datos del producto a crear.
   * @returns {Promise<TypeProduct>} Los datos del producto creado o undefined en caso de error.
   */
  const createProduct = async (product: object): Promise<TypeProduct> => {
    try { console.log(`createProduct ${product}`); return undefined }
    catch (e: unknown) { setProductStatus(e); return undefined }
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

  return (
    <Product.Provider value={{ errors, getProduct, getProducts, createProduct, updateProduct, deleteProduct }}>
      {children}
    </Product.Provider>
  )
}