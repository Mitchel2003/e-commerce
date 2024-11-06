import Navbar from '#/others/Navbar'

import { useThemeContext } from '@/context/ThemeContext'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  const { theme } = useThemeContext();

  return (
    <>
      {/* background animation */}
      <div className={`min-h-screen flex flex-col bg-gradient-to-br
        ${theme === 'dark'
          ? 'from-zinc-800/60 via-purple-800/40 to-purple-950/70'
          : 'from-white via-purple-100 to-white'
        }`}
      >
        <Navbar />
        <main className="flex flex-grow items-center justify-center p-4">
          <Outlet />
        </main>
      </div>
    </>
  )
}


export default RootLayout