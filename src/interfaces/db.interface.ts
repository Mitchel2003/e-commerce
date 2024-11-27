type IError = { message: string, code?: string, details?: unknown, statusCode?: number }
export interface Success<T> { success: true, data: T }
export interface Failure { success: false; error: IError }

export type Result<T> = Success<T> | Failure //Result either
export const success = <T>(data: T): Success<T> => ({ success: true, data })
export const failure = (error: IError): Failure => ({ success: false, error })

export interface FirebaseResponse { message: string, code: string }
export function isFirebaseResponse(e: unknown): e is FirebaseResponse {
  return (typeof e === "object" && e !== null && "message" in e)
}