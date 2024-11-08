import DashboardSection from '@/sections/dashboard/DashboardSection'
import { useThemeContext } from '@/context/ThemeContext'

const Dashboard = () => {
  const { theme } = useThemeContext()
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardSection theme={theme} />
    </div>
  )
}

export default Dashboard