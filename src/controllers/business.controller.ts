import { databaseService } from "@/services/firebase/database.service"
import { Result, success, failure } from "@/interfaces/db.interface"
import { Business } from "@/interfaces/context.interface"
import { normalizeError } from "@/errors/handler"
import ErrorAPI from "@/errors"

export const getBusinesses = async (): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getAllBusinesses()
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener lista de negocios'))) }
}

export const getBusinessById = async (id: string): Promise<Result<Business>> => {
  try {
    const result = await databaseService.getBusinessById(id)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'obtener negocio'))) }
}

export const getBusinessByQuery = async (query: string): Promise<Result<Business[]>> => {
  try {
    const result = await databaseService.getBusinessByQuery(query)
    if (!result.success) throw result.error
    return success(result.data)
  } catch (e) { return failure(new ErrorAPI(normalizeError(e, 'buscar negocios'))) }
} 