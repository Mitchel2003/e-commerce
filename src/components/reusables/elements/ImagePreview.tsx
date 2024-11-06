import { ThemeContextProps } from '@/interfaces/context.interface'
import { ControlProps } from '@/interfaces/form.interface'

import { useController } from 'react-hook-form'
import { Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImagePreviewProps extends ThemeContextProps, ControlProps {
  name: string
  label?: string
  className?: string
}

const ImagePreview = ({
  theme,
  name,
  label,
  control,
  className
}: ImagePreviewProps) => {

  const { field } = useController({ name, control, defaultValue: null })

  return (
    <div className="flex flex-col items-center w-full h-full max-w-md mx-auto">
      {/* -------------------- label -------------------- */}
      {label && (
        <div className="flex justify-end w-full">
          <p className={cn('text-xs', theme === 'dark' ? 'text-zinc-300' : 'text-gray-500')}>
            {label}
          </p>
        </div>
      )}

      {/* --------------------- Image preview --------------------- */}
      <div
        className={cn('flex w-full h-full items-center justify-center overflow-hidden border rounded-md shadow-sm',
          theme === 'dark' ? 'border-zinc-600' : 'border-gray-200',
          className ?? 'mt-1'
        )}
      >
        {field.value ? (
          <img
            src={field.value}
            alt="Logo de la empresa"
            className="bg-white"
          />
        ) : (
          <div
            className={cn('flex items-center justify-center w-full h-full',
              theme === 'dark'
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-gray-50 text-gray-400'
            )}
          >
            <Building2 className={cn('w-16 h-16', theme === 'dark' ? 'text-zinc-300' : 'text-gray-400')} />
          </div>
        )}
      </div>
      {/* ------------------------------------------------*/}

    </div >
  )
}

export default ImagePreview