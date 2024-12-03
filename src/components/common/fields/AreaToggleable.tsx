import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '#/ui/form'
import HeaderCustom from '#/common/elements/HeaderCustom'
import { Checkbox } from '#/ui/checkbox'
import { Textarea } from '#/ui/textarea'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import React from 'react'

interface AreaToggleableProps extends HeaderSpanProps, ThemeContextProps {
  placeholder?: string
  inputLabel?: string
  className?: string
  label: string
  name: string
}

const AreaToggleable = React.forwardRef<HTMLTextAreaElement, AreaToggleableProps>(({
  placeholder = 'Describa los detalles',
  inputLabel = 'Detalles',
  iconSpan = 'none',
  className,
  label,
  theme,
  name,
  span
}, ref) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <div className="flex space-x-2 items-center mt-2">
              <HeaderCustom
                to="input"
                theme={theme}
                title={label}
                span={span}
                iconSpan={iconSpan}
                htmlFor={`${name}-checkbox`}
              />

              <Checkbox
                id={`${name}-checkbox`}
                name={`${name}-checkbox`}
                checked={field.value?.checked || false}
                onCheckedChange={(checked) => {
                  field.onChange({
                    checked,
                    details: checked ? field.value?.details || '' : ''
                  })
                }}
              />
            </div>
          </FormControl>

          {field.value?.checked && (
            <FormControl>
              <div className="space-y-2">
                <FormLabel htmlFor={`${name}-textarea`} className="font-medium text-sm">
                  {inputLabel}
                </FormLabel>

                <Textarea
                  ref={ref}
                  id={`${name}-textarea`}
                  placeholder={placeholder}
                  value={field.value.details || ''}
                  onChange={(e) => field.onChange({ ...field.value, details: e.target.value })}
                  className={cn(
                    className ?? 'min-h-[95px]',
                    theme === 'dark'
                      ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
                      : 'bg-white border-gray-300 text-gray-900'
                  )}
                />
              </div>
            </FormControl>
          )}

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

AreaToggleable.displayName = 'AreaToggleable'

export default AreaToggleable