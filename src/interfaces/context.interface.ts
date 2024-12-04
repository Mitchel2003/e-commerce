import { RegisterFormProps, LoginFormProps } from "@/schemas/auth.schema";
import { ProductFormProps } from "@/schemas/product.schema";
/*--------------------------------------------------ThemeContext--------------------------------------------------*/
export type Theme = 'light' | 'dark'

export type ThemeContext = {
  toggleTheme: () => void
  theme: Theme
} | undefined

export type ThemeContextProps = { theme: Theme }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------AuthContext--------------------------------------------------*/
export type User = { uid: string }

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
  getByQuery: (query: string) => Promise<Business[]>
  filterByCategory: (category: string) => Promise<Business[]>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------ProductContext--------------------------------------------------*/
//Remember that the this id attribute represent the uid of the business associated (auth)
export type Product = {
  id: string
  name: string
  price: string
  imageUrl: string
  description: string
}

export type ProductContext = {
  loading: boolean
  getAll: (idBusiness: string) => Promise<Product[]>
  getById: (id: string) => Promise<Product | undefined>
  filterByName: (idBusiness: string, name: string) => Promise<Product[]>
  create: (idBusiness: string, product: ProductFormProps) => Promise<void>
  update: (idBusiness: string, idProduct: string, product: Partial<ProductFormProps>) => Promise<void>
  delete: (idBusiness: string, idProduct: string, productName: Product['name']) => Promise<void>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/