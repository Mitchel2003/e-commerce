import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, confirmPasswordReset, UserCredential, updateProfile, UserProfile, getAuth, Auth, User } from "firebase/auth"
import { firebaseApp } from "@/services/db"
import { NotFound } from "@/errors"
import config from "@/utils/config"

import { Result, failure, success } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

/*--------------------------------------------------Auth--------------------------------------------------*/
class AuthService {
  private static instance: AuthService
  private readonly auth: Auth
  private constructor() { this.auth = getAuth(firebaseApp) }

  public static getInstance(): AuthService {
    if (!AuthService.instance) { AuthService.instance = new AuthService() }
    return AuthService.instance
  }

  /*---------------> verification <---------------*/
  /**
   * Verifica las credenciales del usuario.
   * @param {string} email - El email del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuthFB>>} - Retorna el usuario si las credenciales son válidas, o un error si no lo son.
   */
  async verifyCredentials(email: string, password: string): Promise<Result<User>> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password)
      return success(result.user)
    } catch (e) {
      const res = normalizeError(e, 'verificar credenciales')
      return failure(new ErrorAPI(res))
    }
  }

  /*---------------> registration and update <---------------*/
  /**
   * Crea un usuario con credenciales en Firebase.
   * @param {string} username - El nombre de usuario.
   * @param {string} email - El correo del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Result<UserAuthFB>>} El usuario auth de firebase creado.
   */
  async registerAccount(username: string, email: string, password: string): Promise<Result<UserCredential>> {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password)
      const update = await this.updateProfile(res.user, { displayName: username })
      if (!update.success) throw new ErrorAPI(update.error)
      return success(res)
    } catch (e) {
      const res = normalizeError(e, 'registrar cuenta de usuario')
      return failure(new ErrorAPI(res))
    }
  }
  /**
   * Actualiza el perfil del usuario en Firebase.
   * Los campos editables son limitados: displayName, photoURL;
   * @param {User} user - El usuario de firebase, representa la autenticación.
   * @param {Partial<UserProfile>} profile - El campo a actualizar.
   */
  async updateProfile(user: User, profile: Partial<UserProfile>): Promise<Result<string>> {
    try {
      await updateProfile(user, profile)
      return success('Se han actualizado el profile')
    } catch (e) {
      const res = normalizeError(e, 'actualizar credenciales de usuario')
      return failure(new ErrorAPI(res))
    }
  }

  /*---------------> authentication <---------------*/
  /**
   * Envia un correo de verificación de cuenta al correo suministrado por el usuario.
   */
  async sendEmailVerification(): Promise<Result<string>> {
    try {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      const url = `${config.frontendUrl}/auth/verify-action`
      await sendEmailVerification(this.auth.currentUser, { url })
      return success('completado')
    } catch (e) {
      const res = normalizeError(e, 'enviar verificación de email')
      return failure(new ErrorAPI(res))
    }
  }
  /**
   * Envia un correo de restablecimiento de contraseña al correo suministrado por el usuario.
   * Enlace de redireccion esta definido en el archivo de configuracion de firebase (templates).
   * @param {string} email - El email del usuario.
   */
  async sendEmailResetPassword(email: string): Promise<Result<string>> {
    try {
      await sendPasswordResetEmail(this.auth, email)
      return success('Se ha enviado un correo de restauracion de contraseña')
    } catch (e) {
      const res = normalizeError(e, 'enviar email de restablecimiento')
      return failure(new ErrorAPI(res))
    }
  }
  /**
   * Actualiza la contraseña del usuario mediante un token de restablecimiento (oobCode) generado por firebase.
   * @param {string} oobCode - El token de restablecimiento de contraseña.
   * @param {string} newPassword - La contraseña de la solicitud de restablecimiento (forgot password).
   */
  async validateResetPassword(oobCode: string, newPassword: string): Promise<Result<string>> {
    try {
      await confirmPasswordReset(this.auth, oobCode, newPassword)
      return success('Contraseña restablecida correctamente')
    } catch (e) {
      const res = normalizeError(e, 'validar restablecimiento de contraseña')
      return failure(new ErrorAPI(res))
    }
  }
  /**
   * Actualiza el estado de verificación de correo electrónico del usuario actual.
   * Este metodo de vericacion usa credenciales del usuario autenticado;
   * Utilizamos photoURL para manejar el estado de verificacion de email.
   */
  async validateEmailVerification(): Promise<Result<string>> {
    try {
      if (!this.auth.currentUser) throw new NotFound({ message: 'Usuario (auth)' })
      await this.updateProfile(this.auth.currentUser, { photoURL: 'authenticated' })
      return success('Se ha verificado correctamente la cuenta')
    } catch (e) {
      const res = normalizeError(e, 'validar la verificación de email')
      return failure(new ErrorAPI(res))
    }
  }

}
/*---------------------------------------------------------------------------------------------------------*/
export const authService = AuthService.getInstance()