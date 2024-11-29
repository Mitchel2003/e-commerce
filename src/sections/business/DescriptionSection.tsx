import { ThemeContextProps } from '@/interfaces/context.interface';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessDescriptionProps extends ThemeContextProps {
  description: string;
  images: string[];
}

export const BusinessDescription = ({ description, images, theme }: BusinessDescriptionProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-50",
        theme === 'dark'
          ? 'from-purple-800 to-pink-800'
          : 'from-purple-500 to-pink-500'
      )}>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className={cn(
                "text-3xl font-bold mb-6 text-center bg-gradient-to-r bg-clip-text text-transparent",
                theme === 'dark'
                  ? 'from-purple-300 to-pink-300'
                  : 'from-purple-500 to-pink-500'
              )}
            >
              Sobre Nosotros
            </h2>
            <div
              className={cn(
                "bg-opacity-50 rounded-lg p-6 shadow-lg",
                theme === 'dark'
                  ? 'bg-zinc-800 text-white'
                  : 'bg-purple-50/45 text-gray-800'
              )}
            >
              <p className="text-lg leading-relaxed">{description}</p>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="embla overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
              <div className="embla__container">
                {images.map((image, index) => (
                  <div key={index} className="embla__slide">
                    <img
                      src={image}
                      alt={`Imagen del negocio ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}