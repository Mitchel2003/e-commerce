import { User, AuthContext } from "@/interfaces/context.interface";
import { isApiResponse } from "@/interfaces/response.interface";
import { Props } from "@/interfaces/props.interface";
import { Result } from "@/interfaces/db.interface";

import { login, register } from "@/controllers/auth/auth.controller";
import { RegisterFormProps } from "@/schemas/auth/register.schema";
import { verifyAuth } from "@/controllers/auth/verify.controller";
import { LoginFormProps } from "@/schemas/auth/login.schema";

import { createContext, useContext, useState, useEffect } from "react";

const Auth = createContext<AuthContext>(undefined)

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @throws {Error} Si se intenta usar fuera del AuthProvider.
 */
export const useAuthContext = () => {
  const context = useContext(Auth)
  if (!context) throw new Error('Error al intentar usar authContext')
  return context
}

/**
 * Proveedor del contexto de autenticación.
 * Maneja el estado de autenticación y proporciona funciones para iniciar sesión, registrarse y cerrar sesión.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto de autenticación.
 */
export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User>({});

  useEffect(() => timeAlert(), [errors])
  useEffect(() => { verifyToken() }, [])

  /** Configura un temporizador para limpiar los errores después de 5 segundos */
  const timeAlert = () => {
    if (errors.length === 0) return;
    const timer = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(timer);
  }

  /** Verifica el token de autenticación almacenado en las cookies */
  const verifyToken = async () => {
    try {
      const res = await verifyAuth();
      if (!res.success) setErrors([res.error.message])
      setIsAuth(Boolean(res?.success))
      setLoading(false)
    } catch (e: unknown) {
      if (isApiResponse(e)) setErrors([e.message])
      setAuthStatus()
    }
  }

  /** Inicia sesión con las credenciales del usuario */
  const signin = async (user: LoginFormProps) => {
    try { const res = await login(user); setAuthStatus(res) }
    catch (e: unknown) { if (isApiResponse(e)) setErrors([e.message]) }
  }

  /** Registra un nuevo usuario */
  const signup = async (user: RegisterFormProps) => {
    try { const res = await register(user); setAuthStatus(res) }
    catch (e: unknown) { if (isApiResponse(e)) setErrors([e.message]) }
  }

  /** Cierra la sesión del usuario actual */
  const logout = () => { setAuthStatus() }

  /**
   * Actualiza el estado de autenticación basado en la respuesta del servidor.
   * @param {AxiosResponse} [res] - La respuesta del servidor.
   */
  const setAuthStatus = (res?: Result<any>) => {
    setUser(res?.success ? res.data : {})
    setIsAuth(Boolean(res?.success))
    setLoading(false)
  }

  return (
    <Auth.Provider value={{ isAuth, loading, user, errors, signin, signup, logout }}>
      {children}
    </Auth.Provider>
  )
}