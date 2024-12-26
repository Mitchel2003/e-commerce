import { Result, success, failure, Success, StorageService as IStorage, Metadata } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI, { NotFound } from "@/errors"
import { firebaseApp } from "@/services/db"

import {
  FirebaseStorage,
  getDownloadURL,
  updateMetadata,
  deleteObject,
  uploadBytes,
  getStorage,
  listAll,
  ref
} from "firebase/storage"

/**
 * 
 * ¿who are estructured the database?
 * 
 * techno (storage)
 *     ===> business (folder)
 *         ===>> uid (folder auth)
 *             ===>>> place (folder)
 *                 ===>>>> preview_1 ... (limit 3)
 * 
 *             ===>>> products (folder)
 *                 ===>>>> product.name ... (Xn)
 * 
 * @argument uid(auth) represent the id of the business,
 * so, just like that, each folder that represent a business could have many products
 */
class StorageService implements IStorage {
  private static instance: StorageService
  private readonly storage: FirebaseStorage
  private constructor() { this.storage = getStorage(firebaseApp) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance
  }

  /*---------------> storage <---------------*/
  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   * @example path = '.../{user.uid}/products/{product.name}'
   * @returns {Promise<Result<string>>} La URL del archivo.
   */
  async getFile(path: string): Promise<Result<string>> {
    try {
      return await getDownloadURL(this.getReference(path)).then(res => success(res))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener archivo'))) }
  }

  /**
   * Obtener las URLs de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param {string} path - La ruta del directorio al que se accede.
   * @example path = '.../{user.uid}/products' => folder
   * @returns {Promise<Result<string[]>>} Un array con las URLs de los archivos.
   */
  async getFiles(path: string): Promise<Result<string[]>> {
    try {
      const storageRef = this.getReference(path)
      const files = await listAll(storageRef)
      return success(await Promise.all(
        files.items.map(item => getDownloadURL(item))
      ))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener archivos'))) }
  }

  /**
   * Obtiene los metadatos de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param {string} path - La ruta del directorio al que se accede.
   * @returns {Promise<Result<Metadata[]>>} Un array con los metadatos de los archivos.
   */
  async getFilesWithMetadata(path: string): Promise<Result<Metadata[]>> {
    try {
      const storageRef = this.getReference(path)
      const files = await listAll(storageRef)
      return success(await Promise.all(
        files.items.map(async item => ({ name: item.name, url: await getDownloadURL(item) }))
      ))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener archivos'))) }
  }

  /**
   * Subir un archivo al almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final.
   * @param {File} file - El archivo a subir.
   * @example path = '.../{user.uid}/place/{product.name}'
   * @returns {Promise<Result<string>>} La URL del archivo subido.
   */
  async uploadFile(path: string, file: File): Promise<Result<string>> {
    try {
      const metadata = buildStorageMetadata(file)
      const storageRef = this.getReference(path)
      const upload = await uploadBytes(storageRef, file, metadata)
      return success(await getDownloadURL(upload.ref))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'subir archivo'))) }
  }

  /**
   * Sube múltiples archivos al almacenamiento de Firebase.
   * @param {string} path - directorio (place/products) + nombre del archivo
   * @param {File[]} files - Array de archivos a subir
   * @argument results - Pretende subir cada uno de los files a Firebase Storage
   * se espera un array con las URLs de los archivos subidos, pero como el uploadFile
   * es un Result(success o failure), se debe manejar el error de cada upload
   * @returns {Promise<Result<string[]>>} Array con las URLs de los archivos subidos
   */
  async uploadFiles(path: string, files: File[]): Promise<Result<string[]>> {
    try {
      const random = Math.floor(Math.random() * 10000)//genera un numero random de 4 digitos
      const results = await Promise.all(files.map((file) => this.uploadFile(`${path}_${random}`, file)))
      const failed = results.find(result => !result.success)
      if (failed) return failure(failed.error)

      const urls = results.map(result => (result as Success<string>).data)
      return success(urls)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'subir múltiples archivos'))) }
  }

  /**
   * Actualiza un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final @example path: "{uid}/products/{product.name}"
   * @param {File} file - El archivo nuevo a subir, con su nombre y extension @example file: "image.png"
   * @returns {Promise<Result<string>>} La URL del archivo actualizado.
   */
  async updateFile(path: string, file: File): Promise<Result<string>> {
    try {
      const metadata = buildStorageMetadata(file)
      const storageRef = this.getReference(path)
      const res = await updateMetadata(storageRef, metadata)
      if (!res.ref) throw new NotFound({ message: 'referencia del archivo no encontrada' })
      return success(await getDownloadURL(res.ref))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar archivo'))) }
  }

  /**          
   * Elimina un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo a eliminar.
   * @example path = '{user.uid}/products/{name}'
   * @returns {Promise<Result<void>>} Elimina un archivo.
   */
  async deleteFile(path: string): Promise<Result<void>> {
    try {
      return await deleteObject(this.getReference(path)).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar archivo'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> getReferences <---------------*/
  /**
   * Obtiene una referencia a un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   */
  private getReference(path: string) { return ref(this.storage, `techno/business/${path}`) }
}

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Construye los metadatos del archivo para Firebase Storage.
 * @param {File} file - El archivo a subir. @example file: "imagen.png"
 * @returns {object} Los metadatos del archivo con su configuración para Firebase Storage.
 */
const buildStorageMetadata = (file: File): object => {
  return {
    contentType: file.type,
    customMetadata: { originalName: file.name, uploadedAt: new Date().toISOString() }
  }
}
/*---------------------------------------------------------------------------------------------------------*/
export const storageService = StorageService.getInstance()