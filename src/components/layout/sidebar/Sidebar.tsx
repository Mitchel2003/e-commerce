import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '#/ui/dropdown-menu'
import { NavItemProps, Props } from '@/interfaces/props.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import SidebarItem from './ItemSidebar'
import { Button } from '#/ui/button'

import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavItems } from '@/utils/constants'
import { ScrollArea } from '#/ui/scroll-area'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SidebarProps extends ThemeContextProps { isAuth: boolean }
const Sidebar = ({ theme, isAuth }: SidebarProps) => {
  const { navUserItems, navGuestItems } = useNavItems()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      {/* Trigger */}
      <DropdownTrigger theme={theme} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <DropdownContent isCollapsed={isCollapsed} >
        <AsideArea theme={theme}>
          <Items
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isCollapsed={isCollapsed}
            items={isAuth ? navUserItems : navGuestItems}
          />
          <ButtonCollapse isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </AsideArea>
      </DropdownContent>
    </DropdownMenu >
  )
}

export default Sidebar
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
/** Items: this component render the items of the sidebar */
interface ItemsProps { isOpen: boolean, isCollapsed: boolean, items: NavItemProps[], setIsOpen: (isOpen: boolean) => void }
const Items = ({ items, isCollapsed, isOpen, setIsOpen }: ItemsProps) => {
  return (
    <ScrollArea className="h-full px-3 py-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <SidebarItem
            item={item}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isCollapsed={isCollapsed}
            key={item.href || item.label}
          />
        ))}
      </nav>
    </ScrollArea>
  )
}

/** ButtonCollapse: button to collapse the sidebar */
interface ButtonCollapseProps { isCollapsed: boolean, setIsCollapsed: (isCollapsed: boolean) => void }
const ButtonCollapse = ({ isCollapsed, setIsCollapsed }: ButtonCollapseProps) => {
  return (
    <Button
      variant="ghost"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={cn(
        'hidden md:block absolute bottom-4 transform',
        'bg-background border border-input',
        'left-1/2 -translate-x-1/2'
      )}
    >
      {isCollapsed
        ? (<ChevronLeft className="h-4 w-4" />)
        : (<ChevronRight className="h-4 w-4" />)
      }
    </Button>
  )
}

/** AsideArea: area of the sidebar */
interface AsideAreaProps extends Props, ThemeContextProps { }
const AsideArea = ({ children, theme }: AsideAreaProps) => {
  return (
    <aside className={cn(
      'h-full transition-all',
      'bg-background border-l duration-300 ease-in-out',
      theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
    )}>
      {children}
    </aside>
  )
}

/** DropdownContent: content of the dropdown */
interface DropdownContentProps extends Props { isCollapsed: boolean }
const DropdownContent = ({ children, isCollapsed }: DropdownContentProps) => {
  return (

    <DropdownMenuContent align="end" className={cn(
      'absolute p-0 w-64',
      'h-[calc(100vh-4rem)]',
      'right-[calc(100%-25px)]',
      isCollapsed && 'w-16'
    )}>
      {children}
    </DropdownMenuContent>
  )
}

/** DropdownTrigger: trigger action of the dropdown */
interface DropdownTriggerProps { theme: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }
const DropdownTrigger = ({ theme, isOpen, setIsOpen }: DropdownTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          '[&_svg]:size-6',
          'h-9 w-9 md:h-10 md:w-10',
          'transition-colors duration-300',
          theme === 'dark'
            ? ' hover:bg-zinc-700/40 border-zinc-700'
            : ' hover:bg-gray-200/40 border-gray-600'
        )}
      >
        <Menu className="h-10 w-10 md:h-12 md:w-12" />
      </Button>
    </DropdownMenuTrigger>
  )
}