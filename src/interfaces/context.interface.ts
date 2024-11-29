import { RegisterFormProps, LoginFormProps } from "@/schemas/auth.schema";
/*--------------------------------------------------ThemeContext--------------------------------------------------*/
export type Theme = 'light' | 'dark'

export type ThemeContext = {
  toggleTheme: () => void
  theme: Theme
} | undefined

export type ThemeContextProps = { theme: Theme }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------AuthContext--------------------------------------------------*/
export type AuthContext = {
  isAuth: boolean;
  loading: boolean;
  business: Business | undefined;
  signout: () => Promise<void>;
  signin: (credentials: LoginFormProps) => Promise<void>;
  signup: (credentials: RegisterFormProps) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------BusinessContext--------------------------------------------------*/
//id represent the uid of the business (auth)
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
export type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
  description: string
}

export type ProductContext = {
  loading: boolean
  getAll: (id: string) => Promise<Product[]>
  getById: (id: string) => Promise<Product | undefined>
  filterByName: (id: string, name: string) => Promise<Product[]>
  create: (id: string, product: Product) => Promise<void>
  update: (id: string, product: Partial<Product>) => Promise<void>
  delete: (id: string) => Promise<void>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/