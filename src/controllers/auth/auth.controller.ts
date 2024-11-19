/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { databaseService as databaseFB } from "@/services/firebase/database.service"
import { storageService as storageFB } from "@/services/firebase/storage.service"
import { authService as authFB } from "@/services/firebase/auth.service"
import { failure, Result, success } from "@/interfaces/db.interface"
import ErrorAPI, { Unauthorized } from "@/errors"
import { normalizeError } from "@/errors/handler"

import { RegisterFormProps } from "@/schemas/auth/register.schema"
import { LoginFormProps } from "@/schemas/auth/login.schema"

import { User } from "firebase/auth"
/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @argument photoURL - Hace parte del profile del usuario autenticado (lo usamos para la verificacion de email)
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
export const login = async ({
  email,
  password
}: LoginFormProps): Promise<Result<User>> => {
  try {
    const result = await authFB.login(email, password);
    if (!result.success) return failure(new ErrorAPI(result.error));
    if (!result.data.photoURL) return failure(new Unauthorized({ message: 'Email no verificado' }));
    return success(result.data);
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'inicio de sesión'))) }
}
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * primero que todo, registramos la cuenta con la respectiva verificación de correo
 * luego, necesitamos subir la imagen al storage de firebase (solo si se envio la imagen "opcional")
 * finalmente registramos las credenciales en el database, "photoUrl" etc.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async ({
  accessCredentials,
  businessData,
  references
}: RegisterFormProps): Promise<Result<User>> => {
  try {
    const { email, password } = accessCredentials
    const result = await authFB.registerAccount(businessData.name, email, password)
    if (!result.success) return failure(new ErrorAPI(result.error))

    const sendEmail = await authFB.sendEmailVerification()
    if (!sendEmail.success) return failure(new ErrorAPI(sendEmail.error))

    const url = references?.photo && await storageFB.uploadFile(`${email}/preview`, references.photo)
    if (url !== undefined && !url.success) return failure(new ErrorAPI(url.error))

    const register = await databaseFB.registerUserCredentials(result.data, { ...businessData, ...references });
    if (!register.success) return failure(new ErrorAPI(register.error))
    return success(result.data);
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'registro de usuario'))) }
}