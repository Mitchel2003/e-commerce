import { AuthContext, Business } from "@/interfaces/context.interface";
import { isFirebaseResponse, Result } from "@/interfaces/db.interface";
import { useNotification } from "@/hooks/ui/useNotification";
import { useLoadingScreen } from "@/hooks/ui/useLoading";
import { Props } from "@/interfaces/props.interface";

import { authService as authFB } from "@/services/firebase/auth.service";
import { login, register, logout } from "@/controllers/auth.controller";
import { verifyAction } from "@/controllers/verify.controller";

import { RegisterFormProps, LoginFormProps } from "@/schemas/auth.schema";
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
  const { show: showLoading, hide: hideLoading } = useLoadingScreen()
  const { notifySuccess, notifyError } = useNotification()
  const [business, setBusiness] = useState<Business>({});
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    return () => authFB.observeAuth((auth) => {
      setBusiness(auth); setLoading(false)
    })
  }, [])

  /** Inicia sesión con tu emprendimiento usando las credenciales de acceso */
  const signin = async (credentials: LoginFormProps) => {
    setLoadingStatus("Iniciando sesión...")
    try {
      const result = await login(credentials)
      if (!result.success) throw result.error
      notifySuccess({ title: "Inicio de sesión exitoso", message: "Bienvenido de nuevo" })
      setAuthStatus(result)
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: "Error en la solicitud", message: e.message })
    } finally { setLoadingStatus() }
  }

  /** Registra un nuevo negocio */
  const signup = async (data: RegisterFormProps) => {
    setLoadingStatus("Registrando...")
    try {
      const result = await register(data)
      if (!result.success) throw result.error
      notifySuccess({ title: "Registro exitoso", message: "Por favor verifica tu correo para continuar" })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: "Error en la solicitud", message: e.message })
    } finally { setLoadingStatus() }
  }

  /** Cierra la sesión del negocio actual */
  const signout = async () => {
    setLoadingStatus("Cerrando sesión...")
    try {
      const result = await logout()
      if (!result.success) throw result.error
      result.success && setAuthStatus()
      notifySuccess({ title: "Sesión cerrada", message: "Has cerrado sesión correctamente" })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: "Error en la solicitud", message: e.message })
    } finally { setLoadingStatus() }
  }

  /*--------------------------------------------------verification--------------------------------------------------*/
  /**
   * Verifica una accion publica (resetPassword or verifyEmail)
   * la petición se ejecuta a travez de un param "mode" explicito en la url 
   * @param {string} mode - Corresponde a la modalidad de la solicitud
   * @param {object} data - Los datos complementarios para la ejecucion
   */
  const verify = async (mode: string, data: object) => {
    setLoadingStatus("Validando solicitud...")
    try {
      const result = await verifyAction({ mode, body: data })
      if (!result.success) throw result.error
      setAuthStatus()
      await logout()
      notifySuccess({
        message: "La solicitud se ha completado",
        title: `Exito al ${mode !== 'verifyEmail' ? 'restablecer contraseña' : 'verificar email'}`
      })
    } catch (e: unknown) {
      isFirebaseResponse(e) && notifyError({ title: "Error en la solicitud", message: e.message })
    } finally { setLoadingStatus() }
  }
  /*---------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------tools--------------------------------------------------*/
  /**
   * Actualiza el estado de autenticación basado en la respuesta del servidor.
   * @param {Result<any> | undefined} res - La respuesta del servidor.
   */
  const setAuthStatus = (res?: Result<any>) => {
    setBusiness(res?.success ? res.data : {})
    setIsAuth(Boolean(res?.success))
  }
  /**
   * Actualiza el estado de carga basado en un parametro opcional
   * si valor del param es distinto a undefined, se muestra el loading
   * @param {string | undefined} status - El estado de carga.
   */
  const setLoadingStatus = (status?: string) => {
    status ? showLoading(status) : hideLoading()
    setLoading(Boolean(status))
  }
  /*---------------------------------------------------------------------------------------------------------*/

  return (
    <Auth.Provider value={{ business, isAuth, loading, signin, signup, signout, verify }}>
      {children}
    </Auth.Provider>
  )
}