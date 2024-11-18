import { FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import { Input } from '#/ui/input'

import { HeaderSpanProps } from '@/interfaces/props.interface'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface InputFieldProps extends HeaderSpanProps {
  name: string
  label: string
  theme: 'dark' | 'light'
  icon?: LucideIcon
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
}

const InputField = ({
  name,
  label,
  theme,
  icon: Icon,
  placeholder,
  type = "text",
  iconSpan = 'none',
  span
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]

  return (
    <FormItem>
      <HeaderCustom
        to="input"
        theme={theme}
        title={label}
        span={span}
        iconSpan={iconSpan}
        htmlFor={`${name}-input`}
      />

      <FormControl>
        <div className='relative'>
          <Input
            id={`${name}-input`}
            type={showPassword ? 'text' : type}
            autoComplete='off'
            placeholder={placeholder}
            className={cn(
              (type === 'email' || type === 'password') && 'pl-10',
              theme === 'dark'
                ? 'bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600'
                : 'bg-white border-gray-300 text-gray-900'
            )}
            {...register(name)}
          />

          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          )}

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className={cn('h-5 w-5', theme === 'dark' ? 'text-zinc-400' : 'text-gray-400')} />
              ) : (
                <Eye className={cn('h-5 w-5', theme === 'dark' ? 'text-zinc-400' : 'text-gray-400')} />
              )}
            </button>
          )}
        </div>
      </FormControl>

      {error && <FormMessage>{error.message as string}</FormMessage>}
    </FormItem>
  )
}

export default InputField