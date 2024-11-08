import { Card, CardContent, CardFooter, CardHeader } from '#/ui/card'
import { Skeleton } from '#/ui/skeleton'

export const SkeletonProduct = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}