import { ThemeContext, Theme as TypeTheme } from '@/interfaces/context.interface';
import { createContext, useContext, useState, useEffect } from 'react';
import { Props } from '@/interfaces/props.interface';

const Theme = createContext<ThemeContext>(undefined)

/**
 * Hook personalizado para acceder al contexto del tema.
 * @throws {Error} Si se intenta usar fuera del ThemeProvider.
 */
export const useThemeContext = () => {
  const context = useContext(Theme)
  if (!context) throw new Error('Error al intentar usar themeContext')
  return context
}

/**
 * Proveedor del contexto del tema.
 * Maneja el estado del tema y proporciona funciones para cambiarlo.
 * @param {Props} props - Las propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que envuelve a los hijos con el contexto del tema.
 */
export const ThemeProvider = ({ children }: Props): JSX.Element => {
  const themeSaved = useThemeLocalStorage();
  const [theme, setTheme] = useState<TypeTheme>(themeSaved);

  useEffect(() => { setThemeLocalStorage(theme) }, [theme]);

  /** Alterna el tema entre 'light' y 'dark', esta función actualiza el estado del tema invirtiendo su valor actual */
  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  )
}

/**
 * Hook personalizado para obtener el tema guardado en el almacenamiento local.
 * @returns {TypeTheme} El tema guardado o 'light' por defecto.
 */
function useThemeLocalStorage(): TypeTheme {
  const savedTheme = localStorage.getItem('theme');
  return (savedTheme || 'light') as TypeTheme;
}

/**
 * Función para guardar el tema en el almacenamiento local y aplicarlo al documento.
 * @param {TypeTheme} theme - El tema a guardar y aplicar.
 * @example
 * document.documentElement.classList.toggle('dark', theme === 'dark')
 * //1er argumento de toggle() es el nombre de la clase ('dark' en este caso).
 * //2ndo argumento es un booleano que determina si la clase debe ser añadida (true) o removida (false).
 * <html lang="en" class="dark"></html> || <html lang="en"></html>
 */
function setThemeLocalStorage(theme: TypeTheme) {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
}