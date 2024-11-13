import { ThemeContextProps } from '@/interfaces/context.interface'
import StoreCard from '@/components/home/StoreCard'
import { Store } from '@/types/form/home.type'
import { cn } from '@/lib/utils'

interface StoreSectionProps extends ThemeContextProps {
  stores: Store[]
}

const StoreSection = ({ stores, theme }: StoreSectionProps) => {
  return (
    <section
      className={cn(
        'py-12 bg-gradient-to-bl',
        theme === 'dark'
          ? 'from-zinc-950/80 to-purple-950/80'
          : 'from-purple-500/20 to-pink-500/20'
      )}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Tiendas</h2>
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8')}>
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoreSection
