import { ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface StatCardProps extends ThemeContextProps { icon: React.ReactNode, title: string, value: string }
const StatsCard = ({ theme, icon, title, value }: StatCardProps) => {
  return (
    <div className={cn(
      'p-6 px-8',
      'flex flex-col items-center justify-center',
      'bg-gradient-to-bl rounded-xl',
      theme === 'dark'
        ? 'from-zinc-950/80 to-purple-950/80'
        : 'from-purple-700/30 to-indigo-300/15'
    )}>
      {/* Icono */}
      <div className={cn(
        'flex flex-col w-full p-3',
        'items-center justify-center rounded-full',
        theme === 'dark'
          ? 'bg-zinc-950/60 text-purple-400'
          : 'bg-purple-100 text-purple-600'
      )}>
        {/* Icono */}
        {icon}

        {/* Titulo */}
        <p className={cn('text-center text-sm font-medium',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}> {title} </p>

        {/* Valor */}
        <h4 className={cn('text-2xl font-bold mt-2',
          theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
        )}>{value}</h4>
      </div>
    </div>
  )
}

export default StatsCard