import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

/**
 * Hook para volver a la parte superior de la página cuando se cambia de ruta
 * Usualmente sucede que el scroll se queda en la parte inferior de la página
 */
const ScrollToTop = (): null => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default ScrollToTop