import { Business, Product } from "@/interfaces/context.interface";
import { User, UserProfile } from "firebase/auth";

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

/*--------------------------------------------------service interface--------------------------------------------------*/
export interface AuthService {
  /*-----------------> authentication <-----------------*/
  observeAuth(callback: (user: any) => void): void
  login(email: string, password: string): Promise<Result<User>>
  logout(): Promise<Result<void>>
  /*-----------------> create and update <-----------------*/
  registerAccount(username: string, email: string, password: string): Promise<Result<User>>
  updateProfile(user: User, profile: Partial<UserProfile>): Promise<Result<void>>
  /*-----------------> verification <-----------------*/
  sendEmailVerification(): Promise<Result<void>>
  sendEmailResetPassword(email: string): Promise<Result<void>>
}

export interface DatabaseService {
  /*-----------------> business <-----------------*/
  getAllBusinesses(): Promise<Result<Business[]>>
  getBusinessById(id: string): Promise<Result<Business>>
  getBusinessByQuery(searchTerm: string): Promise<Result<Business[]>>
  createBusiness(auth: User, credencials: object): Promise<Result<void>>
  updateBusiness(business: Partial<Business>): Promise<Result<void>>
  deleteBusiness(id: string): Promise<Result<void>>
  /*-----------------> product <-----------------*/
  getAllProducts(idBusiness: string): Promise<Result<Product[]>>
  getProductById(idProduct: string): Promise<Result<Product>>
  createProduct(product: Product): Promise<Result<void>>
  updateProduct(id: string, product: Partial<Product>): Promise<Result<void>>
  deleteProduct(id: string): Promise<Result<void>>
}

export interface StorageService {
  getFile(path: string): Promise<Result<string>>
  getFiles(path: string): Promise<Result<string[]>>
  uploadFile(path: string, file: File): Promise<Result<string>>
  uploadFiles(path: string, files: File[]): Promise<Result<string[]>>
  updateFile(path: string, file: File): Promise<Result<string>>
  deleteFile(path: string): Promise<Result<void>>
}
/*---------------------------------------------------------------------------------------------------------*/