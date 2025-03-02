import { LoginFormProps, RegisterFormProps, RegisterUpdateFormProps as BusinessUpdateFormProps } from "@/schemas/auth.schema";
import { ProductFormProps, ProductUpdateFormProps } from "@/schemas/product.schema";
import { Metadata, QueryProps } from "@/interfaces/db.interface";
/*--------------------------------------------------ThemeContext--------------------------------------------------*/
export type Theme = 'light' | 'dark'

export type ThemeContext = {
  toggleTheme: () => void
  theme: Theme
} | undefined

export type ThemeContextProps = { theme: Theme }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------AuthContext--------------------------------------------------*/
export type User = {
  uid: string
  email: string
  photoURL: string
  displayName: string
  emailVerified: boolean
}

export type AuthContext = {
  isAuth: boolean;
  loading: boolean;
  user: User | undefined;
  signout: () => Promise<void>;
  signin: (credentials: LoginFormProps) => Promise<void>;
  signup: (credentials: RegisterFormProps) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------BusinessContext--------------------------------------------------*/
//This id attribute not belong to the business document
export interface Business {
  id: string
  name: string
  phone: string
  address: string
  category: string
  isLocal: boolean
  description: string
  photoUrl: string[]
  socialNetworks?: { type: 'Facebook' | 'Instagram' | 'Otro'; url: string }[]
}

export type BusinessContext = {
  loading: boolean
  getAll: () => Promise<Business[]>
  getById: (id: string) => Promise<Business | undefined>
  getByQuery: (options: QueryProps) => Promise<Business[]>
  update: (idBusiness: string, business: Partial<BusinessUpdateFormProps>) => Promise<void>
  delete: (idBusiness: string) => Promise<void>
  //files
  getAllImages: (idBusiness: string) => Promise<Metadata[]>
  deleteImage: (idBusiness: string, nameImage: string) => Promise<void>
  createImage: (idBusiness: string, files: RegisterFormProps['references']['photoUrl']) => Promise<void>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------ProductContext--------------------------------------------------*/
//Remember that the this id attribute represent the uid of the business associated (auth)
export type Product = {
  idBusiness: string
  uid?: string
  name: string
  price: string
  likes?: number
  imageUrl: string
  description: string
}

export type ProductContext = {
  loading: boolean
  getAll: (idBusiness: string) => Promise<Product[]>
  getById: (idProduct: string) => Promise<Product | undefined>
  filterByName: (idBusiness: string, name: string) => Promise<Product[]>
  create: (idBusiness: string, product: ProductFormProps) => Promise<void>
  update: (idProduct: string, product: Partial<ProductUpdateFormProps>) => Promise<void>
  updateLikes: (idProduct: string) => Promise<boolean>
  delete: (idBusiness: string, idProduct: string) => Promise<void>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/