import { ThemeContextProps } from '@/interfaces/context.interface'
import { Button } from '#/ui/button'
import { Badge } from '#/ui/badge'
import { cn } from '@/lib/utils'

interface FooterSectionProps extends ThemeContextProps { }

const FooterSection = ({ theme }: FooterSectionProps) => {
  return (
      <div
        className={cn(
          'mt-2 border-t pt-8',
          'flex flex-col md:flex-row',
          'justify-between items-center',
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200',
          theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-50'
        )}
      >
        <div className="mb-4 md:mb-0">
          <h3 className={cn(
            'text-lg font-semibold',
            theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
          )}>
            Emprendedor Dashboard
          </h3>
          <p className={cn(
            'text-sm',
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          )}>
            © 2024 Tu Empresa. Todos los derechos reservados.
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