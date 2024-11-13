export interface AxiosResponse { response: { message: string, code: string } }
export interface ApiResponse { message: string, code: string }

export function isAxiosResponse(e: unknown): e is AxiosResponse {
  return (typeof e === "object" && e !== null && "response" in e)
}

export function isApiResponse(e: unknown): e is ApiResponse {
  return (typeof e === "object" && e !== null && "message" in e)
}