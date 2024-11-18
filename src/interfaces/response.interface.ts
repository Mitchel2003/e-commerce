export interface ApiResponse { message: string, code: string }

export function isApiResponse(e: unknown): e is ApiResponse {
  return (typeof e === "object" && e !== null && "message" in e)
}