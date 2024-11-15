import { ThemeContextProps } from '@/interfaces/context.interface'
import { FeatureItem } from '@/types/form/product.type'
import { features } from '@/utils/constants'
import { cn } from '@/lib/utils'

export const FeaturesSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
      {features.map((feature, i) => (
        <FeatureCard key={i} feature={feature} theme={theme} />
      ))}
    </div>
  )
}

interface FeatureCardProps extends ThemeContextProps { feature: FeatureItem }
const FeatureCard = ({ theme, feature }: FeatureCardProps) => (
  <div
    className={cn(
      'space-y-2 p-4 rounded-lg shadow-xl',
      'flex flex-col items-center text-center',
      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
    )}
  >
    <img src={feature.icon} className="w-32 h-32 mb-4" />
    <h3
      className={cn(
        'font-semibold',
        theme === 'dark' ? 'text-white' : 'text-zinc-700'
      )}
    > {feature.title} </h3>
    <p
      className={cn(
        'text-sm',
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      )}
    > {feature.description} </p>
  </div >
) 