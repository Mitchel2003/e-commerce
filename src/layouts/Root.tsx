import { AnimatedBackground } from '#/layout/AnimatedBackground'
import { LoadingScreen } from "#/ui/loading-screen"
import { Toaster } from '#/ui/toaster'
import Navbar from '#/layout/Navbar'
import Footer from '#/layout/Footer'

import { useThemeContext } from '@/context/ThemeContext'
import ScrollToTop from '@/hooks/ui/useScrollTop'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

const RootLayout = () => {
  const { theme } = useThemeContext()
  return (
    <>
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

      {/* Componentes UI globales */}
      <Toaster />
      <ScrollToTop />
      <LoadingScreen />
    </>
  )
}

export default RootLayout