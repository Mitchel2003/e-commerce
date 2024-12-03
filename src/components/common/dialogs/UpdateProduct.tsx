import { DollarSign, FileText, Package2, PlusCircle } from "lucide-react"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { useUpdateProductForm } from "@/hooks/auth/useProductForm"
import { DialogField } from "@/interfaces/props.interface"
import { Product } from "@/interfaces/context.interface"
import InputField from "#/common/fields/Input"
import ImageField from "#/common/fields/Image"
import Dialog from "#/common/dialogs/Dialog"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface UpdateProductProps extends ThemeContextProps {
  businessId: string
  product: Product
}

const UpdateProduct = ({ theme, product, businessId }: UpdateProductProps) => {
  const { methods, onSubmit } = useUpdateProductForm(businessId, product)

  useEffect(() => {
    product && methods.reset({
      name: product.name,
      price: product.price,
      description: product.description
    })
  }, [product, methods])

  return (
    <Dialog
      theme={theme}
      iconSpan="info"
      title="Actualizar producto"
      description="Modifica solo los campos que deseas actualizar"
      trigger={<Trigger />}
      fields={fields({ theme })}
      form={{ methods, onSubmit }}
      submitButton={<SubmitButton theme={theme} />}
    />
  )
}

export default UpdateProduct

/*--------------------------------------------------tools--------------------------------------------------*/
const Trigger = () => (
  <Button variant="outline" size="sm">
    <PlusCircle className="mr-2 h-4 w-4" />
    Actualizar
  </Button>
)

const SubmitButton = ({ theme }: ThemeContextProps) => (
  <Button
    type="submit"
    className={cn(
      'w-full text-white',
      'transition-all duration-300 transform hover:scale-105',
      theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-800 hover:bg-purple-900'
    )}
  >
    Actualizar producto <PlusCircle className="ml-2 h-4 w-4" />
  </Button>
)

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
  }, {
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
  }, {
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
  }, {
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