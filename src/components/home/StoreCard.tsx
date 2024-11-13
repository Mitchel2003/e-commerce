import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Store } from '@/types/form/home.type'
import { StarIcon } from 'lucide-react'

type StoreCardProps = {
  store: Store
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Card className="flex flex-row overflow-hidden shadow-lg">
      <CardHeader className="relative p-0">
        <img src={store.image} alt={store.name} className="w-full h-[300px] object-cover" />
        {store.isLocal && (
          <div className="absolute top-3 right-5">
            <StarIcon className="h-10 w-10 text-yellow-300" fill="yellow" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{store.category}</p>
        <p className="text-sm">{store.description}</p>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 mt-auto">
        <p className="text-sm text-gray-600">Ubicación: {store.location}</p>
      </CardFooter>
    </Card>
  )
}

export default StoreCard
