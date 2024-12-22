import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog as Dialog,
} from '#/ui/alert-dialog'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'
import { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'

interface AlertDialogProps extends ThemeContextProps, HeaderSpanProps {
  // Control props
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onConfirm: () => Promise<void> | void
  open: boolean
  
  // Content props
  confirmLabel?: string
  cancelLabel?: string
  description: string
  title: string
  
  // Style props
  className?: string
  variant?: 'default' | 'destructive'
}

const AlertDialog = ({
  // Control props
  onOpenChange,
  onConfirm,
  open,
  
  // Content props
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar', 
  description,
  title,
  
  // Style props
  className,
  variant = 'default',
  theme,
}: AlertDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(
        'sm:max-w-[425px]',
        theme === 'dark' ? 'bg-zinc-900 text-zinc-50' : 'bg-white',
        className
      )}>
        <AlertDialogHeader>
          <AlertDialogTitle className={cn(
            theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
          )}>
            {title}
          </AlertDialogTitle>
          
          <AlertDialogDescription className={cn(
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          )}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className={cn(
            theme === 'dark' 
              ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-50' 
              : 'bg-white hover:bg-gray-100'
          )}>
            {cancelLabel}
          </AlertDialogCancel>
          
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              variant === 'destructive' && 'bg-red-600 hover:bg-red-700',
              theme === 'dark' && variant !== 'destructive' && 'bg-zinc-50 text-zinc-900'
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Dialog>
  )
}

export default AlertDialog 