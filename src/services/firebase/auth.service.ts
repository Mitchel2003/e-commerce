import { Result, failure, success, AuthService as IAuth } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

import { firebaseApp } from "@/services/db"
import { NotFound } from "@/errors"

import {
  sendEmailVerification as sendEmailVerificationFB,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  UserProfile,
  getAuth,
  signOut,
  Auth,
  User
} from "firebase/auth"

/**
 * Consist on a class that works above an instance auth
 * Have various functions like observer, verification or overwrite data
 */
class AuthService implements IAuth {
  private static instance: AuthService
  private readonly auth: Auth
  private constructor() { this.auth = getAuth(firebaseApp) }

  public static getInstance(): AuthService {
    if (!AuthService.instance) { AuthService.instance = new AuthService() }
    return AuthService.instance
  }

  /*---------------> authentication <---------------*/
  /**
   * Es un observador que ejecuta un callback cuando el estado de la sesion cambia.
   * @param {(user: any) => void} callback - Accion a desencadenar tras el cambio en el estado del usuario
   */
  observeAuth(callback: (user: any) => void) {
    onAuthStateChanged(this.auth, callback)
  }

  /**
   * Crea una autenticación por medio de la verificación de credenciales.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<User>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async login(email: string, password: string): Promise<Result<User>> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password).then(res => success(res.user))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'verificar credenciales'))) }
  }

  /**
   * Permite cerrar la sessión del usuario en contexto
   * @returns {Promise<Result<void>>} - Retorna un mensaje de éxito si la sesión se cierra correctamente.
   */
  async logout(): Promise<Result<void>> {
    try { return await signOut(this.auth).then(() => success(undefined)) }
    catch (e) { return failure(new ErrorAPI(normalizeError(e, 'cerrar sesión'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> create and update <---------------*/
  /**
   * Crea un usuario con credenciales en Firebase.
   * @param {string} username - El nombre de usuario.
   * @param {string} email - El correo del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuthFB>>} El usuario auth de firebase creado.
   */
  async registerAccount(username: string, email: string, password: string): Promise<Result<User>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
      const profileUpdate = await this.updateProfile(userCredential.user, { displayName: username })
      if (!profileUpdate.success) throw profileUpdate.error
      return success(userCredential.user)
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'registrar cuenta'))) }
  }

  /**
   * Actualiza el perfil del usuario en Firebase.
   * Los campos editables son limitados: displayName, photoURL;
   * @param {User} user - El usuario de firebase, representa la autenticación.
   * @param {Partial<UserProfile>} profile - El campo a actualizar.
   */
  async updateProfile(user: User, profile: Partial<UserProfile>): Promise<Result<void>> {
    try {
      return await updateProfile(user, profile).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'actualizar perfil'))) }
  }
  /*----------------------------------------------------*/

  /*---------------> verification <---------------*/
  /**
   * Envia un correo de verificación de cuenta al correo suministrado por el usuario
   * Anteriormente manejaba un enlace de redireccionamiento, pero se ha eliminado por cuestiones de reutilización..
   */
  async sendEmailVerification(): Promise<Result<void>> {
    try {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      return await sendEmailVerificationFB(this.auth.currentUser).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'enviar email de verificación'))) }
  }

  /**
   * Envia un correo de restablecimiento de contraseña al correo suministrado por el usuario.
   * Enlace de redireccion esta definido en el archivo de configuracion de firebase (templates).
   * @param {string} email - El email del usuario.
   */
  async sendEmailResetPassword(email: string): Promise<Result<void>> {
    try {
      return await sendPasswordResetEmail(this.auth, email).then(() => success(undefined))
    } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'enviar email de restablecimiento'))) }
  }
}

export const authService = AuthService.getInstance()