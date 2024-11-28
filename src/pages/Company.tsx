import CompanySection from '@/sections/company/CompanySection'
import { useThemeContext } from '@/context/ThemeContext'

const Company = () => {
  const { theme } = useThemeContext()

  return <CompanySection theme={theme} />
}

export default Company