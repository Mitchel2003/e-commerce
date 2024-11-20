import { FormField, FormItem, FormControl, FormMessage } from '#/ui/form'
import HeaderCustom from '#/reusables/elements/HeaderCustom'
import { Button } from '#/ui/button'

import { ThemeContextProps } from '@/interfaces/context.interface'
import { HeaderSpanProps } from '@/interfaces/props.interface'

import { useFormContext } from 'react-hook-form'
import { Camera, X } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageFieldProps extends HeaderSpanProps, ThemeContextProps {
  name: string
  label: string
}

const ImageField = React.forwardRef<HTMLInputElement, ImageFieldProps>(({
  name,
  label,
  theme,
  span,
  iconSpan = 'none'
}, ref) => {
  const [preview, setPreview] = useState<string | null>(null)
  const { control } = useFormContext()

  const processFile = (file: File, onChange: (value: any) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      onChange(file)
    }
    reader.readAsDataURL(file)
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <FormItem>
          {/* -------------------- Header label -------------------- */}
          <HeaderCustom
            to="component"
            theme={theme}
            title={label}
            span={span}
            iconSpan={iconSpan}
            className='ml-auto'
          />

          <FormControl>
            <div className={cn(
              'flex px-auto justify-center rounded-lg border border-dashed',
              preview ? 'py-[2vh]' : 'py-[6vh]',
              error && 'border-red-500',
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-600'
                : 'bg-purple-50 border-gray-900/25',
            )}>
              {preview ? (
                <PreviewImage
                  theme={theme}
                  preview={preview}
                  onRemove={() => { setPreview(null); onChange(null) }}
                />
              ) : (
                <UploadPrompt
                  {...field}
                  ref={ref}
                  name={name}
                  theme={theme}
                  onChange={(file) => { if (file) processFile(file, onChange) }}
                />
              )}
            </div>
          </FormControl>

          {error && (
            <FormMessage className="text-red-500">
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
})

ImageField.displayName = 'ImageField'

export default ImageField

/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
interface PreviewImageProps extends ThemeContextProps {
  preview: string
  onRemove: () => void
}

const PreviewImage = ({ preview, theme, onRemove }: PreviewImageProps) => (
  <div className="relative">
    <img
      src={preview}
      alt="Vista previa"
      className="w-40 h-40 object-cover rounded-md"
    />
    <Button
      size="icon"
      type="button"
      variant="destructive"
      className={cn(
        'absolute top-2 right-2',
        theme === 'dark' ? 'bg-red-800' : 'bg-red-500'
      )}
      onClick={onRemove}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
)

interface UploadPromptProps extends ThemeContextProps {
  name: string
  onChange: (file: File | null) => void
}

const UploadPrompt = React.forwardRef<HTMLInputElement, UploadPromptProps>(({
  name,
  theme,
  onChange
}, ref) => (
  <div className="text-center">
    <Camera className="mx-auto h-10 w-10 text-gray-300" aria-hidden="true" />
    <div className="flex w-full mt-4 text-sm justify-center leading-6">
      <label
        htmlFor={`${name}-file`}
        className={cn(
          'relative font-semibold rounded-md cursor-pointer',
          theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
        )}
      >
        <span className={cn(
          theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
        )}>
          Subir imagen
        </span>
        <input
          ref={ref}
          id={`${name}-file`}
          name={name}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0] || null
            if (file) {
              onChange(file)
            }
          }}
        />
      </label>
    </div>
    <p className={cn(
      'text-xs leading-5',
      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
    )}>
      PNG, JPG, JPEG hasta 5MB
    </p>
  </div>
))

UploadPrompt.displayName = 'UploadPrompt'