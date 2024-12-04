import { ThemeContextProps } from '@/interfaces/context.interface'
import { Card, CardContent } from '#/ui/card'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const NotProducts = ({ theme }: ThemeContextProps) => (
  <Card className={cn(
    "p-8 text-center",
    theme === 'dark' ? 'bg-zinc-950' : 'bg-white'
  )}>
    <CardContent>
      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-semibold">No tienes productos aún</h3>
      <p className="mt-2 text-muted-foreground">Comienza añadiendo tu primer producto para mostrar en tu tienda.</p>
    </CardContent>
  </Card>

)

export default NotProducts