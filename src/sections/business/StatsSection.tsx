import { ThemeContextProps } from '@/interfaces/context.interface'
import { ThumbsUp, Users, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BusinessStatsProps extends ThemeContextProps { }

export const BusinessStats = ({ theme }: BusinessStatsProps) => {
  const [count, setCount] = useState(0);
  const [number] = useState(() => {
    const max = 50; // 50 * 10 = 500
    const min = 10; // Para obtener múltiplos de 10 entre 100 y 500
    return Math.floor(Math.random() * (max - min + 1) + min) * 10;
  });

  useEffect(() => {
    const interval = setInterval(() => { if (count < number) return setCount(prev => prev + 1) }, 20);
    return () => clearInterval(interval);
  }, [count, number]);

  return (
    <div className={cn(
      'text-white py-24 bg-gradient-to-br',
      theme === 'dark'
        ? 'from-zinc-950 to-zinc-950'
        : 'from-purple-400 to-pink-400'
    )}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Users className="size-10 mb-4 text-purple-200" />
            <div className="text-4xl font-bold mb-2">{count}+</div>
            <p className="text-lg">Clientes Satisfechos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Star className="size-10 mb-4 text-purple-200" />
            <div className="text-4xl font-bold mb-2">24/7</div>
            <p className="text-lg">Soporte Disponible</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <ThumbsUp className="size-10 mb-4 text-purple-200" />
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-lg">Seguro y Confiable</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}