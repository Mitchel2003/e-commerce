import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { useProductMutation } from '@/hooks/useProductMutation'
import UpdateProduct from '#/common/dialogs/UpdateProduct'
import { useAuthContext } from '@/context/AuthContext'
import { Trash2, Edit } from 'lucide-react'
import { Button } from '#/ui/button'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps { }

const ItemProduct = ({ theme, id: productId, ...product }: ItemProductProps) => {
  const { user } = useAuthContext()
  const { updateProduct, deleteProduct } = useProductMutation(user?.uid || '')

  const handleUpdate = (data: any) => {
    updateProduct({ productId, data })
  }

  const handleDelete = () => {
    deleteProduct({ productId, product: { id: productId, ...product } })
  }

  return (
    <Card className={cn(
      theme === 'dark'
        ? 'bg-zinc-900 border-zinc-800 text-white'
        : 'bg-gray-100 border-purple-300 text-zinc-900'
    )}>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>${Number(product.price).toFixed(2)}</CardDescription>
      </CardHeader>

      <CardContent>
        <img
          alt={product.name}
          src={product.imageUrl}
          className={cn('w-full h-[calc(100vh-300px)] object-cover rounded-md')}
        />
      </CardContent>

      <CardFooter className="flex justify-between">
        <UpdateProduct
          theme={theme}
          defaultValues={product}
          onSubmit={handleUpdate}
          trigger={
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                theme === 'dark'
                  ? 'bg-zinc-700/70 hover:bg-zinc-800'
                  : 'bg-gray-300 hover:bg-gray-300/70'
              )}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          }
        />
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          className={cn(theme === 'dark' ? 'bg-red-700' : 'bg-red-500')}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ItemProduct