import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { useProductMutation } from '@/hooks/useProductQuery'
import UpdateProduct from '#/common/dialogs/UpdateProduct'
import { SetStateAction, Dispatch, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '#/ui/button'
import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from '#/ui/alert-dialog'

interface ProductActionsProps extends ThemeContextProps {
  businessId: string
  product: Product
}

const ProductActions = ({ product, businessId, theme }: ProductActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { deleteProduct } = useProductMutation(businessId)

  const handleDelete = () => {
    deleteProduct({ productId: product.id, productName: product.name })
    setShowDeleteDialog(false)
  }

  return (
    <div className="flex gap-2">
      <UpdateProduct
        theme={theme}
        product={product}
        businessId={businessId}
      />

      <Button
        size="sm"
        variant="destructive"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <DeleteProductDialog
        theme={theme}
        product={product}
        businessId={businessId}
        handleDelete={handleDelete}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />

    </div>
  )
}

export default ProductActions

interface DeleteProductDialogProps extends ProductActionsProps {
  showDeleteDialog: boolean
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>
  handleDelete: () => Promise<void> | void
}

const DeleteProductDialog = ({ product, showDeleteDialog, setShowDeleteDialog, handleDelete }: DeleteProductDialogProps) => {
  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El producto {product.name} será eliminado permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
