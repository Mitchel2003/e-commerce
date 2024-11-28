import { databaseService } from "@/services/firebase/database.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { Product } from "@/interfaces/context.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

/**
 * Obtiene todos los productos de un negocio.
 * @param {string} id - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
 * @returns {Promise<Result<Product[]>>} Una lista de productos.
 */
export const getProducts = async (id: string): Promise<Result<Product[]>> => {
  try {
    const result = await databaseService.getAllProducts(id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener lista de productos'))) }
}
/**
 * Obtiene un producto por su id, representa el uid default.
 * @param {string} id - El identificador del producto, corresponde al uid default.
 * @returns {Promise<Result<Product>>} Un producto.
 */
export const getProductById = async (id: string): Promise<Result<Product>> => {
  try {
    const result = await databaseService.getProductById(id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener producto'))) }
}
/**
 * Busca productos por nombre.
 * @param {string} query - El término de búsqueda.
 * @param {string} id - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
 * @returns {Promise<Result<Product[]>>} Una lista de productos.
 */
export const getProductByQuery = async (query: string, id: string): Promise<Result<Product[]>> => {
  try {
    const result = await databaseService.getProductByQuery(query, id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar productos'))) }
}
/**
 * Crea un producto nuevo.
 * @param {string} id - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
 * @param {Product} product - El producto a crear.
 * @returns {Promise<Result<void>>} Crea un producto.
 */
export const createProduct = async (id: string, product: Product): Promise<Result<void>> => {
  try {
    const result = await databaseService.createProduct(id, product)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear producto'))) }
}
/**
 * Actualiza un producto existente.
 * @param {string} id - El identificador del producto, representa el uid default.
 * @param {Partial<Product>} product - El producto con los nuevos datos.
 * @returns {Promise<Result<void>>} Actualiza un producto.
 */
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Result<void>> => {
  try {
    const result = await databaseService.updateProduct(id, product)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
}
/**
 * Elimina un producto existente.
 * @param {string} id - El identificador del producto, representa el uid default.
 * @returns {Promise<Result<void>>} Elimina un producto.
 */
export const deleteProduct = async (id: string): Promise<Result<void>> => {
  try {
    const result = await databaseService.deleteProduct(id)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar producto'))) }
}