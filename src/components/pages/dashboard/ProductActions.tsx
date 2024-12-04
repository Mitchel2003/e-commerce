import { DollarSign, FileText, Package2, Trash2, PencilIcon } from 'lucide-react'
import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { useUpdateProductForm } from '@/hooks/auth/useProductForm'
import { useProductMutation } from '@/hooks/useProductQuery'
import { DialogField } from '@/interfaces/props.interface'
import { useState } from 'react'

import DeleteProductDialog from '@/components/common/elements/AlertDialog'
import UpdateProductDialog from '#/common/elements/Dialog'
import InputField from '#/common/fields/Input'
import ImageField from '#/common/fields/Image'
import { Button } from '#/ui/button'

interface ProductActionsProps extends ThemeContextProps {
  product: Product
}

const ProductActions = ({ product, theme }: ProductActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)

  const { methods, onSubmit } = useUpdateProductForm(product)
  const { deleteProduct } = useProductMutation()

  const handleDelete = () => {
    deleteProduct({ productId: product.id, productName: product.name })
    setShowDeleteDialog(false)
  }

  return (
    <div className="flex gap-2">
      {/* Dialog de Actualización */}
      <Button size="sm" variant="ghost" onClick={() => setShowUpdateDialog(true)}>
        <PencilIcon className="h-4 w-4" />
      </Button>

      <UpdateProductDialog
        theme={theme}
        iconSpan="info"
        title="Actualizar producto"
        description="Modifica solo los campos que deseas actualizar"
        open={showUpdateDialog}
        fields={fields({ theme })}
        form={{ methods, onSubmit }}
        onOpenChange={setShowUpdateDialog}
      />

      {/* AlertDialog de Eliminación */}
      <Button size="sm" variant="destructive" onClick={() => setShowDeleteDialog(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>

      <DeleteProductDialog
        product={product}
        handleDelete={handleDelete}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </div>
  )
}

export default ProductActions
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
// Campos del formulario de actualización
const fields = ({ theme }: ThemeContextProps): DialogField[] => [
  {
    name: "name",
    component: (
      <InputField
        name="name"
        theme={theme}
        label="Nombre del producto"
        icon={Package2}
        placeholder="Ej: Zapatos de Running"
        span="Opcional"
        iconSpan="info"
      />
    )
  },
  {
    name: "price",
    component: (
      <InputField
        name="price"
        theme={theme}
        label="Precio"
        icon={DollarSign}
        placeholder="0.00"
        span="Opcional"
        iconSpan="info"
      />
    )
  },
  {
    name: "description",
    component: (
      <InputField
        name="description"
        theme={theme}
        label="Descripción"
        icon={FileText}
        placeholder="Describe tu producto..."
        span="Opcional"
        iconSpan="info"
      />
    )
  },
  {
    name: "imageUrl",
    component: (
      <ImageField
        name="imageUrl"
        label="Imagen"
        theme={theme}
        span="Opcional"
        iconSpan="info"
      />
    )
  }
]