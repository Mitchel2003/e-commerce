import { ThemeContextProps } from '@/interfaces/context.interface';
import Carousel from '#/common/elements/Carousel';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BusinessDescriptionProps extends ThemeContextProps {
  description: string;
  images: string[];
}

export const BusinessDescription = ({ description, images, theme }: BusinessDescriptionProps) => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-80",
        theme === 'dark'
          ? 'from-purple-900/90 to-pink-900/90'
          : 'from-purple-200 to-pink-200'
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
                "text-4xl font-bold mb-8 text-center bg-gradient-to-r bg-clip-text text-transparent",
                theme === 'dark'
                  ? 'from-purple-300 to-pink-300'
                  : 'from-purple-500 to-pink-500'
              )}
            >
              Sobre Nosotros
            </h2>
            <div
              className={cn(
                "bg-opacity-50 rounded-lg p-6 shadow-lg bg-gradient-to-br",
                theme === 'dark'
                  ? 'from-zinc-800/50 to-zinc-800/50'
                  : 'from-purple-100 to-pink-100'
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
            <Carousel
              autoplay
              withButtons
              items={images}
              className_Carousel="w-full"
              render={(item) => <ItemImage image={item} />}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface ItemImageProps { image: string }
const ItemImage = ({ image }: ItemImageProps) => {
  return <img src={image} alt="Imagen del negocio" className="w-full h-96 object-cover rounded-lg" />
}