import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "#/ui/tooltip"
import { Button } from "#/ui/button"

import { NavItemProps } from "@/interfaces/props.interface"
import { Link, useLocation } from 'react-router-dom'

interface ItemSidebarProps {
  item: NavItemProps
  isCollapsed: boolean
  depth?: number
}

const ItemSidebar = ({ item, isCollapsed, depth = 0 }: ItemSidebarProps) => {
  const location = useLocation()
  const isActive = location.pathname === item.href

  const content = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start ${depth > 0 ? 'pl-8' : ''}`}
    >
      {item.icon}
      {!isCollapsed && <span className="ml-2">{item.label}</span>}
    </Button>
  )

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={item.href}>
              {isCollapsed ? content : <div className="w-full">{content}</div>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      {item.subItems && !isCollapsed && (
        <div className="ml-4">
          {item.subItems.map(subItem => (
            <ItemSidebar
              key={subItem.href}
              item={subItem}
              isCollapsed={isCollapsed}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ItemSidebar