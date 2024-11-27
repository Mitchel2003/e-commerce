import { ThemeContextProps } from '@/interfaces/context.interface'
import StoreCard from '#/pages/home/StoreCard'
import { Store } from '@/types/home.type'
import { cn } from '@/lib/utils'

interface StoreSectionProps extends ThemeContextProps {
  stores: Store[]
}

const StoreSection = ({ stores, theme }: StoreSectionProps) => {
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
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} theme={theme} />
        ))}
      </div>
    </section>
  )
}

export default StoreSection