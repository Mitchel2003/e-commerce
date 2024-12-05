import { DollarSign, FileText, Package2, Trash2, PencilIcon } from 'lucide-react'
import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { useUpdateProductForm } from '@/hooks/auth/useProductForm'
import { useProductMutation } from '@/hooks/useProductQuery'
import { DialogField } from '@/interfaces/props.interface'
import { useState } from 'react'

import DeleteProductDialog from '#/common/elements/AlertDialog'
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
    deleteProduct({ idProduct: product.uid as string })
    setShowDeleteDialog(false)
  }

  return (
    <>
      {/* triggers dialog */}
      <Button size="default" variant="outline" onClick={() => setShowUpdateDialog(true)}>
        <span className="hidden md:block">Actualizar</span>
        <PencilIcon className="h-6 w-6 md:h-4 md:w-4" />
      </Button>

      <Button size="default" variant="destructive" onClick={() => setShowDeleteDialog(true)}>
        <span className="hidden md:block">Eliminar</span>
        <Trash2 className="h-6 w-6 md:h-4 md:w-4" />
      </Button>

      {/* dialogs update and delete */}
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
      <DeleteProductDialog
        product={product}
        handleDelete={handleDelete}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </>
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