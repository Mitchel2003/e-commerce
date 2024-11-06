import { FormItem, FormControl } from '#/ui/form'
import { Card, CardContent } from '#/ui/card'
import { Button } from '#/ui/button'

import { CardFieldProps, ControlProps } from '@/interfaces/form.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { useFieldArray } from 'react-hook-form'
import { PlusCircle, X } from 'lucide-react'
import { cloneElement } from 'react'
import { cn } from '@/lib/utils'

interface CardIterableFieldProps extends ThemeContextProps, ControlProps {
  name: string;
  fields: CardFieldProps[];
  titleButton?: string;
  limit?: number;
}

const CardIterable = ({
  theme,
  name,
  fields,
  control,
  limit = 1,
  titleButton = 'Agregar'
}: CardIterableFieldProps) => {

  const { fields: items, append, remove } = useFieldArray({ control, name })

  const handleAppend = () => {
    const initialValue = {} as Record<string, string>
    const newItem = fields.reduce((acc, field) => { acc[field.name] = ''; return acc }, initialValue)
    append(newItem)
  }
  return (
    <>
      {/* -------------------- Button add card -------------------- */}
      {items.length !== limit && (
        <Button
          size="sm"
          type="button"
          variant="outline"
          onClick={handleAppend}
          className={cn(
            'flex text-sm h-[5vh]',
            theme === 'dark'
              ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
              : 'bg-white border-gray-300 text-gray-900'
          )}
        >
          {titleButton}
          <PlusCircle
            className={cn(
              'ml-2 h-auto w-auto md:h-[3vh] md:w-[3vw]',
              theme === 'dark'
                ? 'text-gray-300'
                : 'text-zinc-600'
            )}
          />
        </Button>
      )}

      {/* -------------------- Card -------------------- */}
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
          {/* -------------------- Button delete card -------------------- */}
          <Button
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => remove(index)}
            className={cn(
              'absolute top-2 right-2',
              theme === 'dark'
                ? 'text-zinc-300'
                : 'text-gray-800'
            )}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* -------------------- Component input -------------------- */}
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-2">
              {fields.map((field, index) => (
                <FormItem key={`${name}-${index}`}>
                  <FormControl>
                    {cloneElement(field.component)}
                  </FormControl>
                </FormItem>
              ))}
            </div>
          </CardContent>

        </Card>
      ))}
    </>
  )
}

export default CardIterable