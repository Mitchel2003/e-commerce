import { ThemeContextProps } from '@/interfaces/context.interface';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessHeaderProps extends ThemeContextProps {
  imageUrl: string;
  name: string;
}

export const BusinessHeader = ({ name, imageUrl, theme }: BusinessHeaderProps) => {
  return (
    <motion.header
      className="relative h-[80vh] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 z-10 bg-opacity-50 bg-black/50" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="relative z-20 text-center px-4">
        <motion.h1
          className={cn(
            'text-4xl md:text-5xl lg:text-6xl font-bold mb-4',
            'bg-clip-text text-transparent',
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          )}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {name}
        </motion.h1>
      </div>
    </motion.header>
  )
}