import { ThemeContextProps } from "@/interfaces/context.interface"
import { LucideIcon } from "lucide-react"

/*--------------------------------------------------Component Props--------------------------------------------------*/
//interface defautl props
export interface Props { children?: React.ReactNode }

//theme components
export interface LoginComponentsProps extends ThemeContextProps { }

/*---------------------- ui components ----------------------*/
// items actions to dropdown (data-table)
export interface ActionProps {
  label: string
  icon: LucideIcon
  className?: string
  onClick: () => void | Promise<void>
}

// features to discover section
export interface FeatureDiscoverProps {
  icon: React.ForwardRefExoticComponent<any>
  description: string,
  title: string,
  tag: string
}

/*---------------------- Reusables ----------------------*/
// HeaderForm
export interface HeaderBreadcrumbProps { description: string }

// HeaderCustom
export interface HeaderSpanProps {
  iconSpan?: 'info' | 'warn' | 'alert' | 'none'
  span?: string
}

// StatusCheck
export interface CheckProps { name: string, label: string, color: string }

// Carousel
/** @description permite crear un carousel de imagenes con un intervalo de tiempo */
export interface CarouselProps { children: React.ReactNode, autoPlay?: boolean, interval?: number }
export interface CarouselContext {
  index: number
  setIndex: (index: number) => void
  next: () => void
  prev: () => void
}

// Sidebar
export interface NavItemProps {
  action?: () => Promise<void>
  subItems?: NavItemProps[]
  icon: React.ReactNode
  label: string
  href?: string
}

// Dialog
export interface DialogField { name: string, component: React.ReactElement }