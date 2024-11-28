import { RegisterFormProps, LoginFormProps } from "@/schemas/auth.schema";
/*--------------------------------------------------ThemeContext--------------------------------------------------*/
export type Theme = 'light' | 'dark'

export type ThemeContext = {
  theme: Theme;
  toggleTheme: () => void;
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

/*--------------------------------------------------ProductContext--------------------------------------------------*/
export interface Product { _id: string }

export type ProductContext = {
  errors: string[];
  getProduct: (id: string) => Promise<Product>;
  getProducts: () => Promise<Product[]>;
  createProduct: (product: object) => Promise<Product>;
  updateProduct: (id: string, product: object) => Promise<Product>;
  deleteProduct: (id: string) => Promise<Product>;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------BusinessContext--------------------------------------------------*/
//id representa el email del negocio (folder name)
export interface Business {
  id: string
  name: string
  phone: string
  address: string
  category: string
  isLocal: boolean
  description: string
  photoUrl: {
    place: string[]
  }
  socialNetworks?: {
    type: 'Facebook' | 'Instagram' | 'Otro'
    url: string
  }[]
}

export type BusinessContext = {
  loading: boolean
  getAll: () => Promise<Business[]>
  getById: (id: string) => Promise<Business | undefined>
  getByQuery: (query: string) => Promise<Business[]>
  filterByCategory: (category: string) => Promise<Business[]>
} | undefined
/*---------------------------------------------------------------------------------------------------------*/