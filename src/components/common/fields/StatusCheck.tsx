import { HeaderSpanProps, CheckProps } from '@/interfaces/props.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from '#/common/elements/HeaderCustom'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

interface StatusCheckProps extends HeaderSpanProps, ThemeContextProps {
  options: CheckProps[]
  label: string
  name: string
}

const StatusCheck = React.forwardRef<HTMLDivElement, StatusCheckProps>(({
  iconSpan = 'none',
  options,
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
        <FormItem>
          {/* Header */}
          <HeaderCustom
            to='component'
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
          />

          <FormControl>
            <div ref={ref} className="flex flex-row gap-4">
              {options.map((option) => (
                <StatusButton
                  key={option.name}
                  theme={theme}
                  option={option}
                  isSelected={field.value === option.name}
                  onClick={() => field.onChange(option.name)}
                />
              ))}
            </div>
          </FormControl>

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

StatusCheck.displayName = 'StatusCheck'

export default StatusCheck

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface StatusButtonProps extends ThemeContextProps {
  option: CheckProps
  isSelected: boolean
  onClick: () => void
}

const StatusButton = ({ theme, option, isSelected, onClick }: StatusButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full p-4 px-8 rounded-lg items-center justify-center',
      'transition-all duration-200 ease-in-out',
      'hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2',
      `focus:ring-${option.color}-500`,
      theme === 'dark' ? 'text-white' : 'text-gray-800',
      !isSelected
        ? (theme === 'dark' ? `bg-zinc-700` : `bg-gray-100`)
        : (theme === 'dark' ? `bg-${option.color}-600` : `bg-${option.color}-400`)
    )}
  >
    <Check className={cn(
      'w-6 h-6 mr-2',
      isSelected ? 'block' : 'hidden'
    )} />
    {option.label}
  </button>
)