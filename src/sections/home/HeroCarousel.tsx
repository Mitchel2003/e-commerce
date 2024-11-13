import { Carousel, CarouselItem } from '@/components/reusables/elements/Carousel'
import { ThemeContextProps } from '@/interfaces/context.interface'
import ItemCarousel from '@/components/home/ItemCarousel'

const HeroCarousel = ({ theme }: ThemeContextProps) => {
  return (
    <Carousel>
      {heroItems.map((item, index) => (
        <CarouselItem key={index}>
          <ItemCarousel {...item} theme={theme} />
        </CarouselItem>
      ))}
    </Carousel>
  )
}

export default HeroCarousel

const heroItems = [
  {
    image: 'assets/adds/parqueOca.jpg',
    title: 'Bienvenido a nuestro centro de compras',
    description: 'Descubre una experiencia de tiendas única',
  },
  {
    image: 'assets/adds/comercio.jpg',
    title: 'Grandes marcas, grandes ofertas',
    description: 'Disfruta de tus tiendas favoritas y precios competitivos',
  },
  {
    image: 'assets/adds/variedad.jpg',
    title: 'Variedad de productos, ¡Solo aquí!',
    description: 'Encuentra una amplia variedad de productos en un solo lugar',
  },
  {
    image: 'assets/adds/emprendedor.jpg',
    title: 'Apoya nuestros emprendedores',
    description: 'Encuentra productos únicos y originales, creados en nuestra región',
  },
]
