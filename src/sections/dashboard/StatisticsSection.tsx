import { ThemeContextProps } from '@/interfaces/context.interface'
import { ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import StatCard from '#/dashboard/StatsCard'

interface StatisticsSectionProps extends ThemeContextProps { variants: Variants }

const StatisticsSection = ({ theme, variants }: StatisticsSectionProps) => {
  return (
    <motion.section
      variants={variants}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          theme={theme}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </motion.section>
  )
}

export default StatisticsSection

const stats = [
  { icon: <ShoppingBag />, title: 'Total Productos', value: '0' },
  { icon: <TrendingUp />, title: 'Ventas Totales', value: '$0.00' },
  { icon: <Users />, title: 'Clientes', value: '0' }
]