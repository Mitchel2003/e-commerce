import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { DollarSign, FileText, Package2, PlusIcon } from 'lucide-react'
import { useCreateProductForm } from '@/hooks/auth/useProductForm'
import { DialogField } from '@/interfaces/props.interface'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import CarouselProduct from '#/pages/dashboard/CarouselProduct'
import NewProductDialog from '#/common/elements/Dialog'
import InputField from '#/common/fields/Input'
import ImageField from '#/common/fields/Image'
import { Button } from '#/ui/button'

interface ProductsSectionProps extends ThemeContextProps {
  products?: Product[]
  error: Error | null
}

const ProductsSection = ({ theme, products, error }: ProductsSectionProps) => {
  const [showNewProductDialog, setShowNewProductDialog] = useState(false)
  const { methods, onSubmit } = useCreateProductForm()

  return (
    <section
      className={cn(
        'space-y-6 py-12 px-8 bg-gradient-to-bl rounded-xl',
        theme === 'dark'
          ? 'from-zinc-950/80 to-purple-950/80'
          : 'from-purple-500/50 to-pink-500/50'
      )}
    >
      <HeaderProducts
        theme={theme}
        methods={methods}
        onSubmit={onSubmit}
        open={showNewProductDialog}
        onOpenChange={setShowNewProductDialog}
      />
      <CarouselProduct
        theme={theme}
        error={error}
        products={products}
      />
    </section>
  )
}

export default ProductsSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface HeaderProductsProps extends ThemeContextProps {
  onOpenChange: (open: boolean) => void
  open: boolean
  onSubmit: any
  methods: any
}

const HeaderProducts = ({ theme, methods, onSubmit, open, onOpenChange }: HeaderProductsProps) => (
  <div className="flex justify-between items-center">
    <h2 className={cn(
      'text-3xl font-bold',
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    )}> Tus Productos </h2>

    {/* trigger dialog */}
    <Button
      type="button"
      size="default"
      variant="default"
      onClick={() => onOpenChange(true)}
      className={cn('flex items-center gap-2',
        theme === 'dark'
          ? 'text-white bg-purple-700 hover:bg-purple-900'
          : 'text-gray-900 bg-white hover:bg-purple-100'
      )}
    >
      Agregar producto
      <PlusIcon className="h-4 w-4" />
    </Button>

    {/* dialog */}
    <NewProductDialog //working here...
      theme={theme}
      iconSpan="info"
      title="Crear Producto"
      labelSubmit="Crear producto"
      description="Añade un nuevo producto a tu catálogo"
      open={open}
      fields={fields({ theme })}
      form={{ methods, onSubmit }}
      onOpenChange={onOpenChange}
    />
  </div>
)

// Campos del formulario
const fields = ({ theme }: ThemeContextProps): DialogField[] => [
  {
    name: "name",
    component: (
      <InputField
        name="name"
        theme={theme}
        icon={Package2}
        label="Nombre del producto"
        placeholder="Ej: Zapatos de Running"
      />
    )
  }, {
    name: "price",
    component: (
      <InputField
        name="price"
        theme={theme}
        label="Precio"
        icon={DollarSign}
        placeholder="0.00"
      />
    )
  }, {
    name: "description",
    component: (
      <InputField
        theme={theme}
        icon={FileText}
        name="description"
        label="Descripción"
        placeholder="Describe tu producto..."
      />
    )
  }, {
    name: "imageUrl",
    component: (
      <ImageField
        name="imageUrl"
        label="Imagen"
        theme={theme}
      />
    )
  }
]