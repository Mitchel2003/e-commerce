import { useThemeContext } from '@/context/ThemeContext'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

import EIcon from '/assets/ecommerce.ico'
import ThemeToggle from '#/others/Theme'
import Sidebar from '#/sidebar/Sidebar'

const Navbar = () => {
  const { theme } = useThemeContext()

  return (
    <nav
      className={cn(
        'flex justify-between items-center px-6 z-10',
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
      <span className="flex items-center justify-center w-full h-20">
        <img src={EIcon} alt="Ecommerce Icon" />
      </span>
    </Link>
  )
}
/*---------------------------------------------------------------------------------------------------------*/