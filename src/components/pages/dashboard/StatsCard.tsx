import { ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface StatCardProps extends ThemeContextProps { icon: React.ReactNode, title: string, value: string }
const StatsCard = ({ theme, icon, title, value }: StatCardProps) => {
  return (
    <div
      className={cn(
        'flex items-center space-x-4 p-6',
        'rounded-xl transition-colors duration-200',
        theme === 'dark'
          ? 'bg-zinc-800/70 hover:bg-zinc-800/90'
          : 'bg-purple-200/80 hover:bg-purple-300/80'
      )}
    >
      {/* Icono */}
      <div
        className={cn('p-3 rounded-full',
          theme === 'dark'
            ? 'bg-purple-500/20 text-purple-400'
            : 'bg-purple-100 text-purple-600'
        )}
      >
        {icon}
      </div>

      {/* Contenido */}
      <div>
        <p className={cn('text-sm font-medium',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}> {title} </p>

        <h4 className={cn('text-2xl font-bold mt-1',
          theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
        )}> {value} </h4>
      </div>
    </div>
  )
}

export default StatsCard