import { ThemeContextProps } from '@/interfaces/context.interface'
import { Card, CardContent, CardHeader } from '#/ui/card'
import { Skeleton } from '#/ui/skeleton'
import { cn } from '@/lib/utils'

const DashboardSkeleton = ({ theme }: ThemeContextProps) => {
  return (
    <div className="container p-8 space-y-8 mx-auto animate-pulse">
      <InfoSkeleton theme={theme} />
      <StatisticsSkeleton theme={theme} />
      <ProductsSkeleton theme={theme} />
    </div>
  )
}

export default DashboardSkeleton

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const InfoSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'p-6',
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
  )}>
    <div className="flex items-center justify-between">
      {/* Business Profile */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-[180px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[120px]" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  </Card>
)

const StatisticsSkeleton = ({ theme }: ThemeContextProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className={cn(
        'p-6',
        theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
      )}>
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          {/* Value and Label */}
          <div className="space-y-1">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          {/* Chart or Progress */}
          <div className="mt-4">
            <Skeleton className="h-2 w-full rounded-full" />
            <div className="mt-2 flex justify-between">
              <Skeleton className="h-3 w-[60px]" />
              <Skeleton className="h-3 w-[40px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

const ProductsSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'p-6',
    theme === 'dark' ? 'bg-zinc-800/50' : 'bg-white/50'
  )}>
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <Skeleton className="h-6 w-[150px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-10 w-[140px] rounded-lg" />
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <ProductCardSkeleton key={i} theme={theme} />
      ))}
    </div>
  </Card>
)

const ProductCardSkeleton = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    'overflow-hidden',
    theme === 'dark' ? 'bg-zinc-900/50' : 'bg-gray-100/50'
  )}>
    <CardHeader className="p-4 space-y-2">
      <Skeleton className="h-5 w-[80%]" />
      <Skeleton className="h-4 w-[60%]" />
    </CardHeader>
    <CardContent className="p-0">
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
    <div className="p-4 flex justify-between">
      <Skeleton className="h-9 w-[100px] rounded-md" />
      <Skeleton className="h-9 w-[100px] rounded-md" />
    </div>
  </Card>
) 