import { AnimatedBackground } from '@/components/others/background/AnimatedBackground'
import { useThemeContext } from '@/context/ThemeContext'
import { Outlet } from 'react-router-dom'
import Footer from '#/others/Footer'
import Navbar from '#/others/Navbar'

const RootLayout = () => {
  const { theme } = useThemeContext()
  return (
    <AnimatedBackground theme={theme}>
      <Navbar />
      <main className="flex flex-grow items-center justify-center p-4">
        <Outlet />
      </main>
      <Footer theme={theme} />
    </AnimatedBackground>
  )
}

export default RootLayout