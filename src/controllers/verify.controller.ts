import { authService as authFB } from "@/services/firebase/auth.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { normalizeError } from "@/errors/handler"

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