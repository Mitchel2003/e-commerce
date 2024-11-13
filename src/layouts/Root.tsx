import { AnimatedBackground } from '#/others/background/AnimatedBackground'
import { useThemeContext } from '@/context/ThemeContext'
import { Outlet } from 'react-router-dom'
import Navbar from '#/others/Navbar'
import Footer from '#/others/Footer'
import { cn } from '@/lib/utils'

const RootLayout = () => {
  const { theme } = useThemeContext()
  return (
    <AnimatedBackground theme={theme}>
      <Navbar />
      <main
        className={cn(
          'flex flex-grow z-10',
          'items-center justify-center'
        )}
      >
        <Outlet />
      </main>
      <Footer theme={theme} />
    </AnimatedBackground>
  )
}

export default RootLayout