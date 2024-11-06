import { useThemeContext } from "@/context/ThemeContext"
import CurriculumSection from "@/sections/curriculum"

const CurriculumForm = () => {
  const { theme } = useThemeContext()

  return (
    <CurriculumSection theme={theme} />
  )
}

export default CurriculumForm