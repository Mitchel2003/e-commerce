import { DataTableViewOptions } from "./data-table-view-options"
import { Table } from "@tanstack/react-table"
import { Button } from "#/ui/button"
import { Input } from "#/ui/input"
import { X } from "lucide-react"

interface DataTableToolbarProps<TData> { table: Table<TData>; filterColumn?: string }
export function DataTableToolbar<TData>({ table, filterColumn }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterColumn && (
          <Input
            className="h-8 w-[150px] lg:w-[250px]"
            placeholder={`Filtrar ${filterColumn}...`}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Resetear
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
} 