import { ThemeContextProps } from '@/interfaces/context.interface'
import { Button } from '#/ui/button'
import { Badge } from '#/ui/badge'
import { cn } from '@/lib/utils'

interface FooterSectionProps extends ThemeContextProps { }

const FooterSection = ({ theme }: FooterSectionProps) => {
  return (
    <div
      className={cn(
        'p-6 z-10 border-t',
        'flex flex-col sm:flex-row',
        'justify-between items-center',
        theme === 'dark'
          ? 'bg-zinc-900 border-zinc-800'
          : 'bg-gray-50 border-gray-200',
      )}
    >
      <div className="mb-4 md:mb-0">
        <h3 className={cn(
          'text-lg font-semibold',
          theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
        )}>
          Gestion salud
        </h3>
        <p className={cn(
          'text-sm',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}>
          © 2024. Todos los derechos reservados.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button variant="link" size="sm">Términos de Servicio</Button>
        <Button variant="link" size="sm">Política de Privacidad</Button>
        <div className="flex items-center text-center">
          <Badge variant="outline" className="hidden md:block w-full">Versión 1.0.0</Badge>
        </div>
      </div>
    </div>
  )
}

export default FooterSection