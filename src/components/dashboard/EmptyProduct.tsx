import { CardContent, CardFooter } from '#/ui/card'
import { ShoppingBag } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import { Button } from '#/ui/button'
import { Card } from '#/ui/card'

export const EmptyProduct = () => {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">No tienes productos aún</h3>
        <p className="mt-2 text-muted-foreground">Comienza añadiendo tu primer producto para mostrar en tu tienda.</p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Añadir tu primer producto</Button>
      </CardFooter>
    </Card>
  )
}