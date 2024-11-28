import { normalizeError } from "@/errors/handler"
import ErrorAPI, { NotFound } from "@/errors"
import { firebaseApp } from "@/services/db"
import { User } from "firebase/auth"

import { Result, success, failure } from "@/interfaces/db.interface";
import { Business } from "@/interfaces/context.interface"

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
  doc
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
   * @param {UserCredential} auth - Contiene el usuario autenticado a registrar; en la propiedad "user" se encuentran sus datos.
   * @param {UserFB} credentials - Corresponde a las credenciales del usuario, contiene el rol del usuario en validacion.
   */
  async registerUserCredentials(auth: User, credentials: object): Promise<Result<void>> {
    try {
      return await setDoc(doc(this.getCollection('users'), auth.email as string), {
        ...credentials,
        email: auth.email,
        name: auth.displayName
      }).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'Registrar credenciales del usuario'))) }
  }

  /*---------------> business <---------------*/
  /** Obtiene todos los negocios */
  async getAllBusinesses(): Promise<Result<Business[]>> {
    try {
      const snapshot = await getDocs(this.getCollection('users'))
      return success(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocios'))) }
  }
  /** id represent the email (this is the name folder of each business) */
  async getBusinessById(id: string): Promise<Result<Business>> {
    try {
      const docRef = doc(this.getCollection('users'), id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) return failure(new NotFound({ message: 'Negocio no encontrado' }))
      return success({ id: docSnap.id, ...docSnap.data() } as Business)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocio'))) }
  }
  /** searchTerm represent the termin to search */
  async getBusinessByQuery(searchTerm: string): Promise<Result<Business[]>> {
    try {
      const req = query(
        this.getCollection('users'),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff')
      )
      const snapshot = await getDocs(req)
      return success(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[])
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
  }


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