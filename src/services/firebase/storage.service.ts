import { FirebaseStorage, getDownloadURL, updateMetadata, deleteObject, uploadBytes, getStorage, listAll, ref, SettableMetadata } from "firebase/storage"
import { Result, success, failure } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import { firebaseApp } from "@/services/db"
import ErrorAPI from "@/errors"


/*--------------------------------------------------Storage--------------------------------------------------*/
class StorageService {
  private static instance: StorageService
  private readonly storage: FirebaseStorage
  private constructor() { this.storage = getStorage(firebaseApp) }

  public static getInstance(): StorageService {
    if (!StorageService.instance) { StorageService.instance = new StorageService() }
    return StorageService.instance
  }
  /**
   * Obtiene una referencia a un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   */
  private getReference(path: string) { return ref(this.storage, path) }
  /**
   * Obtener la URL de un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo al que se accede.
   * @example path = 'users/profile/{username}/imagen.png'
   * @returns {Promise<Result<string>>} La URL del archivo.
   */
  async getFile(path: string): Promise<Result<string>> {
    try {
      const res = await getDownloadURL(this.getReference(path))
      return success(res)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener archivo'))) }
  }
  /**
   * Obtener las URLs de todos los archivos de un directorio del almacenamiento de Firebase.
   * @param {string} path - La ruta del directorio al que se accede.
   * @example path = 'users/profile/{username}'
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
   * Subir un archivo al almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final.
   * @example path podria ser 'tech/company/{email}/preview'
   * @param {File} file - El archivo a subir.
   * @returns {Promise<Result<string>>} La URL del archivo subido.
   */
  async uploadFile(path: string, file: File): Promise<Result<string>> {
    try {
      const storageRef = this.getReference(`technopark/enterprise/${path}`)
      const metadata = buildStorageMetadata(file)
      const upload = await uploadBytes(storageRef, file, metadata)
      return success(await getDownloadURL(upload.ref))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'subir archivo'))) }
  }
  /**
   * Actualiza un archivo en el almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo final @example path: "users/profile/{username}"
   * @param {File} file - El archivo nuevo a subir, con su nombre y extension @example file: "imagen.png"
   * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#003
   * @returns {Promise<Result<string>>} La URL del archivo actualizado.
   */
  async updateFile(path: string, file: SettableMetadata): Promise<Result<string>> {
    try {
      const res = await updateMetadata(this.getReference(path), file)
      if (!res.ref) return failure(new ErrorAPI({
        message: 'referencia del archivo actualizado no encontrada'
      }))
      return success(await getDownloadURL(res.ref))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar archivo'))) }
  }
  /**          
   * Elimina un archivo del almacenamiento de Firebase.
   * @param {string} path - La ruta del archivo a eliminar.
   */
  async deleteFile(path: string): Promise<Result<string>> {
    try {
      await deleteObject(this.getReference(path))
      return success('archivo eliminado')
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar archivo'))) }
  }
}
/*---------------------------------------------------------------------------------------------------------*/

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