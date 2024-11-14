import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'
import { Store } from '@/types/form/home.type'
import { StarIcon } from 'lucide-react'

interface StoreCardProps extends ThemeContextProps {
  store: Store
}

const StoreCard = ({ store, theme }: StoreCardProps) => {
  return (
    <Card
      className={cn(
        'grid grid-cols-2 overflow-hidden shadow-lg',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-purple-50'
      )}
    >
      <CardHeader className="relative p-0">
        <img src={store.image} alt={store.name} className="w-full h-[400px] object-cover" />
      </CardHeader>

      <div className="flex flex-col relative">
        <CardContent className="p-4 mt-2">
          {store.isLocal && (
            <div className="absolute top-3 right-5">
              <StarIcon className="h-10 w-10 text-yellow-300" fill="yellow" />
            </div>
          )}
          <h3
            className={cn(
              'mb-2 text-2xl font-semibold',
              theme === 'dark' ? 'text-zinc-50' : 'text-gray-800'
            )}
          > {store.name} </h3>
          <p
            className={cn(
              'mb-2 text-sm',
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
            )}
          >
            {store.category}
          </p>
          <p className="text-sm">{store.description}</p>
        </CardContent>

        <CardFooter
          className={cn(
            'p-4 mt-auto text-sm',
            theme === 'dark' ? 'bg-zinc-800' : 'bg-purple-200/30'
          )}
        >
          <p className={cn(theme === 'dark' ? 'text-zinc-300' : 'text-gray-600')}>
            Ubicación: {store.location}
          </p>
        </CardFooter>
      </div>
    </Card>
  )
}

export default StoreCard
