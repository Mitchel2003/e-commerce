import { useLoadingScreen } from "@/hooks/ui/useLoading"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const LoadingScreen = () => {
  const { isLoading, text } = useLoadingScreen()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 flex items-center justify-center",
            "bg-background/80 backdrop-blur-[2px]",
            "z-[9999]"
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-sm font-medium text-muted-foreground"
            >
              {text}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 