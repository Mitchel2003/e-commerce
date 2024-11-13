import { FormField, FormItem, FormControl, FormLabel } from '#/ui/form'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import { Checkbox } from '#/ui/checkbox'
import { Textarea } from '#/ui/textarea'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { ControlProps } from '@/interfaces/props.interface'
import { cn } from '@/lib/utils'

interface AreaToggleableProps extends ControlProps, ThemeContextProps {
  name: string;
  label: string;
  className?: string;
  inputLabel?: string;
  placeholder?: string;
}

/**
 * This is a component reusable that allows to toggle a text area through a checkbox trigger.
 * @param {AreaToggleableProps} props - The properties of the component.
 * @param {string} props.name - The attribute name of define the FormField component.
 * @param {string} props.label - Is the label of the checkbox trigger.
 * @param {string} props.className - Is the class name to the component input.
 * @param {string} props.control - Is the controller from react-hook-form (useForm).
 * @param {string} props.inputLabel - Is the label to the component input (Textarea).
 * @param {string} props.placeholder - Is the placeholder to the component in context.
 */
const AreaToggleable = ({
  theme,
  name,
  label,
  control,
  className,
  inputLabel = 'Detalles',
  placeholder = 'Describa los detalles'
}: AreaToggleableProps) => {

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {/* -------------------- Checkbox trigger -------------------- */}
          <FormControl>
            <div className="flex space-x-2 items-center mt-2">
              {/* recomended use htmlFor */}
              <HeaderCustom
                to="input"
                theme={theme}
                title={label}
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
          {/* ---------------------------------------------------------------- */}

          {/* -------------------- TextArea toggleable -------------------- */}
          {field.value?.checked && (
            <FormControl>
              <div className="space-y-2">
                <FormLabel htmlFor={`${name}-textarea`} className="font-medium text-sm">
                  {inputLabel}
                </FormLabel>

                <Textarea
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
          {/* ---------------------------------------------------------------- */}

        </FormItem>
      )}
    />
  )
}

export default AreaToggleable