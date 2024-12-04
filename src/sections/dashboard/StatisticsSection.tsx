import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { ShoppingBag, TrendingUp } from 'lucide-react'
import StatCard from '#/pages/dashboard/StatsCard'
import { cn } from '@/lib/utils'

interface StatisticsSectionProps extends ThemeContextProps {
  products?: Product[]
}

const StatisticsSection = ({ theme, products }: StatisticsSectionProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4')}>
      {stats(products).map((stat, index) => (
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

const stats = (products?: Product[]) => [
  { icon: <ShoppingBag />, title: 'Total Productos', value: products?.length.toString() || '0' },
  { icon: <TrendingUp />, title: 'Visitas a tu negocio', value: '0' }
]