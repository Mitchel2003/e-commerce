import { ThemeContextProps } from '@/interfaces/context.interface'
import { Props } from "@/interfaces/props.interface"
import SidebarItem from '#/sidebar/ItemSidebar'
import { Button } from '#/ui/button'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '#/ui/dropdown-menu'
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollArea } from '#/ui/scroll-area'

import { navItems } from '@/utils/constants'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const Sidebar = ({ theme }: ThemeContextProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownTrigger theme={theme} isOpen={isOpen} setIsOpen={setIsOpen} />

      <DropdownContent isCollapsed={isCollapsed} >
        <AsideArea theme={theme}>
          <Items isCollapsed={isCollapsed} />
          <ButtonCollapse isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </AsideArea>
      </DropdownContent>
    </DropdownMenu >
  )
}

export default Sidebar

/** DropdownTrigger: trigger action of the dropdown */
interface DropdownTriggerProps { theme: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }
const DropdownTrigger = ({ theme, isOpen, setIsOpen }: DropdownTriggerProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        className={cn(
          '[&_svg]:size-6',
          'h-9 w-9 md:h-10 md:w-10',
          'transition-colors duration-300',
          theme === 'dark'
            ? ' hover:bg-zinc-700/40 border-zinc-700'
            : ' hover:bg-gray-200/40 border-gray-600'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-10 w-10 md:h-12 md:w-12" />
      </Button>
    </DropdownMenuTrigger>
  )
}

/** DropdownContent: content of the dropdown */
interface DropdownContentProps extends Props { isCollapsed: boolean }
const DropdownContent = ({ children, isCollapsed }: DropdownContentProps) => {
  return (
    <DropdownMenuContent
      align="end"
      className={cn(
        'absolute p-0 w-64',
        'h-[calc(100vh-4rem)]',
        'right-[calc(100vh-900px)] md:right-[calc(100vh-705px)]',
        isCollapsed && 'w-16'
      )}
    >
      {children}
    </DropdownMenuContent>
  )
}

/** AsideArea: area of the sidebar */
interface AsideAreaProps extends Props, ThemeContextProps { }
const AsideArea = ({ children, theme }: AsideAreaProps) => {
  return (
    <aside
      className={cn(
        'h-full transition-all',
        'bg-background border-l duration-300 ease-in-out',
        theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
      )}
    >
      {children}
    </aside>
  )
}

/** Items: items of the sidebar */
interface ItemsProps { isCollapsed: boolean }
const Items = ({ isCollapsed }: ItemsProps) => {
  return (
    <ScrollArea className="h-full px-3 py-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <SidebarItem
            isCollapsed={isCollapsed}
            key={item.href}
            item={item}
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
      className={cn(
        'hidden md:block absolute bottom-4 transform',
        'bg-background border border-input',
        'left-1/2 -translate-x-1/2'
      )}
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      {isCollapsed
        ? (<ChevronLeft className="h-4 w-4" />)
        : (<ChevronRight className="h-4 w-4" />)
      }
    </Button>
  )
}