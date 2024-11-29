import { Card, CardContent, CardFooter, CardHeader } from '#/ui/card'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { Business } from '@/interfaces/context.interface'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BusinessCardProps extends ThemeContextProps {
  business: Business
}

const BusinessCard = ({ business, theme }: BusinessCardProps) => {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate(`/business/${business.id}`)}
      className={cn(
        'grid grid-cols-2 overflow-hidden shadow-lg',
        'transition-all duration-300 transform hover:scale-[1.02]',
        'cursor-pointer hover:shadow-xl',
        theme === 'dark'
          ? 'bg-zinc-900 hover:bg-zinc-800/90'
          : 'bg-white hover:bg-purple-50'
      )}
    >
      {/* Image */}
      <CardHeader className="relative p-0">
        <img
          alt={business.name}
          src={business.photoUrl[0]}
          className="w-full h-[400px] object-cover"
        />
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
          <p className="text-sm line-clamp-3">{business.description}</p>
        </CardContent>

        {/* Footer */}
        <CardFooter className={cn(
          'p-4 mt-auto text-sm',
          theme === 'dark' ? 'bg-zinc-800' : 'bg-purple-200/30'
        )}>
          <p className={cn(theme === 'dark' ? 'text-zinc-300' : 'text-gray-600')}>
            {business.address}
          </p>
        </CardFooter>
      </div>
    </Card>
  )
}

export default BusinessCard