import { FormField, FormItem, FormControl } from '#/ui/form'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import { Textarea } from '#/ui/textarea'

import { ControlProps, HeaderSpanProps } from '@/interfaces/form.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { cn } from '@/lib/utils'

interface AreaFieldProps extends ControlProps, ThemeContextProps, HeaderSpanProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const AreaField = ({
  theme,
  name,
  label,
  control,
  placeholder,
  iconSpan,
  span
}: AreaFieldProps) => {

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {/* Header */}
          <HeaderCustom
            to='input'
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
            htmlFor={`${name}-area`}
          />

          {/* Input text area */}
          <FormControl>
            <Textarea
              id={`${name}-area`}
              placeholder={placeholder}
              className={cn(
                'min-h-[100px]',
                theme === 'dark'
                  ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                  : 'bg-white border-gray-300'
              )}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default AreaField