import { FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import { Textarea } from '#/ui/textarea'

import { HeaderSpanProps } from '@/interfaces/props.interface'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface AreaFieldProps extends HeaderSpanProps {
  name: string
  label?: string
  theme: 'dark' | 'light'
  className?: string
  placeholder?: string
}

const AreaField = ({
  theme,
  name,
  label,
  className,
  placeholder,
  iconSpan = 'none',
  span
}: AreaFieldProps) => {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
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
            'min-h-[100px] resize-none',
            className,
            theme === 'dark'
              ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
              : 'bg-white border-gray-300 text-gray-900',
            error && 'border-red-500'
          )}
          {...register(name)}
        />
      </FormControl>

      {error && <FormMessage>{error.message as string}</FormMessage>}
    </FormItem>
  )
}

export default AreaField