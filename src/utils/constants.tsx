import { NavItemProps } from "@/interfaces/props.interface"
import { useAuthContext } from '@/context/AuthContext'
import {
  TerminalSquare,
  UserPlus,
  LogOut,
  LogIn,
  Info,
  Home,
} from 'lucide-react'

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
  ]
}

export const heroItems = [
  {
    image: 'assets/adds/parqueOca.jpg',
    title: 'Bienvenido a nuestro app',
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

export const useNavItems = () => {
  const { signout } = useAuthContext()

  const navGuestItems: NavItemProps[] = [
    {
      href: '/',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      href: '/auth/login',
      label: 'Iniciar sesión',
      icon: <LogIn className="w-5 h-5" />
    },
    {
      href: '/auth/register',
      label: 'Registrarse',
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      href: '/about',
      label: 'Acerca de nosotros',
      icon: <Info className="w-5 h-5" />
    }
  ]

  const navUserItems: NavItemProps[] = [
    {
      href: '/dashboard',
      label: 'Panel del usuario',
      icon: <TerminalSquare className="w-6 h-6" />
    },
    {
      action: signout,
      label: 'Cerrar sesión',
      icon: <LogOut className="w-6 h-6" />,
    }
  ]

  return { navUserItems, navGuestItems }
}