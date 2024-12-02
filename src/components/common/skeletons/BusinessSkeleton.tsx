import { ThemeContextProps } from '@/interfaces/context.interface'
import { Card, CardContent } from '#/ui/card'
import { Skeleton } from '#/ui/skeleton'
import { cn } from '@/lib/utils'

const BusinessSkeleton = ({ theme }: ThemeContextProps) => {
  return (
    <div className="container pt-12 mx-auto animate-pulse">
      <HeaderSkeleton theme={theme} />
      <DescriptionSkeleton theme={theme} />
      <ProductsSkeleton theme={theme} />
      <SocialMediaSkeleton theme={theme} />
    </div>
  )
}

export default BusinessSkeleton

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const HeaderSkeleton = ({ theme }: ThemeContextProps) => (
  <>
    {/* Hero Image Skeleton */}
    <Skeleton className="absolute inset-0" />

    {/* Business Name Overlay */}
    <div className={cn(
      'absolute bottom-0 left-0 right-0 p-8',
      'bg-gradient-to-t',
      theme === 'dark'
        ? 'from-zinc-900/90 to-transparent'
        : 'from-white/90 to-transparent'
    )}>
      <Skeleton className="h-8 w-[300px]" />
    </div>
  </>
)

const DescriptionSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'mx-8 -mt-8 relative z-10',
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
  )}>
    <CardContent className="p-6 space-y-6">
      {/* Description Text */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full h-[200px] rounded-lg"
          />
        ))}
      </div>
    </CardContent>
  </Card>
)

const ProductsSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'mx-8 mt-8',
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
  )}>
    <CardContent className="p-6">
      {/* Section Title */}
      <Skeleton className="h-6 w-[200px] mb-6" />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className={cn(
            'overflow-hidden',
            theme === 'dark' ? 'bg-zinc-900/50' : 'bg-gray-100/50'
          )}>
            {/* Product Image */}
            <Skeleton className="w-full h-[200px]" />

            {/* Product Info */}
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
)

const SocialMediaSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'mx-8 mt-8 mb-8',
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
  )}>
    <CardContent className="p-6">
      {/* Section Title */}
      <Skeleton className="h-6 w-[250px] mb-6" />

      {/* Social Media Links */}
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              'h-12 w-12 rounded-full',
              'transition-all duration-300'
            )}
          />
        ))}
      </div>
    </CardContent>
  </Card>
)