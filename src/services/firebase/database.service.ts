import { CollectionReference, getFirestore, collection, Firestore, setDoc, doc } from "firebase/firestore"
import { normalizeError } from "@/errors/handler"
import { firebaseApp } from "@/services/db"
import { User } from "firebase/auth"
import ErrorAPI from "@/errors"

import { Result, success, failure } from "@/interfaces/db.interface";
/*--------------------------------------------------Database--------------------------------------------------*/
class DatabaseService {
  private static instance: DatabaseService
  private readonly db: Firestore
  private constructor() { this.db = getFirestore(firebaseApp) }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) { DatabaseService.instance = new DatabaseService() }
    return DatabaseService.instance
  }
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
  /**
   * Obtiene una referencia a una subcolección desde la colección principal (auth).
   * La abreviatura de la colección es 'gs' (gestion_salud).
   * @param {string} name - El nombre de la subcolección a obtener.
   * @returns {CollectionReference} Una referencia a la subcolección.
  */
  getCollection(name: string): CollectionReference { return collection(this.db, 'techno', 'auth', name) }
}
/*---------------------------------------------------------------------------------------------------------*/
export const databaseService = DatabaseService.getInstance()