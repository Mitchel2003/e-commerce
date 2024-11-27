import { ThemeContextProps } from '@/interfaces/context.interface'
import { ShoppingBag, TrendingUp, Users } from 'lucide-react'
import StatCard from '@/components/pages/dashboard/StatsCard'
import { cn } from '@/lib/utils'

const StatisticsSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4')}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          theme={theme}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  )
}

export default StatisticsSection

const stats = [
  { icon: <ShoppingBag />, title: 'Total Productos', value: '0' },
  { icon: <TrendingUp />, title: 'Ventas Totales', value: '$0.00' },
  { icon: <Users />, title: 'Clientes', value: '0' }
]