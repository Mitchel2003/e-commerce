import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/ui/select"
import { FormField, FormItem, FormControl } from "#/ui/form"
import HeaderCustom from "#/reusables/elements/HeaderCustom"

import { ControlProps, HeaderSpanProps } from "@/interfaces/form.interface"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { cn } from "@/lib/utils"

interface SelectFieldProps extends ControlProps, ThemeContextProps, HeaderSpanProps {
  name: string;
  label?: string;
  options: string[];
  className?: string;
  placeholder?: string;
}

const SelectField = ({
  theme,
  name,
  label,
  control,
  options,
  className,
  placeholder,
  span,
  iconSpan
}: SelectFieldProps) => {

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {/* -------------------- Header label -------------------- */}
          <HeaderCustom
            to='input'
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
            className={className}
            htmlFor={`${name}-select`}
          />

          {/* -------------------- Input select customizable -------------------- */}
          <Select
            name={`${name}-select`}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                id={`${name}-select`}
                className={cn(theme === 'dark'
                  ? 'bg-zinc-700 border-zinc-600 text-zinc-100'
                  : 'bg-white border-gray-300'
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* ---------------------------------------------------------------- */}

        </FormItem>
      )}
    />
  )
}

export default SelectField