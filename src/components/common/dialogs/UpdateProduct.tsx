import { ThemeContextProps } from "@/interfaces/context.interface"
import { productSchema } from "@/schemas/product.schema"
import { useDialog } from "@/hooks/useDialog"
import { Save } from "lucide-react"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"
import Dialog from "./Dialog"

interface UpdateProductProps extends ThemeContextProps {
  trigger: React.ReactNode
  defaultValues: {
    name: string
    price: string
    description: string
    imageUrl: string
  }
  onSubmit: (data: any) => void
}

const UpdateProduct = ({ theme, trigger, defaultValues, onSubmit }: UpdateProductProps) => {
  const { methods } = useDialog({
    schema: productSchema,
    defaultValues,
    onSubmit
  })


  const submitButton = (
    <Button
      type="submit"
      className={cn(
        'w-full text-white',
        'transition-all duration-300 transform hover:scale-105',
        theme === 'dark'
          ? 'bg-purple-600 hover:bg-purple-700'
          : 'bg-purple-800 hover:bg-purple-900'
      )}
    >
      Guardar Cambios <Save className="ml-2 h-4 w-4" />
    </Button>
  )

  return (
    <Dialog
      theme={theme}
      title="Actualizar Producto"
      description="Modifica los datos de tu producto"
      iconSpan="info"
      trigger={trigger}
      fields={fields}
      methods={methods}
      onSubmit={onSubmit}
      submitButton={submitButton}
    />
  )
}

export default UpdateProduct 