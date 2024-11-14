import HomeSection from '@/sections/home/HomeSection'
import { useThemeContext } from '@/context/ThemeContext'

const Home = () => {
  const { theme } = useThemeContext()
  return <HomeSection theme={theme} />
}

export default Home