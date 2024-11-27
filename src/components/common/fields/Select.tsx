import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/ui/select"
import { FormField, FormItem, FormControl, FormMessage } from "#/ui/form"
import HeaderCustom from "@/components/common/elements/HeaderCustom"

import { ThemeContextProps } from "@/interfaces/context.interface"
import { HeaderSpanProps } from "@/interfaces/props.interface"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import React from "react"

interface SelectFieldProps extends HeaderSpanProps, ThemeContextProps {
  name: string
  label?: string
  options: string[]
  className?: string
  placeholder?: string
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(({
  theme,
  name,
  label,
  options,
  className,
  placeholder,
  iconSpan,
  span
}, ref) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <HeaderCustom
            to='input'
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
            className={className}
            htmlFor={`${name}-select`}
          />

          <FormControl>
            <SelectWrapper
              {...field}
              ref={ref}
              id={`${name}-select`}
              theme={theme}
              options={options}
              placeholder={placeholder}
            />
          </FormControl>

          {error && (
            <FormMessage className={cn(theme === 'dark' ? 'text-red-400' : 'text-red-600')}>
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
})

SelectField.displayName = 'SelectField'

export default SelectField

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface SelectWrapperProps extends ThemeContextProps {
  id: string
  value: string
  options: string[]
  placeholder?: string
  onChange: (value: string) => void
}

const SelectWrapper = React.forwardRef<HTMLButtonElement, SelectWrapperProps>(
  ({ id, theme, options, placeholder, value, onChange }, ref) => (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        id={id}
        ref={ref}
        className={cn(
          theme === 'dark'
            ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-100'
        )}
      >
        <SelectValue
          placeholder={placeholder}
          className={cn(
            theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
          )}
        />
      </SelectTrigger>

      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            key={`${option}-${index}`}
            value={option}
            className={cn(
              theme === 'dark'
                ? 'text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700'
                : 'text-gray-900 hover:bg-gray-100 focus:bg-gray-100'
            )}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
)

SelectWrapper.displayName = 'SelectWrapper'