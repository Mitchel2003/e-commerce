import { loginRequest, registerRequest, verifyAuthRequest } from "@/api/auth";
import { isApiResponse, isAxiosResponse } from "@/interfaces/response.interface";
import { User, AuthContext } from "@/interfaces/context.interface";
import { Props } from "@/interfaces/props.interface";

import { createContext, useContext, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
  const [user, setUser] = useState<User>(undefined);

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
    if (!Cookies.get().token) return setAuthStatus()
    try {
      const res = await verifyAuthRequest();
      setAuthStatus(res);
    } catch (e: unknown) {
      if (isAxiosResponse(e)) setErrors([e.response?.message])
      if (isApiResponse(e)) setErrors([e.message])
      setAuthStatus()
    }
  }

  /** Inicia sesión con las credenciales del usuario */
  const signin = async (user: object) => {
    try { const res = await loginRequest(user); setAuthStatus(res) }
    catch (e: unknown) { if (isAxiosResponse(e)) setErrors([e.response.message]) }
  }

  /** Registra un nuevo usuario */
  const signup = async (user: object) => {
    try { const res = await registerRequest(user); setAuthStatus(res) }
    catch (e: unknown) { if (isAxiosResponse(e)) setErrors([e.response.message]) }
  }

  /** Cierra la sesión del usuario actual */
  const logout = () => { Cookies.remove('token'); setAuthStatus() }

  /**
   * Actualiza el estado de autenticación basado en la respuesta del servidor.
   * @param {AxiosResponse} [res] - La respuesta del servidor.
   */
  const setAuthStatus = (res?: AxiosResponse) => {
    setIsAuth(Boolean(res?.data))
    setUser(res?.data ?? {})
    setLoading(false)
  }

  return (
    <Auth.Provider value={{ isAuth, loading, user, errors, signin, signup, logout }}>
      {children}
    </Auth.Provider>
  )
}