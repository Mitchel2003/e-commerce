import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "#/ui/tooltip"
import { NavItemProps } from "@/interfaces/props.interface"
import { Link, useLocation } from 'react-router-dom'
import ItemAction from './ItemAction'
import { Button } from "#/ui/button"

interface ItemSidebarProps {
  setIsOpen: (isOpen: boolean) => void
  isCollapsed: boolean
  item: NavItemProps
  isOpen: boolean
  depth?: number
}

const ItemSidebar = ({ item, isCollapsed, depth = 0, isOpen, setIsOpen }: ItemSidebarProps) => {
  if (item.action) return (
    <ItemAction
      item={item}
      depth={depth}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isCollapsed={isCollapsed}
    />
  )
  const isActive = useLocation().pathname === item.href

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          {/* Show item collapsable */}
          <TooltipTrigger asChild>
            <Link to={item.href ?? '#'} onClick={() => setIsOpen(!isOpen)}>
              <div className="w-full">
                <Content item={item} isCollapsed={isCollapsed} depth={depth} isActive={isActive} />
              </div>
            </Link>
          </TooltipTrigger>

          {isCollapsed && (
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider >
      {
        item.subItems && !isCollapsed && (
          <div className="ml-4">
            {item.subItems.map(subItem => (
              <ItemSidebar
                item={subItem}
                isOpen={isOpen}
                key={subItem.href}
                setIsOpen={setIsOpen}
                isCollapsed={isCollapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        )
      }
    </>
  )
}

export default ItemSidebar
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface ContentProps extends Pick<ItemSidebarProps, 'depth' | 'item' | 'isCollapsed'> { isActive: boolean }
const Content = ({ isActive, item, isCollapsed, depth = 0 }: ContentProps) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={`w-full justify-start ${depth > 0 ? 'pl-8' : ''}`}
  >
    {item.icon}
    {!isCollapsed && <span className="ml-2">{item.label}</span>}
  </Button>
)