import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/ui/card'
import { Product, ThemeContextProps } from '@/interfaces/context.interface'
import ProductActions from '#/pages/dashboard/ProductActions'
import { Heart, Award, TrendingUp } from 'lucide-react'
import { formatPrice } from '@/utils/format'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ItemProductProps extends Product, ThemeContextProps { }
const ItemProduct = ({ theme, ...product }: ItemProductProps) => {
  return (
    <Card key={product.uid} className={cn("overflow-hidden transition-all hover:shadow-xl relative group", theme === "dark"
      ? "bg-zinc-900/50 border-zinc-600"
      : "bg-zinc-50 border-zinc-200",
    )}>
      <img
        alt={product.name}
        className={cn("w-full h-96 object-cover rounded-md", theme === "dark" ? "opacity-80 group-hover:opacity-100" : "")}
        src={product.imageUrl || `/placeholder.svg?width=300&height=200&text=${encodeURIComponent(product.name)}`}
      />
      {/* Badge para mostrar likes - Posición absoluta sobre la imagen */}
      <div className="absolute top-3 right-3 z-10">
        <motion.div
          animate={{ scale: 1.3, opacity: 1 }}
          initial={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={cn("flex items-center gap-1 py-1 px-2 rounded-full shadow-lg transition-all duration-2000 ease-in-out animate-pulse",
            (product?.likes || 0) > 50
              ? theme === "dark" ? "bg-gradient-to-r from-amber-700 to-yellow-500 text-white" : "bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-900"
              : (product?.likes || 0) > 10
                ? theme === "dark" ? "bg-gradient-to-r from-purple-700 to-purple-500 text-white" : "bg-gradient-to-r from-purple-500 to-purple-300 text-purple-900"
                : theme === "dark" ? "bg-slate-800 text-slate-200" : "bg-white text-slate-700"
          )}
        >
          {(product?.likes || 0) > 50
            ? (<Award className="h-3.5 w-3.5" />)
            : (product?.likes || 0) > 10
              ? (<TrendingUp className="h-3.5 w-3.5" />)
              : (<Heart className="h-3.5 w-3.5" />)
          }
          <span className="text-xs font-bold">{product?.likes || 0}</span>
        </motion.div>
      </div>

      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start">
          <CardTitle className={cn("text-lg font-semibold leading-tight truncate", theme === "dark" ? "text-zinc-100" : "text-zinc-800")}>
            {product.name}
          </CardTitle>
        </div>
        {product.description && (
          <CardDescription className={cn("text-xs pt-0.5", theme === "dark" ? "text-zinc-400" : "text-zinc-500")}>
            {product.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="text-sm pb-3 pt-0">
        <div className="flex items-center justify-between">
          <p className={cn("font-semibold text-lg", theme === "dark" ? "text-purple-300" : "text-purple-600")}>
            {formatPrice(product.price) || "Precio no disponible"}
          </p>

          {/* Indicador de popularidad - solo visible para productos con likes */}
          {product?.likes && product.likes > 0 && (
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 20, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className={cn(
                "flex items-center gap-1 text-xs px-2 py-0.5 rounded-md",
                product.likes > 50
                  ? theme === "dark" ? "bg-amber-950/40 text-amber-300" : "bg-amber-100 text-amber-700"
                  : product.likes > 20
                    ? theme === "dark" ? "bg-purple-950/40 text-purple-300" : "bg-purple-100 text-purple-700"
                    : theme === "dark" ? "bg-slate-800/50 text-slate-300" : "bg-slate-100 text-slate-600"
              )}
            >
              {product.likes > 50 ? (
                <>
                  <Award className="h-3 w-3" />
                  <span>Popular</span>
                </>
              ) : product.likes > 20 ? (
                <>
                  <TrendingUp className="h-3 w-3" />
                  <span>Tendencia</span>
                </>
              ) : (
                <>
                  <Heart className="h-3 w-3" />
                  <span>Likes: {product.likes}</span>
                </>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center mt-auto">
        <ProductActions theme={theme} product={product} />
      </CardFooter>
    </Card>
  )
}

export default ItemProduct