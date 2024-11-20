import { AuthContext, Enterprise } from "@/interfaces/context.interface";
import { isApiResponse } from "@/interfaces/response.interface";
import { Props } from "@/interfaces/props.interface";
import { Result } from "@/interfaces/db.interface";

import { createContext, useContext, useState, useEffect } from "react";
import { authService as authFB } from "@/services/firebase/auth.service"
import { login, register } from "@/controllers/auth/auth.controller";
import { RegisterFormProps } from "@/schemas/auth/register.schema";
import { LoginFormProps } from "@/schemas/auth/login.schema";

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
  const [enterprise, setEnterprise] = useState<Enterprise>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => timeAlert(), [errors])
  useEffect(() => {
    return () => authFB.observeAuth((auth) => {
      setEnterprise(auth); setLoading(false)
    })
  }, [])

  /** Configura un temporizador para limpiar los errores después de 5 segundos */
  // const timeAlert = () => {
  //   if (errors.length === 0) return;
  //   const timer = setTimeout(() => setErrors([]), 5000);
  //   return () => clearTimeout(timer);
  // }

  /** Inicia sesión con tu emprendimiento usando las credenciales de acceso */
  const signin = async (credentials: LoginFormProps) => {
    try {
      const result = await login(credentials)
      if (!result.success) return setErrors([result.error.message])
      setAuthStatus(result)
    } catch (e) { if (isApiResponse(e)) setErrors([e.message]) }
  }

  /** Registra un nuevo emprendimiento */
  const signup = async (data: RegisterFormProps) => {
    try {
      const result = await register(data)
      if (!result.success) return setErrors([result.error.message])
      setAuthStatus(result)
    } catch (e) { if (isApiResponse(e)) setErrors([e.message]) }
  }

  /** Cierra la sesión del emprendimiento actual */
  const logout = async () => {
    try {
      const result = await authFB.logout()
      if (!result.success) return setErrors([result.error.message])
      setAuthStatus()
    } catch (e) { if (isApiResponse(e)) setErrors([e.message]) }
  }

  /** Actualiza el estado de autenticación basado en la respuesta del servidor */
  const setAuthStatus = (res?: Result<any>) => {
    setEnterprise(res?.success ? res.data : {})
    setIsAuth(Boolean(res?.success))
    setLoading(false)
  }

  return (
    <Auth.Provider value={{ isAuth, loading, enterprise, errors, signin, signup, logout }}>
      {children}
    </Auth.Provider>
  )
}