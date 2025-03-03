import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '#/ui/dialog'
import { Business, Product, ThemeContextProps } from '@/interfaces/context.interface'
import { useProductMutation } from '@/hooks/useProductQuery'
import { useLikesStore } from '@/store/useLikesStore'
import { useIsMobile } from '@/hooks/ui/use-mobile'
import { formatPrice } from '@/utils/format'
import { Button } from '#/ui/button'
import { motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductDialogProps extends ThemeContextProps {
  onClose: () => void
  business: Business
  product: Product
  isOpen: boolean
}

const ProductDialog = ({ product, business, isOpen, onClose, theme }: ProductDialogProps) => {
  const { updateLikesProduct: updateLikes } = useProductMutation()
  const [likes, setLikes] = useState(product.likes || 0)
  const [isLiking, setIsLiking] = useState(false)
  const { addLike, hasLiked } = useLikesStore()
  const isMobile = useIsMobile()

  const hasUserLiked = hasLiked(product.uid as string)
  const formattedPrice = formatPrice(product.price)

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`¡Hola! Estoy interesado en el producto "${product.name}". ¿Me podrías dar más información?`)
    const whatsappUrl = `https://wa.me/57${business.phone}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleLike = async () => {
    if (hasUserLiked || isLiking) return
    setIsLiking(true)
    const success = await updateLikes(product.uid as string)
    if (success) { addLike(product.uid as string, business.id); setLikes(prev => prev + 1) }
    setIsLiking(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        'sm:max-w-[600px] overflow-hidden p-0',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}>
        {/* Close Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className={cn(
            'backdrop-blur-lg shadow-lg',
            'h-10 w-10 rounded-full p-0',
            'absolute right-3 top-3 z-50',
            'border-2 transition-all duration-300',
            'hover:scale-110 hover:rotate-90',
            theme === 'dark'
              ? 'bg-zinc-800/80 hover:bg-purple-500/20 text-zinc-400 hover:text-white border-zinc-700 hover:border-purple-500/50'
              : 'bg-white/80 hover:bg-purple-500/10 text-zinc-600 hover:text-purple-600 border-zinc-200 hover:border-purple-500/50'
          )}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar diálogo</span>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Imagen Principal con Overlay Gradiente */}
          <div className="relative w-full h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              alt={product.name}
              src={product.imageUrl}
              className="w-full h-full object-cover"
            />

            {/* Información sobre la imagen */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-white mb-2">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-xl font-semibold text-purple-300">
                  {formattedPrice}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {/* Descripción con borde decorativo */}
            <div className={cn(
              'relative p-6 rounded-lg',
              theme === 'dark'
                ? 'bg-zinc-800/50 border border-purple-500/20'
                : 'bg-purple-50/50 border border-purple-100'
            )}>
              <div className="absolute -top-3 left-4">
                <span className={cn(
                  'px-2 text-sm font-medium',
                  theme === 'dark' ? 'bg-zinc-900 text-purple-400' : 'bg-white text-purple-600'
                )}>
                  Descripción
                </span>
              </div>
              <p className={cn(
                'text-base leading-relaxed',
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
              )}>
                {product.description}
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-5 gap-4 mt-6">
              <button
                onClick={handleWhatsApp}
                className={cn(
                  'col-span-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300',
                  'bg-gradient-to-r from-purple-500 to-pink-500',
                  'hover:from-purple-600 hover:to-pink-600',
                  'transform hover:scale-[0.98]',
                  'text-white shadow-lg'
                )}
              >
                ¡Lo quiero!
              </button>
              <div className="col-span-2 relative group">
                <button
                  onClick={handleLike}
                  disabled={hasUserLiked || isLiking}
                  className={cn('border-2 flex items-center justify-center gap-2',
                    'w-full px-6 py-4 rounded-lg font-semibold transition-all duration-300',
                    theme === 'dark'
                      ? 'border-zinc-700 hover:border-purple-500 text-zinc-300'
                      : 'border-zinc-200 hover:border-purple-500 text-zinc-600',
                    'hover:text-purple-500 group-hover:scale-[0.98]',
                    (hasUserLiked || isLiking) && 'opacity-50 cursor-not-allowed'
                  )}>
                  <Heart className={cn('group-hover:scale-110',
                    'w-5 h-5 transition-transform duration-300',
                    hasUserLiked ? 'fill-pink-500 text-pink-500' : 'group-hover:text-pink-500'
                  )} />
                  {!isMobile && (hasUserLiked ? '¡Me encanta!' : 'Me gusta')}
                </button>
                {/* Badge de likes */}
                <div className={cn(
                  'absolute -top-3 -right-2 px-2 py-1 rounded-full text-xs font-bold',
                  'bg-gradient-to-r from-pink-500 to-purple-500',
                  'text-white shadow-lg'
                )}>
                  {likes}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDialog