import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "#/ui/tooltip"
import { NavItemProps } from "@/interfaces/props.interface"
import { Button } from "#/ui/button"

interface ItemActionProps {
  setIsOpen: (isOpen: boolean) => void
  isCollapsed: boolean
  item: NavItemProps
  isOpen: boolean
  depth?: number
}

const ItemAction = ({ item, isCollapsed, depth = 0, isOpen, setIsOpen }: ItemActionProps) => {
  const handleAction = async (e: React.MouseEvent) => { e.preventDefault(); if (item.action) await item.action() }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Show item collapsable */}
          <div className="w-full" onClick={() => setIsOpen(!isOpen)}>
            <Content item={item} isCollapsed={isCollapsed} depth={depth} handler={handleAction} />
          </div>
        </TooltipTrigger>

        {isCollapsed && (
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default ItemAction
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface ContentProps extends Pick<ItemActionProps, 'item' | 'isCollapsed' | 'depth'> { handler: (e: React.MouseEvent) => Promise<void> }
const Content = ({ handler, item, isCollapsed, depth = 0 }: ContentProps) => (
  <Button
    variant="ghost"
    onClick={handler}
    className={`w-full justify-start ${depth > 0 ? 'pl-8' : ''}`}
  >
    {item.icon}
    {!isCollapsed && <span className="ml-2">{item.label}</span>}
  </Button>
)