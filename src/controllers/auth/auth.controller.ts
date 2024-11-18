/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { authService as authFB } from "@/services/firebase/auth.service"
import { generateAccessToken } from "@/services/jwt/jwt.service"
import ErrorAPI, { Unauthorized } from "@/errors"
import { failure, Result, success } from "@/interfaces/db.interface";
import { normalizeError } from "@/errors/handler";
import Cookies from "js-cookie";

/**
 * Maneja el proceso de inicio de sesión del usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener email y password en el body.
 * @argument photoURL - Hace parte del profile del usuario autenticado (lo usamos para la verificacion de email)
 * @returns {Promise<void>} - Envía el usuario autenticado o un mensaje de error.
 */
interface LoginProps { email: string, password: string }
export const login = async (req: LoginProps): Promise<Result<string>> => {
  try {
    const { email, password } = req;
    const result = await authFB.verifyCredentials(email, password);
    if (!result.success) throw new ErrorAPI(result.error);
    if (!result.data.user.photoURL) throw new Unauthorized({ message: 'Email no verificado' });

    const user = result.data.user.email;
    const token = await generateAccessToken({ id: user });
    setCookies(token);
    return success('Inicio exitoso');
  } catch (e: unknown) {
    const res = normalizeError(e, 'registro de usuario')
    throw new ErrorAPI(res)
  }
}

/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
interface RegisterProps { email: string, password: string, username: string, role: string }
export const register = async (req: RegisterProps): Promise<Result<string>> => {
  try {
    const { email, password, username, role } = req;
    const result = await authFB.registerAccount(username, email, password);
    if (!result.success) throw new ErrorAPI(result.error);

    const credentials = { email, username, role };
    const sendEmail = await authFB.sendEmailVerification(credentials);
    if (!sendEmail.success) throw new ErrorAPI(sendEmail.error);

    return success('Usuario registrado exitosamente, se ha enviado un correo de verificación');
  } catch (e: unknown) {
    const res = normalizeError(e, 'registro de usuario')
    throw new ErrorAPI(res)
  }
}

/**
 * Maneja el proceso de cierre de sesión del usuario.
 * @returns {Response<any>} - Envía una respuesta de éxito.
 */
export const logout = (): Result<string> => {
  try {
    Cookies.remove('token');
    return success('Cierre de sesión exitoso');
  } catch (e) {
    const res = normalizeError(e, 'cerra sesión');
    return failure(res)
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/**
 * Establece las cookies de autenticación en la respuesta HTTP.
 * @param {string} token - Token de autenticación a establecer en las cookies.
 */
export const setCookies = (token: string) => {
  Cookies.set('token', token, { expires: 1, secure: true })
}
/*---------------------------------------------------------------------------------------------------------*/