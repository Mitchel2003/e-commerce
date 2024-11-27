import { ThemeContextProps } from '@/interfaces/context.interface'
import { CardFieldProps } from '@/interfaces/props.interface'

import { FormField, FormItem, FormControl } from '#/ui/form'
import { Card, CardContent } from '#/ui/card'
import { Button } from '#/ui/button'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { PlusCircle, X } from 'lucide-react'
import { cloneElement } from 'react'
import { cn } from '@/lib/utils'

interface CardIterableFieldProps extends ThemeContextProps {
  fields: CardFieldProps[]
  titleButton?: string
  limit?: number
  name: string
}

const CardIterable = ({
  theme,
  name,
  fields,
  limit = 1,
  titleButton = 'Agregar'
}: CardIterableFieldProps) => {
  const { control } = useFormContext()
  const { fields: items, append, remove } = useFieldArray({ control, name })

  const handleAppend = () => {
    const initialValue = fields.reduce((acc, field) => {
      const fieldName = field.name.split('.').pop() || field.name
      acc[fieldName] = ''
      return acc
    }, {} as Record<string, any>)
    append(initialValue)
  }

  return (
    <div className="space-y-4">
      {/* -------------------- Button add card -------------------- */}
      {items.length < limit && (
        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={handleAppend}
          className={cn(
            'flex text-sm h-[5vh]',
            theme === 'dark'
              ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
              : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100'
          )}
        >
          {titleButton}
          <PlusCircle className={cn(
            'ml-2 h-4 w-4',
            theme === 'dark' ? 'text-gray-300' : 'text-zinc-600'
          )} />
        </Button>
      )}

      {/* -------------------- Cards -------------------- */}
      {items.map((item, index) => (
        <Card
          key={item.id}
          className={cn(
            'relative',
            theme === 'dark'
              ? 'bg-zinc-900 border-zinc-700'
              : 'bg-white border-gray-300'
          )}
        >
          {/* -------------------- Delete button -------------------- */}
          <Button
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className={cn(
              'absolute top-2 right-2',
              theme === 'dark'
                ? 'text-zinc-300 hover:text-zinc-100'
                : 'text-gray-800 hover:text-gray-600'
            )}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* -------------------- Form fields -------------------- */}
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-4">
              {fields.map((field) => {
                const fieldName = field.name.split('.').pop() || field.name
                return (
                  <FormField
                    control={control}
                    key={`${name}.${index}.${fieldName}`}
                    name={`${name}.${index}.${fieldName}`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormControl>
                          {cloneElement(field.component, {
                            theme,
                            ...formField,
                            name: `${name}.${index}.${fieldName}`
                          })}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CardIterable