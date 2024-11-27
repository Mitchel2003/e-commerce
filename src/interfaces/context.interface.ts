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
// export type User = { _id: string, role: string, email: string, username: string, permissions: object } | {}
export type Business = {
  name: string
  phone: string
  email: string
  address: string
  description: string
  photoUrl: string | undefined
} | {}

export type AuthContext = {
  business: Business;
  isAuth: boolean;
  loading: boolean;
  signout: () => Promise<void>;
  signin: (credentials: LoginFormProps) => Promise<void>;
  signup: (credentials: RegisterFormProps) => Promise<void>;
  verify: (action: string, data: object) => Promise<void>;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------ProductContext--------------------------------------------------*/
export type Product = { _id: string } | undefined

export type ProductContext = {
  errors: string[];
  getProduct: (id: string) => Promise<Product>;
  getProducts: () => Promise<Product[]>;
  createProduct: (product: object) => Promise<Product>;
  updateProduct: (id: string, product: object) => Promise<Product>;
  deleteProduct: (id: string) => Promise<Product>;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/