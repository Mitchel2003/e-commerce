/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { databaseService as databaseFB } from "@/services/firebase/database.service"
import { storageService as storageFB } from "@/services/firebase/storage.service"
import { authService as authFB } from "@/services/firebase/auth.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import ErrorAPI, { Unauthorized } from "@/errors"
import { normalizeError } from "@/errors/handler"
import { User } from "firebase/auth"

import { RegisterFormProps, LoginFormProps } from "@/schemas/auth.schema"

/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @argument photoURL - Hace parte del profile del usuario autenticado (lo usamos para la verificacion de email)
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async ({ email, password }: LoginFormProps): Promise<Result<User>> => {
  try {
    const result = await authFB.login(email, password)
    if (!result.success) throw result.error
    if (!result.data.emailVerified) return failure(new Unauthorized({ message: 'Email no verificado' }))
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'inicio de sesión'))) }
}
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * primero que todo, registramos la cuenta con la respectiva verificación de correo
 * luego, necesitamos subir las imagenes al storage de firebase y obtener las urls
 * finalmente registramos las credenciales en el database, "photoUrl" etc.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async ({ accessCredentials, businessData, references }: RegisterFormProps): Promise<Result<User>> => {
  try {
    const { email, password } = accessCredentials
    const userAccount = await authFB.registerAccount(businessData.name, email, password)
    if (!userAccount.success) throw userAccount.error

    const emailVerification = await authFB.sendEmailVerification()
    if (!emailVerification.success) throw emailVerification.error

    const { photoUrl, socialNetworks } = references
    const files = photoUrl.map(item => item.file)
    const placeImages = await storageFB.uploadFiles(`${email}/place/preview`, files)
    if (!placeImages.success) throw placeImages.error

    const credentials = { ...businessData, socialNetworks, photoUrl: placeImages.data }
    const userCredentials = await databaseFB.registerUserCredentials(userAccount.data, credentials)
    if (!userCredentials.success) throw userCredentials.error
    return success(userAccount.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'registro de empresa'))) }
}
/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @returns {Promise<void>} - Envía un mensaje de éxito.
 */
export const logout = async (): Promise<Result<void>> => {
  try {
    const result = await authFB.logout()
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'cierre de sesión'))) }
}