import { FeatureDiscoverProps } from '@/interfaces/props.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { Coffee, Palette, Sparkles, Cpu } from 'lucide-react'
import DiscoverDialog from '#/pages/home/DiscoverDialog'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DiscoverSectionProps extends ThemeContextProps {
  onCategory: (category: string | null) => void
  selectedCategory: string | null
}

const DiscoverSection = ({ theme, onCategory, selectedCategory }: DiscoverSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [feature, setFeature] = useState<number | null>(null)

  const handleShowMore = () => {
    if (feature === null) return
    onCategory(features[feature].tag)
    setFeature(null)
  }

  const selectedFeature = feature !== null ? features[feature] : null
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
              onClick={() => setFeature(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onHoverStart={() => setHoveredIndex(index)}
              className={cn(
                'p-6 rounded-lg shadow-lg cursor-pointer',
                'flex flex-col items-center justify-center md:items-start',
                selectedCategory === feature.tag && 'ring-4 ring-purple-900',
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

      {feature !== null && selectedFeature && (
        <DiscoverDialog
          theme={theme}
          open={feature !== null}
          onShowMore={handleShowMore}
          title={selectedFeature.title}
          description={dialogDescriptions[feature]}
          onOpenChange={(open) => !open && setFeature(null)}
          icon={<selectedFeature.icon className="w-8 h-8 text-purple-500" />}
        />
      )}
    </section>
  )
}

export default DiscoverSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const features: FeatureDiscoverProps[] = [
  {
    icon: Coffee,
    tag: 'gastronomia',
    title: 'Gastronomía',
    description: 'Pasión por deleitarte, brindando experiencias únicas. ☕🍰'
  },
  {
    tag: 'moda',
    icon: Sparkles,
    title: 'Modas',
    description: 'Descubre lo que te hace único, complementos perfectos para ti. ✨🔥'
  },
  {
    icon: Palette,
    tag: 'artesanias',
    title: 'Artesanías',
    description: 'Creaciones únicas, dale vida a tu espacio con arte, cultura y tradición. 🎨🌈'
  },
  {
    icon: Cpu,
    tag: 'tecnologia',
    title: 'Tecnología',
    description: 'Innovación a tu alcance, encuentra lo último en soluciones digitales. 🚀💡'
  },
]

const dialogDescriptions: string[] = [
  'Explora una selección exclusiva de productos gastronómicos, desde exquisiteces artesanales hasta delicias gourmet, hay algo para todos los gustos.',
  'Mantente al día con las últimas tendencias en moda y accesorios. Encuentra diseñadores locales y boutiques exclusivas.',
  'Apoya el arte, la cultura y el talento local, Creaciones únicas que reflejan tradición y pasión por lo nuestro',
  'Seleccionamos cuidadosamente los mejores negocios de tecnología, garantizando calidad, innovación y soluciones de vanguardia para ti.',
]