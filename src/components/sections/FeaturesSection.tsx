'use client'

import { FeatureItem } from '@/interfaces/product.interface'

const features: FeatureItem[] = [
  {
    icon: '/placeholder.svg?height=48&width=48',
    title: '¡Novedad para ti!',
    description: 'Descubre los últimos productos',
  },
  {
    icon: '/placeholder.svg?height=48&width=48',
    title: 'Más vendidos',
    description: 'Los favoritos de nuestros clientes',
  },
  {
    icon: '/placeholder.svg?height=48&width=48',
    title: 'Envío gratis',
    description: 'En compras mayores a $50.000',
  },
  {
    icon: '/placeholder.svg?height=48&width=48',
    title: 'Garantía',
    description: '30 días de garantía en todos los productos',
  },
]

export const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </div>
  )
}

const FeatureCard = ({ feature }: { feature: FeatureItem }) => (
  <div className="flex flex-col items-center text-center space-y-2 p-4">
    <img
      src={feature.icon}
      alt=""
      className="w-12 h-12 mb-4"
    />
    <h3 className="font-semibold">{feature.title}</h3>
    <p className="text-sm text-muted-foreground">{feature.description}</p>
  </div>
) 