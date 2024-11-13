import HomeSection from '@/sections/home/HomeSection'
import { useThemeContext } from '@/context/ThemeContext'

const Home = () => {
  const { theme } = useThemeContext()
  return (
    <div className="container mx-auto">
      <HomeSection theme={theme} />
    </div>
  )
}

export default Home