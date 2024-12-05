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
 * @param {string} idBusiness - El identificador del negocio, corresponde al uid (auth).
 * @param {ProductFormProps} product - El producto a crear.
 * @returns {Promise<Result<void>>} Crea un producto.
 */
export const createProduct = async (idBusiness: string, product: ProductFormProps): Promise<Result<void>> => {
  try {
    const uid = crypto.randomUUID().slice(0, 8)//generamos un id ramdomizado de 8 caracteres
    const imageUrl = await storageService.uploadFile(`${idBusiness}/products/${uid}`, product.imageUrl)
    if (!imageUrl.success) throw imageUrl.error

    const productData = { idBusiness, ...product, imageUrl: imageUrl.data }
    const result = await databaseService.createProduct(uid, productData)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear producto'))) }
}

/**
 * Actualiza un producto existente.
 * @param {string} idBusiness - Representa el uid del negocio asociado
 * @param {string} idProduct - El identificador del producto (uid default)
 * @param {Partial<ProductFormProps>} product - Los datos a actualizar
 * @returns {Promise<Result<void>>} Actualiza un producto
 */
export const updateProduct = async (idBusiness: string, idProduct: string, { imageUrl, ...productData }: Partial<ProductFormProps>): Promise<Result<void>> => {
  try {
    let productToUpdate: Partial<Product> = { ...productData }
    if (imageUrl instanceof File) { //if we receive a new image, we need update storage
      const path = `${idBusiness}/products/${productData.name}`
      const imageResult = await storageService.updateFile(path, imageUrl)
      if (!imageResult.success) throw imageResult.error
      productToUpdate.imageUrl = imageResult.data
    }

    const result = await databaseService.updateProduct(idProduct, productToUpdate)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
}

/**
 * Elimina un producto existente.
 * @param {string} idBusiness - El identificador del negocio, representa el uid (auth).
 * @param {string} idProduct - El identificador del producto (uid default).
 * @returns {Promise<Result<void>>} Elimina un producto.
 */
export const deleteProduct = async (idBusiness: string, idProduct: string): Promise<Result<void>> => {
  try {
    const path = `${idBusiness}/products/${idProduct}`
    const removeImage = await storageService.deleteFile(path)
    if (!removeImage.success) throw removeImage.error

    const removeProduct = await databaseService.deleteProduct(idProduct)
    if (!removeProduct.success) throw removeProduct.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar producto'))) }
}