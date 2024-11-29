import { databaseService } from "@/services/firebase/database.service"
import { storageService } from "@/services/firebase/storage.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { Product } from "@/interfaces/context.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"
import { ProductFormProps } from "@/schemas/product.schema"

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
 * Crea un producto nuevo.
 * @param {string} id - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
 * @param {ProductFormProps} product - El producto a crear.
 * @returns {Promise<Result<void>>} Crea un producto.
 */
export const createProduct = async (id: string, product: ProductFormProps): Promise<Result<void>> => {
  try {
    //first we need save the image in the storage
    const imageUrl = await storageService.uploadFile(`${id}/products/${product.name}`, product.imageUrl)
    if (!imageUrl.success) throw imageUrl.error

    const productData = { id, ...product, imageUrl: imageUrl.data }
    const result = await databaseService.createProduct(productData)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear producto'))) }
}
/**
 * Actualiza un producto existente.
 * @param {string} id - El identificador del producto, representa el uid del negocio (auth).
 * @param {Partial<ProductFormProps>} product - El producto con los nuevos datos.
 * @returns {Promise<Result<void>>} Actualiza un producto.
 */
/** (warning: i need test this) */
export const updateProduct = async (id: string, product: Partial<ProductFormProps>): Promise<Result<void>> => {
  try {
    //first we need update the image in the storage
    const path = `${id}/products/${product.name}`
    const imageUrl = await storageService.updateFile(path, product.imageUrl as File)
    if (!imageUrl.success) throw imageUrl.error

    //then we need update the product in the database
    const productData = { id, ...product, imageUrl: imageUrl.data }
    const result = await databaseService.updateProduct(productData)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
}
/**
 * Elimina un producto existente.
 * @param {string} id - El identificador del producto, representa el uid default.
 * @param {string} name - El nombre del producto a eliminar.
 * @returns {Promise<Result<void>>} Elimina un producto.
 */
export const deleteProduct = async (id: string, name: string): Promise<Result<void>> => {
  try {
    //first we need delete the image in the storage
    const path = `${id}/products/${name}`
    const removeImage = await storageService.deleteFile(path)
    if (!removeImage.success) throw removeImage.error

    //then we need delete the product in the database
    const removeProduct = await databaseService.deleteProduct(id)
    if (!removeProduct.success) throw removeProduct.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar producto'))) }
}