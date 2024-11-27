import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "#/ui/dropdown-menu"
import { ActionProps } from "@/interfaces/hook.interface"
import { MoreHorizontal } from "lucide-react"
import { Button } from "#/ui/button"
import { cn } from "@/lib/utils"
import React from "react"

interface ItemDropdownProps {
  align?: "start" | "end" | "center"
  triggerClassName?: string
  contentClassName?: string
  menuLabel?: string
  actions: ActionProps[]
}

const ItemDropdown = React.forwardRef<HTMLButtonElement, ItemDropdownProps>(({
  menuLabel = "Acciones",
  triggerClassName,
  contentClassName,
  align = "end",
  actions
}, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          className={cn("h-8 w-8 p-0", triggerClassName)}
        >
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className={cn("w-[160px]", contentClassName)}
      >
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={`${action.label}-${index}`}
            onClick={action.onClick}
            className={cn(
              "flex items-center cursor-pointer",
              action.className
            )}
          >
            {React.createElement(action.icon, {
              className: "mr-2 h-4 w-4"
            })}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ItemDropdown.displayName = "ItemDropdown"

export default ItemDropdown
