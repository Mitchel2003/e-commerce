import { AnimatedBackground } from '#/others/AnimatedBackground'
import { useThemeContext } from '@/context/ThemeContext'
import { Outlet } from 'react-router-dom'
import Navbar from '#/others/Navbar'

const RootLayout = () => {
  const { theme } = useThemeContext()
  return (
    <AnimatedBackground theme={theme}>
      <Navbar />
      <main className="flex flex-grow items-center justify-center p-4">
        <Outlet />
      </main>
    </AnimatedBackground>
  )
}

export default RootLayout