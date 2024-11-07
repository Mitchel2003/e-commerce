import { ThemeContextProps } from '@/interfaces/context.interface'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const AnimatedParticles = ({theme}: ThemeContextProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          className={cn(
            'absolute w-2 h-2 rounded-full',
            theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
          )}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
        />
      ))}
    </div>
  )
}

// Variants for the particles
const particleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    }
  })
}