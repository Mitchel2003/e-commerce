import { ThemeContextProps } from '@/interfaces/context.interface'
import { Card, CardContent } from '#/ui/card'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NotProductsProps extends ThemeContextProps {
  illustration?: React.ReactNode
  className?: string
  message: string
  header: string
}
const NotProducts = ({ theme, className, header, message, illustration }: NotProductsProps) => (
  <Card className={cn(
    className,
    "p-8 text-center",
    theme === 'dark' ? 'bg-zinc-950' : 'bg-white'
  )}>
    <CardContent>
      <div className="flex items-center justify-center">
        {illustration || <ShoppingBag className="h-12 w-12 text-muted-foreground" />}
      </div>
      <h3 className="mt-4 text-xl font-semibold">{header}</h3>
      <p className="mt-2 text-muted-foreground">{message}</p>
    </CardContent>
  </Card>

)

export default NotProducts