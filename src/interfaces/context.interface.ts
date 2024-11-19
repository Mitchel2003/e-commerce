import { RegisterFormProps } from "@/schemas/auth/register.schema";
import { LoginFormProps } from "@/schemas/auth/login.schema";
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
export type Enterprise = {
  name: string
  phone: string
  email: string
  address: string
  description: string
  photoUrl: string | undefined
} | {}

export type AuthContext = {
  enterprise: Enterprise;
  isAuth: boolean;
  loading: boolean;
  errors: string[];
  signin: (enter: LoginFormProps) => Promise<void>;
  signup: (enter: RegisterFormProps) => Promise<void>;
  logout: () => void;
} | undefined
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------CurriculumContext--------------------------------------------------*/
export type Curriculum = { _id: string } | undefined

export type CurriculumContext = {
  errors: string[];
  getCV: (id: string) => Promise<Curriculum>;
  getCVs: () => Promise<Curriculum[]>;
  createCV: (Curriculum: object) => Promise<Curriculum>;
  updateCV: (id: string, Curriculum: object) => Promise<Curriculum>;
  deleteCV: (id: string) => Promise<Curriculum>;
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