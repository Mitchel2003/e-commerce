import { Business, Product, BusinessStats, BusinessVisit } from "@/interfaces/context.interface"
import { DatabaseService as IDatabase, QueryProps } from "@/interfaces/db.interface"
import { Result, success, failure } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI, { NotFound } from "@/errors"
import { firebaseApp } from "@/services/db"
import { User } from "firebase/auth"

import {
  CollectionReference,
  serverTimestamp,
  QueryConstraint,
  getFirestore,
  collection,
  Timestamp,
  Firestore,
  updateDoc,
  deleteDoc,
  increment,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  limit,
  doc,
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
 *           ===>>> uid (default) (document)
 *               ===>>>> {name: string, email: string, phone: string, photoURL: string[]...}
 * 
 *       ===>> products (folder)
 *           ===>>> uid (idRamdomized) (document)
 *               ===>>>> {idBusiness: uid (business), name: string, description: string, price: number, photoURL: string}
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
   * Permite buscar negocios con filtros avanzados y dinámicos.
   * @param {QueryProps} options - Opciones de búsqueda
   * @returns {Promise<Result<Business[]>>} Una lista de negocios filtrada.
   */
  async getBusinessByQuery(options: QueryProps): Promise<Result<Business[]>> {
    try {
      const constraints: QueryConstraint[] = []
      if (options.limit) { constraints.push(limit(options.limit)) }
      if (options.filters?.length) {
        options.filters.forEach(filter => {
          constraints.push(where(filter.field, filter.operator, typeof filter.value === 'string' ? filter.value.toLowerCase() : filter.value))
        })
      }
      const snapshot = await getDocs(query(this.getCollection('business'), ...constraints))
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
      return await updateDoc(doc(this.getCollection('business'), id), { ...business }).then(() => success(undefined))
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
   * @returns {Promise<Result<void>>} Actualiza un producto.
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<Result<void>> {
    try {
      return await updateDoc(doc(this.getCollection('products'), id), { ...product }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar producto'))) }
  }

  /**
   * Actualiza el contador de likes de un producto.
   * @param {string} id - El identificador del producto, representa el uid default.
   * @returns {Promise<Result<boolean>>} Actualiza el contador de likes.
   */
  async updateProductLikes(id: string): Promise<Result<boolean>> {
    try {
      await updateDoc(doc(this.getCollection('products'), id), { likes: increment(1) })
      return success(true)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar likes'))) }
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

  /*---------------> analytics <---------------*/
  /** Servicio de análisis para el seguimiento de visitas a negocios */

  /**
   * Obtiene las estadísticas de visitas para un negocio específico
   * @param businessId ID del negocio
   */
  public async getBusinessStats(businessId: string): Promise<Result<BusinessStats>> {
    try {
      const statsRef = doc(this.getStatsCollection(businessId, 'stats'), 'stats_document')
      const statsDoc = await getDoc(statsRef) //Get stats document
      if (statsDoc.exists()) return success(statsDoc.data() as BusinessStats)
      const emptyStats: BusinessStats = { businessId, totalVisits: 0, visitsByDate: {}, uniqueVisitors: 0, lastUpdated: Date.now() }
      return success(emptyStats)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener estadísticas'))) }
  }

  /**
   * Registra una visita a un negocio de manera optimizada.
   * Implementa verificación en caché y escritura directa para máxima compatibilidad
   * @param businessId ID del negocio visitado, representa el uid del negocio en cuestión (auth).
   * @param visitorId ID único del visitante, proporcionado por el servicio VisitorIdentifier.
   * @returns {Promise<Result<void>>} Resultado de la operación
   */
  public async recordBusinessVisit(businessId: string, visitorId: string): Promise<Result<void>> {
    try {
      const today = new Date();
      const timestamp = Date.now();
      const dateString = today.toISOString().split('T')[0];
      const visitsRef = this.getStatsCollection(businessId, 'visits');
      const statsRef = doc(this.getStatsCollection(businessId, 'stats'), 'stats_document');

      const yesterday = new Date(today); //last 24 hours
      yesterday.setDate(yesterday.getDate() - 1);
      const recentVisitsQuery = query(visitsRef,
        where('visitorId', '==', visitorId),
        where('timestamp', '>=', Timestamp.fromDate(yesterday).toMillis())
      )

      const recentVisitsSnapshot = await getDocs(recentVisitsQuery);
      //If there is a recent visit, do nothing more (avoids duplicates)
      if (!recentVisitsSnapshot.empty) return success(undefined);
      //Create visit document with unique deterministic ID to avoid duplicates
      const visitId = `${businessId}_${visitorId}_${dateString}`
      const visitRef = doc(visitsRef, visitId) //create visit document
      const visitData: BusinessVisit = { timestamp, visitorId } //prepare
      await setDoc(visitRef, { ...visitData, createdAt: serverTimestamp() })

      //Get references to stats document (update stats)
      const statsDoc = await getDoc(statsRef)
      if (!statsDoc.exists()) { //initial doc
        const initialStats: BusinessStats = {
          businessId, totalVisits: 1, uniqueVisitors: 1,
          lastUpdated: timestamp, visitsByDate: { [dateString]: 1 }
        }
        await setDoc(statsRef, { ...initialStats, createdAt: serverTimestamp() })
      } else {
        const stats = statsDoc.data() as BusinessStats
        //Verify if this visitor is new (not previous visit, only last 2 visits)
        const visitorHistoryQuery = query(visitsRef, where('visitorId', '==', visitorId), limit(2))
        const visitorHistory = await getDocs(visitorHistoryQuery)
        const isNewVisitor = visitorHistory.size <= 1
        const statsData = { //Increment counters
          lastUpdated: serverTimestamp(),
          totalVisits: (stats.totalVisits || 0) + 1,
          uniqueVisitors: isNewVisitor ? (stats.uniqueVisitors || 0) + 1 : (stats.uniqueVisitors || 0),
          visitsByDate: { ...stats.visitsByDate, [dateString]: (stats.visitsByDate?.[dateString] || 0) + 1 }
        } //after this, update stats document
        await updateDoc(statsRef, statsData)
      }
      return success(undefined)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'registrar visita'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> helpers <---------------*/
  /**
   * Obtiene una referencia a una colección principal
   * @param name Nombre de la colección principal
   * @returns Referencia a la colección
   */
  getCollection(name: string): CollectionReference { return collection(this.db, 'techno', 'auth', name) }

  /**
   * Obtiene una referencia a una subcolección de estadísticas de un negocio
   * @param businessId ID del negocio, representa el uid firestore default.
   * @param subCollectionName Nombre de la subcolección (stats o visits)
   * @returns Referencia a la subcolección
   */
  getStatsCollection(businessId: string, subCollectionName: 'stats' | 'visits'): CollectionReference {
    return collection(this.db, 'techno', 'auth', 'business', businessId, subCollectionName)
  }
}

export const databaseService = DatabaseService.getInstance()