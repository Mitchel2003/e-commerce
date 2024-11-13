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
        'flex flex-col md:flex-row',
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
          TechnoPark
        </h3>
        <p className={cn(
          'text-sm',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
        )}>
          © 2024. Todos los derechos reservados.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button variant="link" size="sm">Términos de Servicio</Button>
        <Button variant="link" size="sm">Política de Privacidad</Button>
        <Badge variant="outline">Versión 1.0.0</Badge>
      </div>
    </div>
  )
}

export default FooterSection 