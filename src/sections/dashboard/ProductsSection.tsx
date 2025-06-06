import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import { DollarSign, FileText, Package2, PlusIcon } from 'lucide-react'
import { useCreateProductForm } from '@/hooks/auth/useProductForm'
import { DialogField } from '@/interfaces/props.interface'
import { useIsMobile } from '@/hooks/ui/use-mobile'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import ItemProduct from '#/pages/dashboard/ItemProduct'
import NotProducts from '#/common/states/NotProducts'
import DialogSubmit from '#/common/elements/Dialog'
import Carousel from '#/common/elements/Carousel'
import InputField from '#/common/fields/Input'
import ImageField from '#/common/fields/Image'
import { Button } from '#/ui/button'

interface ProductsSectionProps extends ThemeContextProps {
  products?: Product[]
  error: Error | null
}

const ProductsSection = ({ theme, error, products }: ProductsSectionProps) => {
  const [showNewProductDialog, setShowNewProductDialog] = useState(false)
  const { methods, onSubmit } = useCreateProductForm()

  return (
    <section className={cn("space-y-6 p-6 md:p-8 rounded-xl shadow-lg", theme === "dark"
      ? "bg-slate-800/50 border border-slate-700/50"
      : "bg-white border border-slate-200/80",
    )}>
      {/* header to create new product */}
      <HeaderSection
        theme={theme}
        methods={methods}
        onSubmit={onSubmit}
        open={showNewProductDialog}
        onOpenChange={setShowNewProductDialog}
      />

      {/* products */}
      {products && products.length > 0 ? (
        <Carousel
          autoplay
          withButtons
          items={products}
          className_Carousel="w-full"
          className_Item="md:basis-1/3"
          render={(item) => <ItemProduct theme={theme} {...item} />}
        />
      ) : (
        <NotProducts
          theme={theme}
          header='No tienes ningún producto aún'
          message='Comienza añadiendo tu primer producto para mostrar en tu tienda.'
        />
      )}

      {/* error */}
      {error && <div className="text-center text-red-500">Error al cargar los productos: {error.message}</div>}
    </section>
  )
}

export default ProductsSection
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface HeaderSectionProps extends ThemeContextProps {
  onOpenChange: (open: boolean) => void
  open: boolean
  onSubmit: any
  methods: any
}

const HeaderSection = ({ theme, methods, onSubmit, open, onOpenChange }: HeaderSectionProps) => {
  const isMobile = useIsMobile()
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <h2 className={cn('text-3xl font-bold tracking-tight', theme === "dark" ? "text-slate-100" : "text-slate-800")}>
          Tus Productos
        </h2>

        {/* trigger dialog */}
        <Button
          type="button"
          size="default"
          variant="default"
          onClick={() => onOpenChange(true)}
          className={cn("flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow", theme === "dark"
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-purple-600 text-white hover:bg-purple-700",
          )}
        >
          {isMobile ? 'Agregar' : 'Crear producto'}
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* dialog new product */}
      <DialogSubmit
        theme={theme}
        iconSpan="info"
        title="Crear Producto"
        labelSubmit="Crear producto"
        description="Añade un nuevo producto a tu catálogo"
        form={{ methods, onSubmit }}
        onOpenChange={onOpenChange}
        fields={fields({ theme })}
        open={open}
      />
    </div>
  )
}

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