import { FeatureItem } from "@/interfaces/product.interface"

export const products = {
  newProducts: [
    {
      id: '1',
      rating: 4,
      isNew: false,
      discount: 15,
      price: 19990,
      category: 'Culinary',
      name: 'Galletas artesanales',
      image: '/src/assets/products/galletas.jpeg',
    },
    {
      id: '2',
      rating: 4,
      isNew: true,
      discount: 15,
      price: 14990,
      category: 'Culinary',
      name: 'Miel de abeja',
      image: '/src/assets/products/miel.jpg',
    },
    {
      id: '3',
      rating: 4,
      isNew: true,
      discount: 25,
      price: 89990,
      category: 'Clothing',
      name: 'Buso de lana',
      image: '/src/assets/products/buso.jpg',
    },
    {
      id: '4',
      rating: 5,
      isNew: true,
      discount: 10,
      price: 4990,
      category: 'Food',
      name: 'Pan industrial',
      image: '/src/assets/products/pan.jpg',
    },
    {
      id: '5',
      rating: 4,
      isNew: false,
      discount: 10,
      price: 29990,
      category: 'Food',
      name: 'Vino artesanal',
      image: '/src/assets/products/vino.jpg',
    },
    {
      id: '6',
      rating: 4,
      isNew: true,
      discount: 10,
      price: 14990,
      category: 'Food',
      name: 'Galletas de vainilla',
      image: '/src/assets/products/galletas_2.jpg',
    }
  ],
  bestSellers: [
    {
      id: '1',
      rating: 5,
      price: 199999,
      isBestSeller: true,
      category: 'Neumáticos',
      name: 'Neumático Todo Terreno',
      image: '/src/assets/products/galletas.jpeg',
    },
  ]
}

export const features: FeatureItem[] = [
  {
    title: '¡Novedad para ti!',
    icon: '/src/assets/features/novedad.png',
    description: 'Descubre los últimos productos',
  },
  {
    icon: '/src/assets/features/emprendedor.png',
    title: 'Emprendedores',
    description: 'Por nuestros emprendedores',
  },
  {
    title: 'Más vendidos',
    icon: '/src/assets/features/mas-vendidos.png',
    description: 'Los favoritos de nuestros clientes',
  },
  {
    title: 'Garantía',
    icon: '/src/assets/features/garantia.png',
    description: '30 días de garantía en productos seleccionados',
  },
]