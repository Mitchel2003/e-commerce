import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from "#/reusables/elements/HeaderCustom"
import { Input } from '#/ui/input'

import { ControlProps, HeaderSpanProps } from '@/interfaces/form.interface'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface InputFieldProps extends ControlProps, ThemeContextProps, HeaderSpanProps {
  name: string;
  label: string;
  icon?: LucideIcon;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
}

/**
 * Allow us use a input field type generic, represent a basic input, with a label and placeholder optional.
 * This is a component reusable 
 * @param {InputFieldProps} props - The properties of the component
 * @param {string} props.name - Its to define the property name of the FormField, is important control the field
 * @param {string} props.theme - Correspond to the theme in context; could be "light" or "dark"
 * @param {string} props.label - Its a label according to the input
 * @param {Control<any>} props.control - Represent the useForm controller
 * @param {LucideIcon} props.icon - Contain an Icon to use in the input field
 * @param {string} props.placeholder - Represent the placeholder
 * @param {string} props.type - Helps us to define the type of input
 */
const InputField = ({
  theme,
  name,
  label,
  control,
  icon: Icon,
  placeholder,
  type = "text",
  iconSpan,
  span
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

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

          {/* -------------------- Input with type mutable -------------------- */}
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
                {...field}
              />

              {/* -------------------- Icon decorative (side left) -------------------- */}
              {Icon && (
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              )}

              {/* -------------------- Toggle to change input type password (side right) -------------------- */}
              {type === 'password' && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className={cn('h-5 w-5', theme === 'dark' ? 'text-zinc-400' : 'text-gray-400')}
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      className={cn('h-5 w-5', theme === 'dark' ? 'text-zinc-400' : 'text-gray-400')}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          {/* render error */}
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}

export default InputField