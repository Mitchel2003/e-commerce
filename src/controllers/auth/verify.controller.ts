import { authService as authFB } from "@/services/firebase/auth.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

/**
 * Verifica el token de acceso del usuario (autenticación).
 * Extrae las credenciales del token (id_user), en caso de que token sea invalido, no se permitirá el acceso.
 * @returns {Promise<void>} - Envía los datos del usuario autenticado o un mensaje de error.
 */
export const verifyAuth = async (): Promise<Result<object>> => {
  try {
    // const token = await authRequired();
    // if (!token.success) return failure(token.error);
    // const user = await authFB.verifyCredentials(token.data, '');
    // if (user.success) return failure(new ErrorAPI({ message: '' })); //never
    // if (user.error.message === 'Credenciales inválidas') return success({ access: true })
    return success({ access: false })
  } catch (e) {
    const res = normalizeError(e, 'verificar autenticación')
    throw new ErrorAPI(res)
  }
}

/**
 * Verifica la acción del usuario (registro).
 * La solicitud puede ser de tipo verificación de correo electrónico o de cambio de contraseña.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos de la solicitud en body y el modo de verificación en params.
 * @returns {Promise<void>} - Envía un mensaje de confirmación.
 * @link https://github.com/Mitchel2003/rest-api/blob/main/README.md#004
 * @example
 * "verifyEmail" => uid, email, username y role.
 * "resetPassword" => oobCode y password.
 */
interface VerifyActionProps { body: any, mode: string }
export const verifyAction = async ({ body, mode }: VerifyActionProps): Promise<Result<string>> => {
  try {
    const result = mode === 'verifyEmail'
      ? await authFB.validateEmailVerification()
      : await authFB.validateResetPassword(body.oobCode, body.password)
    //send response
    if (!result.success) throw new ErrorAPI(result.error);
    return success('accion completada')
  } catch (e) {
    const res = normalizeError(e, 'verificar acción')
    return failure(res)
  }
}

/*--------------------------------------------------ResetPassword--------------------------------------------------*/
/**
 * Maneja el proceso de restablecimiento de contraseña.
 * Establece un token de restablecimiento de contraseña para el usuario
 * Envia un email con el token de restablecimiento de contraseña el cual expirará en 1 hora.
 * @returns {Promise<void>} - Envía un mensaje de éxito si el email se envía correctamente.
 */
export const forgotPassword = async (email: string): Promise<Result<string>> => {
  try {
    const result = await authFB.sendEmailResetPassword(email);
    if (!result.success) throw new ErrorAPI(result.error);
    return success('correo de restablecimiento enviado')
  } catch (e) {
    const res = normalizeError(e, 'envio de correo de restablecimiento de contraseña')
    return failure(res)
  }
}

/**
 * Nos permite actualizar la contraseña del usuario.
 * Valida un token y su respectiva expiración.
 * Envia un email de éxito si la contraseña se actualiza correctamente.
 * @returns {Promise<void>} - Envía un mensaje de éxito si la contraseña se actualiza correctamente, caso contrario un mensaje de error.
 */
interface ResetPasswordProps { params: any, body: any }
export const resetPassword = async ({ params, body }: ResetPasswordProps): Promise<Result<string>> => {
  try {
    const result = await authFB.validateResetPassword(params.oobCode, body.password);
    if (!result.success) throw new ErrorAPI(result.error);
    return success('Contraseña restablecida correctamente')
  } catch (e) {
    const res = normalizeError(e, 'validar restablecimiento de contraseña')
    return failure(res)
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
// const authRequired = async (): Promise<Result<string>> => {
//   try {
//     const token = Cookies.get('token');
//     if (!token) throw new ErrorAPI({ message: 'Token no encontrado' })
//     const access = await authFB.verifyCredentials(token, '');
//     if (!access.success) return failure(new ErrorAPI(access.error))
//     if (!access.data.id) return failure(new ErrorAPI({ message: 'id del token no encontrado' }))
//     return success(access.data.id)
//   } catch (e) {
//     const res = normalizeError(e, 'validar restablecimiento de contraseña')
//     return failure(res)
//   }
// }

/*---------------------------------------------------------------------------------------------------------*/