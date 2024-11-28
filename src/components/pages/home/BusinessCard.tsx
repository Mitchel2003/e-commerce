import { Card, CardContent, CardFooter, CardHeader } from '#/ui/card'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { Business } from '@/interfaces/context.interface'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BusinessCardProps extends ThemeContextProps { business: Business }
const BusinessCard = ({ business, theme }: BusinessCardProps) => {
  return (
    <Card
      className={cn(
        'grid grid-cols-2 overflow-hidden shadow-lg',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-purple-50'
      )}
    >
      {/* Image */}
      <CardHeader className="relative p-0">
        <img src={business.photoUrl.place[0]} alt={business.name} className="w-full h-[400px] object-cover" />
      </CardHeader>

      <div className="flex flex-col relative">
        {/* Content */}
        <CardContent className="p-4 mt-2">
          {business.isLocal && (
            <div className="absolute top-3 right-5">
              <StarIcon className="h-10 w-10 text-yellow-300" fill="yellow" />
            </div>
          )}

          {/* Name */}
          <h3 className={cn(
            'mb-2 text-2xl font-semibold',
            theme === 'dark' ? 'text-zinc-50' : 'text-gray-800'
          )}>
            {business.name}
          </h3>

          {/* Category */}
          <p className={cn(
            'mb-2 text-sm',
            theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
          )}>
            {business.category}
          </p>

          {/* Description */}
          <p className="text-sm">{business.description}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className={cn(
          'p-4 mt-auto text-sm',
          theme === 'dark' ? 'bg-zinc-800' : 'bg-purple-200/30'
        )}>
          <p className={cn(theme === 'dark' ? 'text-zinc-300' : 'text-gray-600')}>
            Ubicación: {business.address}
          </p>
        </CardFooter>
      </div>
    </Card>
  )
}

export default BusinessCard
