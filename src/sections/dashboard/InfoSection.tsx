import { Business, ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface InfoSectionProps extends ThemeContextProps { business: Business }
const InfoSection = ({ theme, business }: InfoSectionProps) => {
  const complement = business?.name.slice(1).toLowerCase()
  const first = business?.name.charAt(0).toUpperCase()


  return (
    <section className={cn(
      'text-center space-y-4 p-10',
      'transition-all duration-200',
      'bg-gradient-to-bl rounded-xl',
      theme === 'dark'
        ? 'from-zinc-950/80 to-purple-950/80'
        : 'from-purple-500/20 to-pink-500/20'
    )}>
      <h1 className={cn(
        'text-4xl font-bold',
        theme === 'dark' ? 'text-purple-100' : 'text-purple-400'
      )}>
        Bienvenido {first}{complement}
      </h1>
      <p className={cn(
        'text-xl',
        theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
      )}>
        Aquí podrás gestionar tus productos y personalizar tu perfil
      </p>
    </section>
  )
}

export default InfoSection