import { ThemeContextProps } from '@/interfaces/context.interface'
import { FileQuestion, Home, RefreshCw } from 'lucide-react'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'

interface NotFoundProps extends ThemeContextProps {
  title?: string
  message?: string
  showHome?: boolean
  showRefresh?: boolean
  onRefresh?: () => void
  illustration?: React.ReactNode
}

const NotFound = ({
  message = 'Lo sentimos, no pudimos encontrar lo que estabas buscando.',
  title = 'No encontrado',
  showRefresh = true,
  showHome = true,
  illustration,
  onRefresh,
  theme
}: NotFoundProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-[50vh] p-8',
      'text-center space-y-6'
    )}>
      <div className={cn(
        'rounded-full p-6',
        theme === 'dark'
          ? 'bg-zinc-800/50 text-purple-400'
          : 'bg-purple-100 text-purple-600'
      )}>
        {illustration || <FileQuestion className="w-16 h-16" />}
      </div>

      <div className="space-y-2">
        <h2 className={cn(
          'text-2xl font-bold',
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        )}>
          {title}
        </h2>
        <p className={cn(
          'max-w-md',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}>
          {message}
        </p>
      </div>

      <div className="flex gap-4">
        {showRefresh && (
          <Button
            onClick={onRefresh || (() => window.location.reload())}
            variant="outline"
            className={cn(
              'transition-all duration-300',
              theme === 'dark'
                ? 'hover:bg-zinc-800'
                : 'hover:bg-purple-50'
            )}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
        )}
        {showHome && (
          <Button
            onClick={() => window.location.href = '/'}
            className={cn(
              'transition-all duration-300',
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-purple-800 hover:bg-purple-900'
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Ir al inicio
          </Button>
        )}
      </div>
    </div>
  )
}

export default NotFound 