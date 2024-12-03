import { DollarSign, FileText, Package2, PlusCircle } from "lucide-react"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { useProductForm } from "@/hooks/auth/useProductForm"
import { DialogField } from "@/interfaces/props.interface"
import InputField from "#/common/fields/Input"
import ImageField from "#/common/fields/Image"
import Dialog from "#/common/dialogs/Dialog"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"

const UpdateProduct = ({ theme }: ThemeContextProps) => {
  const { methods, onSubmit } = useProductForm()

  //En este componente recuerda que el mecanismo es el de un Partial<> dado que
  //estamos usando el mismo formulario de product

  //podria ser de otra manera, sin embargo, el detalles esta en que, si se supone que
  //es un update, entonces la idea es renderizar el form con los fields diligenciados
  //de modo que, la persona solo actualize o edite los campos que desea, eso implica
  //cargar los datos del producto (database) y cargar la imagen (storage), esto se obtiene
  //con sencilles, el detalle u complejidad se basa en como hacemos el partial<>? osea;
  //tenemos que lograr que tan solo considere el campo que hemos editado; quizas hacer una
  //comparacion directamente no sea la mejor opcion, o no se, quizas halla una mejor manera
  //de lograr lo que buscamos
  return (
    <Dialog
      // props header custom
      theme={theme}
      iconSpan="info"
      title="Actualizar producto"
      description="Completa los campos"

      // props form
      trigger={<Trigger />}
      fields={fields({ theme })}
      form={{ methods, onSubmit }}
      submitButton={<SubmitButton theme={theme} />}
    />
  )
}

export default UpdateProduct

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const Trigger = () => (
  <Button variant="outline">
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