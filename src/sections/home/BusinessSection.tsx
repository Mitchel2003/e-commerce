import { ThemeContextProps } from '@/interfaces/context.interface'
import { Business } from '@/interfaces/context.interface'
import BusinessCard from '#/pages/home/BusinessCard'
import { cn } from '@/lib/utils'

interface BusinessSectionProps extends ThemeContextProps { businesses: Business[] }
const BusinessSection = ({ businesses, theme }: BusinessSectionProps) => {
  return (
    <section
      className={cn(
        'py-12 px-8 bg-gradient-to-bl',
        theme === 'dark'
          ? 'from-zinc-950/80 to-purple-950/80'
          : 'from-purple-500/10 to-pink-500/10'
      )}
    >
      <h2
        className={cn(
          'text-4xl mb-8 font-extrabold text-center',
          'bg-gradient-to-r text-transparent bg-clip-text',
          theme === 'dark'
            ? 'from-purple-400 to-zinc-50'
            : 'from-pink-500 to-purple-500'
        )}
      >
        Nuestras Tiendas
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            business={business}
            theme={theme}
          />
        ))}
      </div>
    </section>
  )
}

export default BusinessSection