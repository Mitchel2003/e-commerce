import { Popover, PopoverContent, PopoverTrigger } from '#/ui/popover'
import { FormField, FormItem, FormControl } from '#/ui/form'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import { Calendar } from '#/ui/calendar'
import { Button } from '#/ui/button'
import { Input } from '#/ui/input'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { ControlProps } from '@/interfaces/form.interface'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface DateFieldProps extends ControlProps, ThemeContextProps {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

/**
 * Is a component that allows to select a date.
 * @param {DateFieldProps} props - The properties of the component.
 * @param {string} props.name - The attribute name of define the FormField component.
 * @param {string} props.label - Is the label of the component.
 * @param {Control<any>} props.control - To use the form control in the field.
 * @param {string} props.placeholder - Is the placeholder of the component.
 * @param {string} props.theme - Is the theme of the component.
 * @param {string} props.value - The value of the date field.
 * @param {boolean} props.readOnly - Whether the date field is read-only.
 */
const DateField = ({ name, label, control, placeholder, theme, value, readOnly }: DateFieldProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {/* -------------------- Header label -------------------- */}
          <HeaderCustom
            to='input'
            theme={theme}
            title={label}
            htmlFor={`${name}-date`}
          />

          {readOnly ? (
            <Input
              id={`${name}-date`}
              value={value}
              readOnly
              className={cn(
                'w-full',
                theme === 'dark'
                  ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                  : 'bg-gray-100 border-gray-300 text-gray-900'
              )}
            />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id={`${name}-date`}
                    variant={"outline"}
                    className={cn(
                      'w-full pl-3 font-normal',
                      !field.value && 'text-muted-foreground',
                      theme === 'dark'
                        ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
                        : 'bg-white border-gray-300 hover:bg-white'
                    )}
                  >
                    {field.value
                      ? (format(field.value, "PPP"))
                      : (<span>{placeholder}</span>)
                    }
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </FormItem>
      )}
    />
  )
}

export default DateField