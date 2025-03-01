import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "#/ui/dialog"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { motion } from "framer-motion"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"

interface DiscoverDialogProps extends ThemeContextProps {
  onOpenChange: (open: boolean) => void
  onShowMore: () => void
  icon: React.ReactNode
  description: string
  open: boolean
  title: string
}

const DiscoverDialog = ({
  onOpenChange,
  onShowMore,
  description,
  title,
  theme,
  icon,
  open,
}: DiscoverDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className={cn(
        'sm:max-w-[425px] overflow-hidden',
        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Decorative background gradient */}
          <div className={cn(
            'absolute inset-0 opacity-10 rounded-t-lg h-32',
            'bg-gradient-to-r from-purple-500 to-pink-500'
          )} />

          {/* Icon and header */}
          <DialogHeader className="relative pt-6">
            <div className="flex items-center justify-center mb-4">
              <div className={cn(
                'p-3 rounded-full',
                theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
              )}>
                {icon}
              </div>
            </div>
            <DialogTitle className={cn(
              'text-2xl font-bold text-center mb-2',
              theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
            )}>
              {title}
            </DialogTitle>
            <DialogDescription className={cn(
              'text-center px-6',
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
            )}>
              {description}
            </DialogDescription>
          </DialogHeader>

          {/* Action button */}
          <div className="mt-8 px-6 pb-6">
            <Button
              onClick={onShowMore}
              className={cn(
                'w-full text-white font-medium py-6',
                'transition-all duration-300 transform hover:scale-105',
                'bg-gradient-to-r from-purple-500 to-pink-500',
                'hover:from-purple-600 hover:to-pink-600'
              )}
            >
              Muéstrame
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default DiscoverDialog