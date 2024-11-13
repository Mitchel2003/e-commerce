import { useThemeContext } from '@/context/ThemeContext'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

import gsIcon from '/assets/gs_icon.ico'
import ThemeToggle from '#/others/Theme'
import Sidebar from '#/sidebar/Sidebar'

const Navbar = () => {
  const { theme } = useThemeContext()

  return (
    <nav
      className={cn(
        'flex justify-between items-center py-2 px-6 z-10',
        'shadow-md backdrop-blur-md transition-colors duration-500',
        theme === 'dark' ? 'bg-zinc-800/90 text-zinc-100' : 'bg-white/90 text-gray-900'
      )}
    >
      <HeaderNavbar />

      <div className="flex items-center gap-x-2 md:gap-x-4">
        <ThemeToggle />
        <Sidebar theme={theme} />
      </div>
    </nav>
  )
}

export default Navbar
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const HeaderNavbar = () => {
  return (
    <Link to="/" className="flex items-center gap-x-4">
      <span className="flex items-center justify-center w-14 h-14 mr-2">
        <img src={gsIcon} alt="GS Icon" />
      </span>
      <h1 className="text-2xl">Gestion salud</h1>
    </Link>
  )
}
/*---------------------------------------------------------------------------------------------------------*/