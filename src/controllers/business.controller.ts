import { RegisterFormProps as BusinessFormProps, RegisterUpdateFormProps as BusinessUpdateFormProps } from "@/schemas/auth.schema"
import { databaseService as databaseFB } from "@/services/firebase/database.service"
import { storageService as storageFB } from "@/services/firebase/storage.service"
import { databaseService } from "@/services/firebase/database.service"

import { Result, success, failure, Metadata } from "@/interfaces/db.interface"
import { Business } from "@/interfaces/context.interface"
import { normalizeError } from "@/errors/handler"
import { User } from "firebase/auth"
import ErrorAPI from "@/errors"

/**
 * Obtiene todos los negocios.
 * @returns {Promise<Result<Business[]>>} Una lista de negocios.
 */
export const getBusinesses = async (): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getAllBusinesses()
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener lista de negocios'))) }
}

/**
 * Obtiene un negocio por su id, representa el uid del negocio en cuestión (auth).
 * @param {string} id - El identificador del negocio.
 * @returns {Promise<Result<Business>>} Un negocio.
 */
export const getBusinessById = async (id: string): Promise<Result<Business>> => {
  try {
    const result = await databaseService.getBusinessById(id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocio'))) }
}

/**
 * Busca negocios por nombre.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise<Result<Business[]>>} Una lista de negocios.
 */
export const getBusinessByQuery = async (query: string): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getBusinessByQuery(query)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
}

/**
 * Crea un nuevo negocio.
 * primero necesitamos subir las imagenes al storage de firebase y obtener las urls
 * finalmente registramos las credenciales del negocio en el database, "photoUrl" etc.
 * @param {User} userAccount - El usuario autenticado.
 * @param {BusinessFormProps} business - Los datos del negocio a crear.
 * @returns {Promise<Result<Business>>} Un negocio.
 */
export const createBusiness = async (userAccount: User, { businessData, references }: BusinessFormProps): Promise<Result<void>> => {
  try {
    const { photoUrl, socialNetworks } = references
    const placeImages = await createBusinessImage(userAccount.uid, photoUrl)
    if (!placeImages.success) throw placeImages.error

    const credentials = { ...businessData, socialNetworks }
    const userCredentials = await databaseFB.createBusiness(userAccount, credentials)
    if (!userCredentials.success) throw userCredentials.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear negocio'))) }
}

/**
 * Actualiza un negocio existente.
 * @param {string} id - El identificador del negocio.
 * @param {BusinessUpdateFormProps} business - Los datos del negocio a actualizar.
 * @returns {Promise<Result<void>>} Actualiza un negocio.
 */
export const updateBusiness = async (id: string, business: Partial<BusinessUpdateFormProps>): Promise<Result<void>> => {
  try {
    const result = await databaseService.updateBusiness({ id, ...business })
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar negocio'))) }
}

/**
 * Elimina un negocio existente.
 * @param {string} id - El identificador del negocio.
 * @returns {Promise<Result<void>>} Elimina un negocio.
 */
export const deleteBusiness = async (id: string): Promise<Result<void>> => { //dont works yet //working here...
  try {
    //eliminar las imagenes del storage con el id del negocio
    //eliminar los productos del negocio asociado (idBusiness)
    //eliminar el negocio del database
    const result = await databaseService.deleteBusiness(id)
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar negocio'))) }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------images--------------------------------------------------*/
/**
 * Obtiene los metadatos de las imágenes de un negocio.
 * @param {string} idBusiness - El identificador del negocio.
 * @returns {Promise<Result<string[]>>} Un array con los nombres de las imágenes
 */
export const getAllBusinessImages = async (idBusiness: string): Promise<Result<Metadata[]>> => {
  try {
    const result = await storageFB.getFilesWithMetadata(`${idBusiness}/place`)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener imágenes'))) }
}

/**
 * Crea una imagen de un negocio.
 * @param {string} idBusiness - El ID del negocio (uid).
 * @param {BusinessFormProps['references']['photoUrl']} metadata - Los datos de las imágenes.
 * @returns {Promise<Result<void>>} Un void que resulta de la ejecucion de la funcion create
 */
export const createBusinessImage = async (idBusiness: string, metadata: BusinessFormProps['references']['photoUrl']): Promise<Result<void>> => {
  try {
    const files = metadata.map(item => item.file)
    const placeImages = await storageFB.uploadFiles(`${idBusiness}/place/preview`, files)
    if (!placeImages.success) throw placeImages.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear imagen'))) }
}

/**
 * Elimina una imagen de un negocio.
 * @param {string} idBusiness - El identificador del negocio.
 * @param {string} nameImage - El nombre de la imagen.
 * @returns {Promise<Result<void>>} Elimina una imagen.
 */
export const deleteBusinessImage = async (idBusiness: string, nameImage: string): Promise<Result<void>> => {
  try {
    const path = `${idBusiness}/place/${nameImage}`
    const removeImage = await storageFB.deleteFile(path)
    if (!removeImage.success) throw removeImage.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar imagen'))) }
}