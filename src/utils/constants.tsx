import { FeatureItem } from "@/interfaces/product.interface"
import { NavItemProps } from "@/interfaces/props.interface"
import { Home, ShoppingCart, LogIn } from 'lucide-react'

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
      image: '/assets/products/galletas.jpeg',
    },
    {
      id: '2',
      rating: 4,
      isNew: true,
      discount: 15,
      price: 14990,
      category: 'Culinary',
      name: 'Miel de abeja',
      image: '/assets/products/miel.jpg',
    },
    {
      id: '3',
      rating: 4,
      isNew: true,
      discount: 25,
      price: 89990,
      category: 'Clothing',
      name: 'Buso de lana',
      image: '/assets/products/buso.jpg',
    },
    {
      id: '4',
      rating: 5,
      isNew: true,
      discount: 10,
      price: 4990,
      category: 'Food',
      name: 'Pan industrial',
      image: '/assets/products/pan.jpg',
    },
    {
      id: '5',
      rating: 4,
      isNew: false,
      discount: 10,
      price: 29990,
      category: 'Food',
      name: 'Vino artesanal',
      image: '/assets/products/vino.jpg',
    },
    {
      id: '6',
      rating: 4,
      isNew: true,
      discount: 10,
      price: 14990,
      category: 'Food',
      name: 'Galletas de vainilla',
      image: '/assets/products/galletas_2.jpg',
    }
  ],
  bestSellers: [
    {
      id: '1',
      rating: 4,
      price: 19990,
      isBestSeller: true,
      category: 'Culinary',
      name: 'Galletas artesanales',
      image: '/assets/products/galletas.jpeg',
    },
    {
      id: '2',
      rating: 5,
      price: 14990,
      isBestSeller: true,
      category: 'Culinary',
      name: 'Galletas de vainilla',
      image: '/assets/products/galletas_2.jpg',
    }
  ]
}

export const features: FeatureItem[] = [
  {
    title: '¡Novedad para ti!',
    icon: '/assets/features/novedad.png',
    description: 'Descubre los últimos productos',
  },
  {
    icon: '/assets/features/emprendedor.png',
    title: 'Emprendedores',
    description: 'Por nuestros emprendedores',
  },
  {
    title: 'Más vendidos',
    icon: '/assets/features/mas-vendidos.png',
    description: 'Los favoritos de nuestros clientes',
  },
  {
    title: 'Garantía',
    icon: '/assets/features/garantia.png',
    description: '30 días de garantía en productos seleccionados',
  },
]


export const navItems: NavItemProps[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />
  },
  {
    href: '/login',
    label: 'Iniciar sesión',
    icon: <LogIn className="w-5 h-5" />
  },
  {
    href: '/products',
    label: 'Carrito',
    icon: <ShoppingCart className="w-5 h-5" />
  }
]