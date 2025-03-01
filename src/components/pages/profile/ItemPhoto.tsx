import { ThemeContextProps } from '@/interfaces/context.interface'
import { useBusinessMutation } from '@/hooks/useBusinessQuery'
import AlertDialog from '#/common/elements/AlertDialog'
import { Trash2 } from 'lucide-react'
import { Button } from '#/ui/button'
import { useState } from 'react'
import { Card } from '#/ui/card'
import { cn } from '@/lib/utils'

interface ItemPhotoProps extends ThemeContextProps {
  idBusiness: string
  name: string
  url: string
}

const ItemPhoto = ({ theme, idBusiness, name, url }: ItemPhotoProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { deleteBusinessImage } = useBusinessMutation()

  const handleDelete = () => {
    deleteBusinessImage({ idBusiness, nameImage: name })
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Card className={cn(
        'relative overflow-hidden group',
        'transition-all duration-300 hover:shadow-lg',
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white'
      )}>
        <img src={url} alt={name} className="w-full h-60 object-cover object-center" />
        <div className={cn(
          'absolute top-2 right-2 opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300'
        )}>
          <Button
            size="icon"
            type="button"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="rounded-full"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <AlertDialog
        theme={theme}
        variant="destructive"
        open={showDeleteDialog}
        onConfirm={handleDelete}
        title="¿Eliminar imagen?"
        onOpenChange={setShowDeleteDialog}
        description="Esta acción no se puede deshacer. La imagen será eliminada permanentemente."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
      />
    </>
  )
}

export default ItemPhoto