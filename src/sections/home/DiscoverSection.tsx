import { ThemeContextProps } from '@/interfaces/context.interface'
import { ShoppingBag, Coffee, Film, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const DiscoverSection = ({ theme }: ThemeContextProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className={cn(
      'py-16 bg-gradient-to-r',
      theme === 'dark'
        ? 'from-purple-950/50 to-pink-950/50'
        : 'from-purple-500 to-pink-500'
    )}>
      <div className="container mx-auto px-4">
        <h2
          className={cn(
            'text-4xl font-extrabold text-center mb-12',
            theme === 'dark' ? 'text-zinc-200' : 'text-white'
          )}
        >
          ¡Descubre lo nuestro!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={cn(
                'p-6 rounded-lg shadow-lg cursor-pointer',
                'flex flex-col items-center justify-center md:items-start',
                theme === 'dark'
                  ? 'bg-zinc-800'
                  : 'bg-white'
              )}
            >
              <feature.icon className="mb-4 w-14 h-14 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={cn(
                theme === 'dark'
                  ? 'text-gray-300'
                  : 'text-gray-600'
              )}>
                {feature.description}
              </p>
              {hoveredIndex === index && (
                <motion.div
                  className="mt-4 h-1 bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection


interface Feature {
  title: string,
  description: string,
  icon: React.ForwardRefExoticComponent<any>
}

const features: Feature[] = [
  { icon: ShoppingBag, title: 'Compras', description: 'Explora nuestras tiendas' },
  { icon: Coffee, title: 'Restaurantes', description: 'Disfruta de la mejor gastronomía' },
  { icon: Film, title: 'Cine', description: 'Vive la magia del séptimo arte' },
  { icon: Music, title: 'Eventos', description: 'Participa en nuestras actividades' },
]