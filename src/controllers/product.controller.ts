import { databaseService } from "@/services/firebase/database.service"
import { storageService } from "@/services/firebase/storage.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { ProductFormProps } from "@/schemas/product.schema"
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
 * first we need update the image in the storage
 * then we need update the product in the database
 * @param {string} idBusiness - Representa el uid del negocio asociado, recordemos que tenemos unos folders asociados
 * @param {string} idProduct - El identificador del producto, representa el uid default del documento
 * @param {Partial<ProductFormProps>} product - El producto con los nuevos datos.
 * @returns {Promise<Result<void>>} Actualiza un producto.
 */
export const updateProduct = async (idBusiness: string, idProduct: string, product: Partial<ProductFormProps>): Promise<Result<void>> => {
  try {
    //working here...
    let productData: Partial<Product>

    if (product.imageUrl) {
      const path = `${idBusiness}/products/${product.name}`
      const url = await storageService.updateFile(path, product.imageUrl)
      if (!url.success) throw url.error
      productData.imageUrl = url.data
    }

    // const productData = { ...product, imageUrl }
    const result = await databaseService.updateProduct(idProduct, productData)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
}

/**
 * Elimina un producto existente.
 * first we need delete the image in the storage.
 * then we can delete the product in the database.
 * @param {string} id - El identificador del producto, representa el uid default.
 * @param {string} name - El nombre del producto a eliminar.
 * @returns {Promise<Result<void>>} Elimina un producto.
 */
export const deleteProduct = async (id: string, name: string): Promise<Result<void>> => {
  try {
    const path = `${id}/products/${name}`
    const removeImage = await storageService.deleteFile(path)
    if (!removeImage.success) throw removeImage.error

    const removeProduct = await databaseService.deleteProduct(id)
    if (!removeProduct.success) throw removeProduct.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar producto'))) }
}