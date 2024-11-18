import { Result, success, failure } from "@/interfaces/db.interface";
import ErrorAPI, { NotFound, Unauthorized } from "@/errors";
import { normalizeError } from "@/errors/handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@/utils/config";

interface CredentialsJWT extends JwtPayload { id?: string, error?: string }

const TOKEN_SECRET = config.jwtSecret;
/**
 * Esto crea un token de acceso para servicios de autenticación y rutas protegidas
 * @param token - Corresponde a credencial (id) para encriptar en el token; representa el uid del usuario autenticado "firebase".
 * @returns {string} Obtenemos un string que corresponde al token hash.
 */
export async function generateAccessToken(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (error: Error | null, token: string | undefined) => {
      if (error) return reject(error);
      resolve(token as string);
    });
  })
}
/**
 * Esto verifica las credenciales del usuario { id: Schema.Types.ObjectId } en un token específico
 * @param token - es el token a verificar
 * @returns {CredentialsJWT} obtenemos un objeto con propiedades como "id" o "exp" que corresponden al token del usuario conectado
 */
export async function verifyAccessToken(token: string): Promise<Result<CredentialsJWT>> {
  if (!token) return failure(new NotFound({ message: 'Token no encontrado, autenticación denegada' }));

  try {
    const access = jwt.verify(token, TOKEN_SECRET) as CredentialsJWT;
    if (!access.id) return failure(new Unauthorized({ message: 'Token invalido' }));
    return success(access)
  } catch (e) {
    const res = normalizeError(e, 'verificación token de acceso')
    return failure(new ErrorAPI(res))
  }
}