import { FeatureItem } from '@/interfaces/product.interface'
import { features } from '@/utils/constants'

export const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
      {features.map((feature, i) => (
        <FeatureCard key={i} feature={feature} />
      ))}
    </div>
  )
}

const FeatureCard = ({ feature }: { feature: FeatureItem }) => (
  <div className="flex flex-col items-center text-center space-y-2 p-4">
    <img
      src={feature.icon}
      className="w-32 h-32 mb-4"
    />
    <h3 className="font-semibold">{feature.title}</h3>
    <p className="text-sm text-muted-foreground">{feature.description}</p>
  </div>
) 