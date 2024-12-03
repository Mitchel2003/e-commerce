import { DollarSign, FileText, Package2, PlusCircle } from "lucide-react"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { useCreateProductForm } from "@/hooks/auth/useProductForm"
import { DialogField } from "@/interfaces/props.interface"
import InputField from "#/common/fields/Input"
import ImageField from "#/common/fields/Image"
import Dialog from "#/common/dialogs/Dialog"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"

const NewProduct = ({ theme }: ThemeContextProps) => {
  const { methods, onSubmit } = useCreateProductForm()

  return (
    <Dialog
      // props header custom
      theme={theme}
      iconSpan="info"
      title="Crear Producto"
      description="Añade un nuevo producto a tu catálogo"

      // props form
      trigger={<Trigger />}
      fields={fields({ theme })}
      form={{ methods, onSubmit }}
      submitButton={<SubmitButton theme={theme} />}
    />
  )
}

export default NewProduct
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const Trigger = () => (
  <Button variant="outline">
    <PlusCircle className="mr-2 h-4 w-4" />
    Añadir Producto
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
    Crear nuevo <PlusCircle className="ml-2 h-4 w-4" />
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
        name="description"
        theme={theme}
        label="Descripción"
        icon={FileText}
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