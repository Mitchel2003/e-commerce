import { BusinessSection } from '@/sections/business/BusinessSection'
import { useThemeContext } from '@/context/ThemeContext'
import { useParams } from 'react-router-dom'

const Business = () => {
  const { theme } = useThemeContext()
  const { id = '' } = useParams()

  return (
    <BusinessSection
      theme={theme}
      idBusiness={id}
    />
  )
}

export default Business