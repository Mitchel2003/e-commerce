import { TerminalSquare, UserRound, UserPlus, LogOut, LogIn, Info, Home } from 'lucide-react'
import { NavItemProps } from "@/interfaces/props.interface"
import { useAuthContext } from '@/context/AuthContext'

export const heroItems = [
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
    description: 'Descubre una experiencia de comercio única, con productos originales, creados en nuestra región',
  }
]

export const useNavItems = () => {
  const { signout, user } = useAuthContext()

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
      href: '/about-us',
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
      href: `/dashboard/profile/${user?.uid}`,
      label: 'Editar perfil',
      icon: <UserRound className="w-6 h-6" />
    },
    {
      action: signout,
      label: 'Cerrar sesión',
      icon: <LogOut className="w-6 h-6" />,
    }
  ]

  return { navUserItems, navGuestItems }
}