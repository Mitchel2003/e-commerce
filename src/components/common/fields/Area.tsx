import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from '@/components/common/elements/HeaderCustom'
import { Textarea } from '#/ui/textarea'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import React from 'react'

interface AreaFieldProps extends HeaderSpanProps, ThemeContextProps {
  name: string
  label?: string
  className?: string
  placeholder?: string
}

const AreaField = React.forwardRef<HTMLTextAreaElement, AreaFieldProps>(({
  theme,
  name,
  label,
  className,
  placeholder,
  iconSpan = 'none',
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
            htmlFor={`${name}-area`}
          />

          <FormControl>
            <Textarea
              {...field}
              ref={ref}
              id={`${name}-area`}
              placeholder={placeholder}
              className={cn(
                'min-h-[100px] resize-none',
                className,
                theme === 'dark'
                  ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
                  : 'bg-white border-gray-300 text-gray-900'
              )}
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

AreaField.displayName = 'AreaField'

export default AreaField