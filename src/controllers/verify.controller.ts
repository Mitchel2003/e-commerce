import { authService as authFB } from "@/services/firebase/auth.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

/**
 * Verifica la acción del usuario (registro).
 * La solicitud puede ser de tipo verificación de correo electrónico o de cambio de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos de la solicitud en body y el modo de verificación en params.
 * @returns {Promise<void>} - Envía un mensaje de confirmación.
 * @example
 * "verifyEmail" => uid, email, username y role.
 * "resetPassword" => oobCode y password.
 */
interface VerifyActionProps { body: any, mode: string }
export const verifyAction = async ({ body, mode }: VerifyActionProps): Promise<Result<void>> => {
  try {
    const result = mode === 'verifyEmail'
      ? await authFB.validateEmailVerification()
      : await authFB.validateResetPassword(body.oobCode, body.password)
    if (!result.success) throw new ErrorAPI(result.error);
    return success(undefined)
  } catch (e: unknown) { return failure(normalizeError(e, 'verificar acción')) }
}

/*--------------------------------------------------ResetPassword--------------------------------------------------*/
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Establece un token de restablecimiento de contraseña para el usuario
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async (email: string): Promise<Result<void>> => {
  try {
    const result = await authFB.sendEmailResetPassword(email);
    if (!result.success) throw new ErrorAPI(result.error);
    return success(undefined)
  } catch (e: unknown) { return failure(normalizeError(e, 'envio de correo de restablecimiento de contraseña')) }
}

/**
 * Nos permite actualizar la contraseña del usuario.
 * Valida un token y su respectiva expiración.
 * Envia un email de éxito si la contraseña se actualiza correctamente.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente, caso contrario un mensaje de error.
 */
interface ResetPasswordProps { params: any, body: any }
export const resetPassword = async ({ params, body }: ResetPasswordProps): Promise<Result<void>> => {
  try {
    const result = await authFB.validateResetPassword(params.oobCode, body.password);
    if (!result.success) throw new ErrorAPI(result.error);
    return success(undefined)
  } catch (e: unknown) { return failure(normalizeError(e, 'validar restablecimiento de contraseña')) }
}