import { ThemeContextProps } from "@/interfaces/context.interface"
import { Ban, CheckSquare } from "lucide-react"
import { CardFooter } from "#/ui/card"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"

const FooterSubmit = ({ theme }: ThemeContextProps) => {
  return (
    <CardFooter className="flex justify-between">
      <Button
        variant="outline"
        className={cn(
          'hover:scale-105',
          theme === 'dark'
            ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
            : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
        )}
      >
        <Ban className="text-red-600 mr-2 h-4 w-4" /> Cancelar
      </Button>

      <Button
        type="submit"
        className={cn(
          'hover:scale-105',
          theme === 'dark'
            ? 'bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-900'
            : 'bg-white border border-gray-200 text-gray-900 hover:bg-white'
        )}
      >
        <CheckSquare className="text-green-600 mr-2 h-4 w-4" /> Guardar
      </Button>
    </CardFooter>
  )
}

export default FooterSubmit