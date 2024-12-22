/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
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
 * registramos la cuenta con la respectiva verificación de correo.
 * @param {RegisterFormProps} user - Los datos del negocio y del nuevo usuario.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (user: RegisterFormProps): Promise<Result<User>> => {
  try {
    const { email, password } = user.accessCredentials
    const userAccount = await authFB.registerAccount(user.businessData.name, email, password)
    if (!userAccount.success) throw userAccount.error

    const emailVerification = await authFB.sendEmailVerification()
    if (!emailVerification.success) throw emailVerification.error
    return success(userAccount.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'registro de usuario'))) }
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

/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Establece un token de restablecimiento de contraseña para el usuario
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async (email: string): Promise<Result<void>> => {
  try {
    const result = await authFB.sendEmailResetPassword(email);
    if (!result.success) throw result.error
    return success(undefined)
  } catch (e: unknown) { return failure(normalizeError(e, 'envio de correo de restablecimiento de contraseña')) }
}