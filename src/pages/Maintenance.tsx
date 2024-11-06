import { useThemeContext } from "@/context/ThemeContext"
import MaintenanceSection from "@/sections/maintenance"

const Maintenance = () => {
  const { theme } = useThemeContext()

  return (
    <MaintenanceSection theme={theme} />
  )
}

export default Maintenance