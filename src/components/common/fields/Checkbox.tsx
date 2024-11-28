import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from '#/common/elements/HeaderCustom'
import { Checkbox } from '#/ui/checkbox'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import React from 'react'

interface CheckboxFieldProps extends HeaderSpanProps, ThemeContextProps {
  name: string
  label?: string
  description?: string
  className?: string
  options?: string[]
  isMultiple?: boolean
}

const CheckboxField = React.forwardRef<HTMLButtonElement, CheckboxFieldProps>(({
  theme,
  name,
  label,
  className,
  description,
  options = [],
  isMultiple = false,
  iconSpan = 'none',
  span
}, ref) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {/* -------------------- Header label -------------------- */}
          {label && (
            <HeaderCustom
              to="input"
              theme={theme}
              title={label}
              span={span}
              iconSpan={iconSpan}
              htmlFor={`${name}-checkbox`}
            />
          )}

          <FormControl>
            {options.length > 0 ? (
              /* -------------------- Multiple checkboxes -------------------- */
              <div className="flex flex-wrap gap-4 pt-2">
                {options.map((option, index) => (
                  <CheckboxOption
                    ref={ref}
                    key={index}
                    id={`${name}-${index}`}
                    theme={theme}
                    label={option}
                    checked={isMultiple
                      ? field.value?.includes(option)
                      : field.value === option
                    }
                    onChecked={(checked) => {
                      if (isMultiple) {
                        const currentValue = field.value || []
                        field.onChange(checked
                          ? [...currentValue, option]
                          : currentValue.filter((value: string) => value !== option)
                        )
                      } else {
                        field.onChange(checked ? option : null)
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              /* -------------------- Single checkbox -------------------- */
              <div className="flex justify-center">
                <CheckboxOption
                  ref={ref}
                  id={name}
                  theme={theme}
                  label={description || ''}
                  checked={field.value}
                  onChecked={field.onChange}
                />
              </div>
            )}
          </FormControl>

          {/* -------------------- Error message -------------------- */}
          {error && (
            <FormMessage className={cn(
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            )}>
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
})

CheckboxField.displayName = 'CheckboxField'

export default CheckboxField

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface CheckboxOptionProps extends ThemeContextProps {
  id: string
  label: string
  checked?: boolean
  onChecked: (checked: boolean) => void
}

const CheckboxOption = React.forwardRef<HTMLButtonElement, CheckboxOptionProps>(({
  id,
  theme,
  label,
  checked,
  onChecked
}, ref) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      id={id}
      ref={ref}
      checked={checked}
      onCheckedChange={onChecked}
      className={cn(
        theme === 'dark'
          ? 'border-zinc-600 data-[state=checked]:bg-zinc-700'
          : 'border-gray-300 data-[state=checked]:bg-purple-600'
      )}
    />
    <label
      htmlFor={id}
      className={cn(
        'text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'
      )}
    >
      {label}
    </label>
  </div>
))

CheckboxOption.displayName = 'CheckboxOption'