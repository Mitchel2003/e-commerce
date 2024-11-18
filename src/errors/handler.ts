import HandlerErrorsFB from "@/errors/firebase.error"
import { FirebaseError } from "firebase/app"
import ErrorAPI from "@/errors"

/**
 * Justifica el error en formato de ErrorAPI.
 * Normaliza nuestro "e" unknown a nuestro ErrorAPI.
 * @param {unknown} e - El error a normalizar, puede ser de tipo FirebaseError o MongooseError.
 * @param {string} context - Representa el contexto en el que ocurrió el error, suele referirse a la operación.
 * @returns {ErrorAPI} - El error normalizado al formato de ErrorAPI, si pertenece a ninguna instancia, se crea uno nuevo.
 * @example if (!result.success) throw new ErrorAPI({ message: 'Error de prueba', statusCode: 500 })
 */
export const normalizeError = (e: unknown, context: string): ErrorAPI => {
  if (e instanceof FirebaseError) return HandlerErrorsFB(e)
  if (e instanceof ErrorAPI) return e
  return new ErrorAPI({ message: `Error al ${context}: ${e instanceof Error ? e.message : String(e)}` })
}