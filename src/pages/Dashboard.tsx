import DashboardSection from '@/sections/dashboard/DashboardSection'
import { useThemeContext } from '@/context/ThemeContext'

const Dashboard = () => {
  const { theme } = useThemeContext()
  return <DashboardSection theme={theme} />
}

export default Dashboard