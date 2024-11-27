import { NavItemProps } from "@/interfaces/props.interface"
import { FeatureItem } from "@/types/product.type"
import { useAuthContext } from '@/context/AuthContext'
import {
  LucideHandHelping,
  LocateFixedIcon,
  TerminalSquare,
  FileStackIcon,
  BookUserIcon,
  FileTextIcon,
  PlusCircle,
  UserCircle,
  FilesIcon,
  Building2,
  UserPlus,
  UserCog2,
  FilePlus,
  Building,
  MapPin,
  LogOut,
  LogIn,
  Info,
  Flag,
  Home,
  Map
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

export const heroItems = [
  {
    image: 'assets/adds/parqueOca.jpg',
    title: 'Bienvenido a nuestro app de gestión',
    description: 'Descubre una experiencia de administración única',
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

export const useNavItems = () => {
  const { logout } = useAuthContext()

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
      label: 'Currículums',
      icon: <FilesIcon className="w-6 h-6" />,
      subItems: [
        {
          href: '/form/cvs',
          label: 'Ver todos',
          icon: <FileTextIcon className="w-5 h-5" />
        },
        {
          href: '/form/cv/new',
          label: 'Crear curriculum',
          icon: <FilePlus className="w-5 h-5" />
        }
      ]
    },
    {
      label: 'Mantenimientos',
      icon: <FileTextIcon className="w-6 h-6" />,
      subItems: [
        {
          href: '/form/maintenances',
          label: 'Ver todos',
          icon: <FileTextIcon className="w-5 h-5" />
        },
        {
          href: '/form/maintenance/new',
          label: 'Crear mantenimiento',
          icon: <FilePlus className="w-5 h-5" />
        }
      ]
    },
    {
      label: 'Usuarios',
      icon: <UserCircle className="w-6 h-6" />,
      subItems: [
        {
          label: 'Ingenieros',
          icon: <UserCog2 className="w-5 h-5" />,
          subItems: [
            {
              href: '/users',
              label: 'Ver ingenieros',
              icon: <BookUserIcon className="w-5 h-5" />
            },
            {
              href: '/user/new',
              label: 'Nuevo ingeniero',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        },
        {
          label: 'Clientes',
          icon: <Building2 className="w-6 h-6" />,
          subItems: [
            {
              href: '/clients',
              label: 'Ver clientes',
              icon: <FileTextIcon className="w-5 h-5" />
            },
            {
              href: '/client/new',
              label: 'Nuevo cliente',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        }
      ]
    },
    {
      label: 'Institución',
      icon: <Building className="w-6 h-6" />,
      subItems: [
        {
          label: 'Sedes',
          icon: <FileStackIcon className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver sedes',
              href: '/location/headquarters',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear sede',
              href: '/location/headquarter/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        },
        {
          label: 'Areas',
          icon: <FileStackIcon className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver areas',
              href: '/location/areas',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear area',
              href: '/location/area/new',
              icon: <PlusCircle className="w-5 h-5" />
            },
          ]
        },
        {
          label: 'Consultorios',
          icon: <Building2 className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver consultorios',
              href: '/location/offices',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear consultorio',
              href: '/location/office/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        },
        {
          label: 'Servicios',
          icon: <LucideHandHelping className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver servicios',
              href: '/location/services',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear servicio',
              href: '/location/service/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        }
      ]
    },
    {
      label: 'Ubicaciones',
      icon: <MapPin className="w-6 h-6" />,
      subItems: [
        {
          label: 'Ciudades',
          icon: <LocateFixedIcon className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver ciudades',
              href: '/location/cities',
              icon: <Map className="w-5 h-5" />
            },
            {
              label: 'Crear nueva ciudad',
              href: '/location/city/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        },
        {
          label: 'Departamentos',
          icon: <MapPin className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver departamentos',
              href: '/location/departments',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear nuevo departamento',
              href: '/location/department/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        },
        {
          label: 'Países',
          icon: <Flag className="w-5 h-5" />,
          subItems: [
            {
              label: 'Ver países',
              href: '/location/countries',
              icon: <FileStackIcon className="w-5 h-5" />
            },
            {
              label: 'Crear nuevo país',
              href: '/location/country/new',
              icon: <PlusCircle className="w-5 h-5" />
            }
          ]
        }
      ]
    },
    {
      action: logout,
      label: 'Cerrar sesión',
      icon: <LogOut className="w-6 h-6" />,
    }
  ]

  return { navUserItems, navGuestItems }
}