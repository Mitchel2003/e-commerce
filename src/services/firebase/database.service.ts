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
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  doc,
  deleteDoc
} from "firebase/firestore"

class DatabaseService {
  private static instance: DatabaseService
  private readonly db: Firestore
  private constructor() { this.db = getFirestore(firebaseApp) }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) { DatabaseService.instance = new DatabaseService() }
    return DatabaseService.instance
  }

  /*---------------> authentication <---------------*/
  /**
   * Crea las credenciales de un usuario en la base de datos de firebase.
   * @param {UserCredential} auth - Contiene el usuario autenticado a registrar.
   * @param {UserFB} credentials - Corresponde a las credenciales del usuario, contiene el rol del usuario en validacion.
   */
  async registerUserCredentials(auth: User, credentials: object): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('business'), auth.uid), {
        ...credentials,
        email: auth.email,
        name: auth.displayName
      }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'Registrar credenciales del usuario'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> business <---------------*/
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
   * @param {string} idBusiness - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
   * @returns {Promise<Result<Business>>} Un negocio.
   */
  async getBusinessById(idBusiness: string): Promise<Result<Business>> {
    try {
      const docRef = doc(this.getCollection('business'), idBusiness)
      const docSnap = await getDoc(docRef)
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
      const req = query(
        this.getCollection('business'),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      )
      const snapshot = await getDocs(req)
      return success(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
  }
  /*----------------------------------------------------*/

  /**
   * this is tom explain we who using the id of the business (auth):
   * first, i need explain who is estructured the database:
   * 
   * techno (database)
   *   -> auth (document)
   *     --> business (folder)
   *       ---> uid (auth) (document)
   *         ----> {name: string, email: string, phone: string, photoURL: string[]...}
   * 
   *     --> products (folder)
   *       ---> uid (default) (document)
   *         ----> {id: uid (auth), name: string, description: string, price: number, photoURL: string}
   * 
   * idBusiness represent the id of the business (auth),
   * so we use this uid to identify the products of the business.
   */
  /*---------------> products <---------------*/
  /**
   * Obtiene todos los productos de un negocio
   * @param {string} idBusiness - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
   * @returns {Promise<Result<Product[]>>} Una lista de productos.
   */
  async getAllProducts(idBusiness: string): Promise<Result<Product[]>> {
    try {
      const snapshot = await getDocs(query(this.getCollection('products'), where('id', '==', idBusiness)))
      return success(snapshot.docs.map(doc => ({ ...doc.data() })) as Product[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener productos'))) }
  }
  /**
   * Obtiene un producto por su id, corresponde directamente a su uid default.
   * @param {string} idProduct - El identificador del producto.
   * @returns {Promise<Result<Product>>} Un producto.
   */
  async getProductById(idProduct: string): Promise<Result<Product>> {
    try {
      const docRef = doc(this.getCollection('products'), idProduct)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) return failure(new NotFound({ message: 'Producto no encontrado' }))
      return success({ ...docSnap.data() } as Product)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener producto'))) }
  }
  /**
   * Permite buscar productos por nombre.
   * @param {string} searchTerm - El término de búsqueda.
   * @param {string} idBusiness - El identificador del negocio, corresponde al uid del negocio en cuestión (auth).
   * @returns {Promise<Result<Product[]>>} Una lista de productos.
   */
  async getProductByQuery(searchTerm: string, idBusiness: string): Promise<Result<Product[]>> {
    try {
      const req = query(
        this.getCollection('products'),
        where('id', '==', idBusiness),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      )
      const snapshot = await getDocs(req)
      return success(snapshot.docs.map(doc => ({ ...doc.data() })) as Product[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar productos'))) }
  }
  /**
   * id represent the id of the business (this is the name folder of each business)
   * @param {string} id - El identificador del producto, corresponde al uid del negocio en cuestión.
   * @param {Product} product - El producto a crear.
   * @returns {Promise<Result<void>>} Crea un producto.
   */
  async createProduct(id: string, product: Product): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('products')), {
        ...product, id
      }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'crear producto'))) }
  }
  /**
   * Actualiza un producto existente.
   * @param {string} id - El identificador del producto, representa el uid default.
   * @param {Product} product - El producto con los nuevos datos.
   * @returns {Promise<Result<void>>} Actualiza un producto.
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('products'), id), product).then(() => success(undefined))
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