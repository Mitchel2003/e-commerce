import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "#/ui/dialog"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { useProductForm } from "@/hooks/auth/useProductForm"
import HeaderCustom from "#/common/elements/HeaderCustom"
import InputField from "#/common/fields/Input"
import ImageField from "#/common/fields/Image"
import { Button } from "#/ui/button"
import { Form } from "#/ui/form"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Package2,
  DollarSign,
  FileText,
  PlusCircle
} from "lucide-react"

interface CreateProductProps extends ThemeContextProps {
  trigger: React.ReactNode
}

const CreateProduct = ({ theme, trigger }: CreateProductProps) => {
  const [open, setOpen] = useState(false)
  const { methods: form, onSubmit } = useProductForm(() => setOpen(false))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn(
        'sm:max-w-[425px]',
        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
      )}>
        <DialogHeader>
          <DialogTitle>
            <HeaderCustom
              to="component"
              theme={theme}
              title="Crear Producto"
              span="Añade un nuevo producto a tu catálogo"
              iconSpan="info"
              className="text-left"
            />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputField
              name="name"
              label="Nombre del producto"
              icon={Package2}
              theme={theme}
              placeholder="Ej: Hamburguesa Clásica"
            />

            <InputField
              name="price"
              type="number"
              label="Precio"
              icon={DollarSign}
              theme={theme}
              placeholder="0.00"
            />

            <InputField
              name="description"
              label="Descripción"
              icon={FileText}
              theme={theme}
              placeholder="Describe tu producto..."
            />

            <ImageField
              name="imageUrl"
              label="Imagen"
              theme={theme}
            />

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
              Crear Producto <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProduct 