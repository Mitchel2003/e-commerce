import { ThemeContextProps } from "@/interfaces/context.interface"
/*--------------------------------------------------Component Props--------------------------------------------------*/
//interface defautl props
export interface Props { children?: React.ReactNode }

//sidebar
export interface NavItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  subItems?: NavItemProps[]
  action?: () => Promise<void>
}

//theme components
export interface LoginComponentsProps extends ThemeContextProps { }
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------Component ui--------------------------------------------------*/
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

// Dialog
export interface DialogField { name: string, component: React.ReactElement }