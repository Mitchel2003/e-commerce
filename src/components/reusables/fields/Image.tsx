import { FormControl, FormField, FormItem } from '#/ui/form'
import { Button } from '#/ui/button'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { ControlProps } from '@/interfaces/form.interface'
import { useController } from 'react-hook-form'
import useCallback from '@/hooks/useCallback'
import { Camera, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import HeaderCustom from '../elements/HeaderCustom'

interface ImageFieldProps extends ControlProps, ThemeContextProps {
  name: string;
  label: string;
}
/**
 * Is a component that allows to upload an image.
 * @param {ImageFieldProps} props - The properties of the component.
 * @param {string} props.name - The attribute name of define the FormField component.
 * @param {string} props.label - Is the label of the component.
 * @param {Control<any>} props.control - To use the form control in the field.
 * @param {string} props.theme - Is the theme of the component.
 */
const ImageField = ({ name, label, control, theme }: ImageFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const { field } = useController({ name, control, defaultValue: null })
  const callback = useCallback({ field, setPreview })

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          {/* -------------------- Header -------------------- */}
          <HeaderCustom
            to="component"
            theme={theme}
            title={label}
            className='ml-auto'
          />

          <FormControl>
            {/* -------------------- Image container -------------------- */}
            <div
              className={cn(
                'flex px-auto justify-center rounded-lg border border-dashed',
                preview ? 'py-[2vh]' : 'py-[6vh]',
                theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-600'
                  : 'bg-gray-50 border-gray-900/25'
              )}
            >
              {/* -------------------- Image preview -------------------- */}
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Vista previa del equipo"
                    className="w-40 h-40 object-cover rounded-md"
                  />
                  <Button
                    size="icon"
                    type="button"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={callback?.remove}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  {/* -------------------- Image upload -------------------- */}
                  <Camera className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
                  <div className="flex w-full mt-4 text-sm justify-center leading-6">
                    <label
                      htmlFor={`${name}-file`}
                      className={cn(
                        'relative font-semibold rounded-md cursor-pointer',
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                      )}
                    >
                      <span className={cn('text-zinc-300', theme === 'dark' ? 'text-zinc-300' : 'text-gray-700')}>
                        Subir imagen
                      </span>
                      <input
                        id={`${name}-file`}
                        name={name}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={callback?.handler}
                      />
                    </label>
                  </div>

                  <p className={cn('text-xs leading-5', theme === 'dark' ? 'text-zinc-300' : 'text-gray-700')}>
                    PNG, JPG, JPEG hasta 5MB
                  </p>
                </div>
              )}
            </div>
          </FormControl>
        </FormItem >
      )}
    />
  )
}

export default ImageField