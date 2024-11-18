/** Este módulo proporciona funciones para la autenticación y gestión de usuarios */
import { databaseService as databaseFB } from "@/services/firebase/database.service"
import { storageService as storageFB } from "@/services/firebase/storage.service"
import { authService as authFB } from "@/services/firebase/auth.service"
import { Result, success } from "@/interfaces/db.interface"
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
export const login = async (req: LoginFormProps): Promise<Result<User>> => {
  try {
    const { email, password } = req;
    const result = await authFB.verifyCredentials(email, password);
    if (!result.success) throw new ErrorAPI(result.error);
    if (!result.data.photoURL) throw new Unauthorized({ message: 'Email no verificado' });

    // const user = result.data.email;
    // const token = await generateAccessToken({ id: user });
    // setCookies(token);
    return success(result.data);
  } catch (e: unknown) {
    const res = normalizeError(e, 'inicio de sesión')
    throw new ErrorAPI(res)
  }
}
/**
 * Maneja el proceso de registro de un nuevo usuario.
 * @param {Request} req - Objeto de solicitud Express. Debe contener los datos del nuevo usuario en el body.
 * @returns {Promise<void>} - Envía el usuario creado o un mensaje de error.
 */
export const register = async (req: RegisterFormProps): Promise<Result<string>> => {
  try {
    const { email, password, name, phone, description, socialNetworks, photo } = req;
    const result = await authFB.registerAccount(name, email, password);
    if (!result.success) throw new ErrorAPI(result.error);

    const sendEmail = await authFB.sendEmailVerification();
    if (!sendEmail.success) throw new ErrorAPI(sendEmail.error);

    //first we need to upload the photo to firebase storage
    const photoUrl = await storageFB.uploadFile(`${email}/preview`, photo as File);
    if (!photoUrl.success) throw new ErrorAPI(photoUrl.error);

    //then we need to register the user credentials in firebase database
    const credentials = { phone, description, socialNetworks };
    const register = await databaseFB.registerUserCredentials(result.data, credentials);
    if (!register.success) throw new ErrorAPI(register.error);

    return success('Usuario registrado exitosamente, se ha enviado un correo de verificación');
  } catch (e: unknown) {
    const res = normalizeError(e, 'registro de usuario')
    throw new ErrorAPI(res)
  }
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
// /**
//  * Establece las cookies de autenticación en la respuesta HTTP.
//  * @param {string} token - Token de autenticación a establecer en las cookies.
//  */
// export const setCookies = (token: string) => {
//   Cookies.set('token', token, { expires: 1, secure: true })
// }
/*---------------------------------------------------------------------------------------------------------*/