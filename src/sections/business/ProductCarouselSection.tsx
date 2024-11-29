import { ThemeContextProps, Product } from '@/interfaces/context.interface';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCarouselProps extends ThemeContextProps {
  products: Product[];
}

export const ProductCarousel = ({ products, theme }: ProductCarouselProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 10 },
      },
      '(max-width: 640px)': {
        slides: { perView: 1, spacing: 10 },
      },
    }
  })

  if (!products.length) {
    return (
      <section className={cn(
        'py-16',
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}>
        <p className={cn(
          'text-center text-lg',
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
        )}>
          No hay productos disponibles
        </p>
      </section>
    )
  }

  return (
    <section className={cn(
      'py-16',
      theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
    )}>
      <div className="container mx-auto px-4">
        <h2 className={cn(
          'text-3xl font-semibold mb-8 text-center',
          theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
        )}>
          Nuestros Productos
        </h2>
        <motion.div
          ref={sliderRef}
          className="keen-slider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="keen-slider__slide p-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn(
                'rounded-lg overflow-hidden shadow-lg h-full',
                theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
              )}>
                <div className="relative h-48">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className={cn(
                    'text-lg font-semibold mb-2',
                    theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
                  )}>
                    {product.name}
                  </h3>
                  <p className={cn(
                    'text-lg font-bold',
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  )}>
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <p className={cn(
                    'mt-2 text-sm line-clamp-2',
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                  )}>
                    {product.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}