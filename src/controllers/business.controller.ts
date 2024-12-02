import { databaseService } from "@/services/firebase/database.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { Business } from "@/interfaces/context.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

/**
 * Obtiene todos los negocios.
 * @returns {Promise<Result<Business[]>>} Una lista de negocios.
 */
export const getBusinesses = async (): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getAllBusinesses()
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener lista de negocios'))) }
}

/**
 * Obtiene un negocio por su id, representa el uid del negocio en cuestión (auth).
 * @param {string} id - El identificador del negocio.
 * @returns {Promise<Result<Business>>} Un negocio.
 */
export const getBusinessById = async (id: string): Promise<Result<Business>> => {
  try {
    const result = await databaseService.getBusinessById(id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocio'))) }
}

/**
 * Busca negocios por nombre.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise<Result<Business[]>>} Una lista de negocios.
 */
export const getBusinessByQuery = async (query: string): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getBusinessByQuery(query)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
} 