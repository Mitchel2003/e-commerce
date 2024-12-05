import { DatabaseService as IDatabase } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI, { NotFound } from "@/errors"
import { firebaseApp } from "@/services/db"
import { User } from "firebase/auth"

import { Result, success, failure } from "@/interfaces/db.interface";
import { Business, Product } from "@/interfaces/context.interface"

import {
  CollectionReference,
  getFirestore,
  collection,
  Firestore,
  deleteDoc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  doc
} from "firebase/firestore"

/**
 * Allow us conect with database firebase through an instance firestore
 * This class provides us various methods CRUD, among them we have the following
 * Business => to keep data important about business context like photoUrl etc.
 * Products => to save the diferents products of each business
 * 
 * ¿who are estructured the database?
 * 
 * techno (database)
 *   ===> auth (document)
 *       ===>> business (folder)
 *           ===>>> uid (document auth)
 *               ===>>>> {name: string, email: string, phone: string, photoURL: string[]...}
 * 
 *       ===>> products (folder)
 *           ===>>> uid (default) (document)
 *               ===>>>> {id: uid (auth), name: string, description: string, price: number, photoURL: string}
 * 
 * @argument uid(auth) represent the id of the business authenticate,
 * so we use this uid to identify the products of the business (crud).
 */
class DatabaseService implements IDatabase {
  private static instance: DatabaseService
  private readonly db: Firestore
  private constructor() { this.db = getFirestore(firebaseApp) }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) { DatabaseService.instance = new DatabaseService() }
    return DatabaseService.instance
  }

  /*-----------------> business <-----------------*/
  /**
   * Obtiene todos los negocios
   * @returns {Promise<Result<Business[]>>} Una lista de negocios.
   */
  async getAllBusinesses(): Promise<Result<Business[]>> {
    try {
      const snapshot = await getDocs(this.getCollection('business'))
      return success(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocios'))) }
  }

  /**
   * id represent the uid of the business (this is the name folder of each business)
   * @param {string} id - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
   * @returns {Promise<Result<Business>>} Un negocio.
   */
  async getBusinessById(id: string): Promise<Result<Business>> {
    try {
      const docSnap = await getDoc(doc(this.getCollection('business'), id))
      if (!docSnap.exists()) return failure(new NotFound({ message: 'Negocio no encontrado' }))
      return success({ id: docSnap.id, ...docSnap.data() } as Business)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocio'))) }
  }

  /**
   * Permite buscar negocios por nombre.
   * @param {string} searchTerm - El término de búsqueda.
   * @returns {Promise<Result<Business[]>>} Una lista de negocios.
  */
  async getBusinessByQuery(searchTerm: string): Promise<Result<Business[]>> {
    try {
      const queryRef = query(
        this.getCollection('business'),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      )
      const snapshot = await getDocs(queryRef)
      return success(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
  }

  /**
   * Crea un negocio con las credenciales del usuario asociado.
   * Utilizamos el unique id (UID) del usuario para establecer el uid del documento (negocio)
   * De este modo una cuenta (correo) está relacionada a su emprendimeinto correspondiente
   * @param {User} auth - Contiene el usuario autenticado para asociar al negocio.
   * @param {object} credentials - Corresponde a las credenciales del usuario, contiene el rol del usuario en validacion.
   */
  async createBusiness(auth: User, credentials: object): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('business'), auth.uid), {
        ...credentials,
        email: auth.email,
        name: auth.displayName
      }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'Registrar credenciales del usuario'))) }
  }

  /**
   * Actualiza un negocio existente.
   * @param {Partial<Business>} business - El negocio con los nuevos datos.
   * @returns {Promise<Result<void>>} Actualiza un negocio.
   */
  async updateBusiness({ id, ...business }: Partial<Business>): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('business'), id), { ...business }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar negocio'))) }
  }

  /**
   * Elimina un negocio existente
   * @param {string} id - El identificador del documento negocio, representa el uid (auth)
   * @returns {Promise<Result<void>>} Elimina un negocio
   */
  async deleteBusiness(id: string): Promise<Result<void>> {
    try {
      return await deleteDoc(doc(this.getCollection('business'), id)).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar negocio'))) }
  }
  /*----------------------------------------------------*/

  /*-----------------> products <-----------------*/
  /**
   * ¿who are estructured the database and relationship with image (storage)?
   * 
   * techno (database)
   *     ===>> auth (document)
   *         ===>> products (folder)
   *             ===>>> uid (idRamdomized - product) (document)
   *                 ===>>>> { idBusiness: string, imageUrl: string, ...product }
   * 
   * techno (storage)
   *     ===>> business
   *         ===>>> uid (idBusiness)
   *             ===>>>> products
   *                 ===>>> uid (idRamdomized) (file)
   */
  /**
   * Obtiene todos los productos de un negocio
   * @param {string} idBusiness - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
   * @returns {Promise<Result<Product[]>>} Una lista de productos.
   */
  async getAllProducts(idBusiness: string): Promise<Result<Product[]>> {
    try {
      const queryRef = query(
        this.getCollection('products'),
        where('idBusiness', '==', idBusiness)
      )
      const snapshot = await getDocs(queryRef)
      return success(snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as Product[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener productos'))) }
  }

  /**
   * Obtiene un producto por su id, corresponde directamente a su uid default.
   * @param {string} idProduct - El identificador del producto.
   * @returns {Promise<Result<Product>>} Un producto.
   */
  async getProductById(idProduct: string): Promise<Result<Product>> {
    try {
      const docSnap = await getDoc(doc(this.getCollection('products'), idProduct))
      if (!docSnap.exists()) return failure(new NotFound({ message: 'Producto no encontrado' }))
      return success({ ...docSnap.data() } as Product)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener producto'))) }
  }

  /**
   * id represent the id of the business (this is the name folder of each business)
   * @param {string} uid - El identificador del producto, representa el uid default (randomized).
   * @param {Product} product - El producto a crear.
   * @returns {Promise<Result<void>>} Crea un producto.
   */
  async createProduct(uid: string, product: Product): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('products'), uid), { ...product }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear producto'))) }
  }

  /**
   * Actualiza un producto existente.
   * @param {string} id - Representa el uid del documento producto a actualizar.
   * @param {Partial<Product>} product - El producto con los nuevos datos.
   * @argument id - remember that about UPDATE we dont know the uid document; so, if we need update, using us directly id of product (from card)
   * @argument product - The final product is saved with an "id" variable that belongs to uid business
   * @returns {Promise<Result<void>>} Actualiza un producto.
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('products'), id), { ...product }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
  }

  /**
   * Elimina un producto existente.
   * @param {string} id - El identificador del producto, representa el uid default.
   * @returns {Promise<Result<void>>} Elimina un producto.
   */
  async deleteProduct(id: string): Promise<Result<void>> {
    try {
      return await deleteDoc(doc(this.getCollection('products'), id)).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'eliminar producto'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> getReferences <---------------*/
  /**
   * Obtiene una referencia a una subcolección desde la colección principal (auth).
   * La abreviatura de la colección es 'gs' (gestion_salud).
   * @param {string} name - El nombre de la subcolección a obtener.
   * @returns {CollectionReference} Una referencia a la subcolección.
  */
  getCollection(name: string): CollectionReference { return collection(this.db, 'techno', 'auth', name) }
}

export const databaseService = DatabaseService.getInstance()