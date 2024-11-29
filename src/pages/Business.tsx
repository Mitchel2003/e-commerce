import { BusinessSection } from '@/sections/business/BusinessSection'
import { useThemeContext } from '@/context/ThemeContext'

const Business = () => {
  const { theme } = useThemeContext()
  return <BusinessSection theme={theme} />
}

export default Business