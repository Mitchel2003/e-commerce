import { ThemeContextProps } from '@/interfaces/context.interface'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InfoSectionProps extends ThemeContextProps { variants: Variants }

const InfoSection = ({ theme, variants }: InfoSectionProps) => {
  return (
    <motion.section variants={variants} className="text-center space-y-4">
      <h1 className={cn(
        'text-4xl font-bold',
        theme === 'dark' ? 'text-purple-100' : 'text-purple-400'
      )}>
        Bienvenido a tu Dashboard de Emprendedor
      </h1>
      <p className={cn(
        'text-xl',
        theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
      )}>
        Aquí puedes gestionar tus productos y ver tus estadísticas
      </p>
    </motion.section>
  )
}

export default InfoSection