import { ThemeContextProps } from '@/interfaces/context.interface';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessHeaderProps extends ThemeContextProps {
  imageUrl: string;
  name: string;
}

export const BusinessHeader = ({ name, imageUrl, theme }: BusinessHeaderProps) => {
  const [promoText, setPromoText] = useState(PROMOTIONAL_TEXTS[0]);
  useEffect(() => { setPromoText(getRandom()) }, [])

  return (
    <motion.header
      className="relative h-[80vh] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 z-10 bg-opacity-50 bg-black/80" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="relative z-20 text-center px-4">
        <motion.h1
          className={cn(
            'text-4xl md:text-6xl lg:text-8xl font-bold mb-6',
            'bg-clip-text text-transparent',
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-300 to-pink-50'
              : 'bg-gradient-to-r from-purple-300 to-pink-300'
          )}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {name}
        </motion.h1>
        <p className={cn(
          'text-xl font-medium md:text-4xl',
          'bg-clip-text text-transparent',
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-200 to-pink-200'
            : 'bg-gradient-to-r from-white to-pink-200'

        )}>
          {promoText}
        </p>
      </div>
    </motion.header>
  )
}
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const getRandom = () => {
  const randomIndex = Math.floor(Math.random() * PROMOTIONAL_TEXTS.length);
  return PROMOTIONAL_TEXTS[randomIndex];
}

const PROMOTIONAL_TEXTS = [
  // Originales
  '¡Lo que buscas está aquí!',
  '¡Solo te lo ofrecemos nosotros!',
  '¡Encuentra lo que te cautiva!',
  // Urgencia y exclusividad
  '¡Descubre ofertas exclusivas hoy!',
  '¡Productos únicos para ti!',
  '¡No te pierdas nuestras novedades!',
  // Valor y calidad
  '¡Calidad que marca la diferencia!',
  '¡Los mejores productos, los mejores precios!',
  '¡Tu satisfacción garantizada!',
  // Emocionales
  '¡Haz realidad tus deseos!',
  '¡Encuentra tu estilo único!',
  '¡Vive la experiencia de comprar mejor!',
  // Beneficios
  '¡Ahorra tiempo y dinero con nosotros!',
  '¡Productos locales de alta calidad!',
  '¡Descubre precios increíbles!',
  // Llamada a la acción
  '¡Renueva tu vida hoy mismo!',
  '¡Marca la diferencia con nosotros!',
  '¡Encuentra todo lo que necesitas!',
  // Confianza
  '¡Cientos de clientes satisfechos!',
  '¡Tu satisfacción es nuestra prioridad!',
  '¡Calidad garantizada siempre!'
];