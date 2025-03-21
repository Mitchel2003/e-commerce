import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from "@/components/common/elements/HeaderCustom"
import { Input } from '#/ui/input'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface InputFieldProps extends HeaderSpanProps, ThemeContextProps {
  type?: 'text' | 'number' | 'email' | 'password'
  label: string
  name: string
  icon?: LucideIcon
  placeholder?: string
  autoComplete?: boolean
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({
  autoComplete = true,
  iconSpan = 'none',
  type = "text",
  placeholder,
  icon: Icon,
  theme,
  label,
  name,
  span
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {/* -------------------- Header label -------------------- */}
          <HeaderCustom
            to="input"
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
            htmlFor={`${name}-input`}
          />

          {/* -------------------- Input customizable -------------------- */}
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                ref={ref}
                id={`${name}-input`}
                placeholder={placeholder}
                type={showPassword ? 'text' : type}
                autoComplete={autoComplete ? 'on' : 'off'}
                className={cn(
                  (type === 'email' || type === 'password' || Icon !== undefined) && 'pl-10',
                  theme === 'dark'
                    ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
                    : 'bg-white border-gray-300 text-gray-900'
                )}
              />

              {/* Main icon  */}
              {Icon && <LeadingIcon Icon={Icon} />}

              {/* Button toggle visibility password */}
              {type === 'password' && (
                <PasswordToggle
                  theme={theme}
                  showPassword={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
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

InputField.displayName = 'InputField'

export default InputField
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
const LeadingIcon = ({ Icon }: { Icon: LucideIcon }) => (
  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
)

interface PasswordToggleProps extends ThemeContextProps { showPassword: boolean, onToggle: () => void }
const PasswordToggle = ({ theme, showPassword, onToggle }: PasswordToggleProps) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute inset-y-0 right-0 pr-3 flex items-center"
  >
    {showPassword ? (
      <EyeOff className={cn('h-5 w-5',
        theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
      )} />
    ) : (
      <Eye className={cn('h-5 w-5',
        theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
      )} />
    )}
  </button>
)