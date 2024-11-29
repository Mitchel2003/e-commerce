import { ThemeContextProps } from '@/interfaces/context.interface';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessDescriptionProps extends ThemeContextProps {
  description: string;
}

export const BusinessDescription = ({ description, theme }: BusinessDescriptionProps) => {
  return (
    <section className={cn(
      'py-16',
      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
    )}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={cn(
            'text-3xl font-semibold mb-6',
            theme === 'dark'
              ? 'text-zinc-100'
              : 'text-zinc-800'
          )}>
            Sobre Nosotros
          </h2>
          <p className={cn(
            'text-lg leading-relaxed',
            theme === 'dark'
              ? 'text-zinc-300'
              : 'text-gray-700'
          )}>
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

