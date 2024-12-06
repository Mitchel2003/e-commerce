import { HeaderSpanProps, DialogField } from "@/interfaces/props.interface"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { FormProvider, UseFormReturn } from "react-hook-form"
import { CheckIcon } from "lucide-react"
import { cloneElement } from "react"
import { cn } from "@/lib/utils"

import { Dialog as DialogPrimitive, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "#/ui/dialog"
import HeaderCustom from "#/common/elements/HeaderCustom"
import { Button } from "#/ui/button"

interface DialogProps extends ThemeContextProps, HeaderSpanProps {
  //form props
  form: { methods: UseFormReturn<any>, onSubmit: () => Promise<void> | void }
  fields: DialogField[]
  description?: string
  labelSubmit?: string
  title: string

  //handler dialog
  open: boolean
  onOpenChange: (open: boolean) => void
}

const Dialog = ({
  labelSubmit = 'Subir',
  onOpenChange,
  description,
  iconSpan,
  fields,
  title,
  theme,
  form,
  span,
  open
}: DialogProps) => {
  return (
    <DialogPrimitive
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        aria-describedby={description ? 'dialog-description' : undefined}
        className={cn('sm:max-w-[425px]', theme === 'dark' ? 'bg-zinc-800' : 'bg-white')}
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle>
            <HeaderCustom
              to="component"
              span={span}
              theme={theme}
              title={title}
              iconSpan={iconSpan}
              className="text-left"
            />
          </DialogTitle>
          <DialogDescription id="dialog-description">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <FormProvider {...form.methods}>
          <form onSubmit={form.onSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <div key={`${field.name}-${index}`}>
                {cloneElement(field.component, {
                  'aria-describedby': field.name ?? `field-description-${index}`,
                  name: field.name,
                  theme
                })}
                {field.name && <div id={`field-description-${index}`} className="sr-only">{field.name}</div>}
              </div>
            ))}

            <SubmitButton theme={theme} label={labelSubmit} />
          </form>
        </FormProvider>
      </DialogContent>
    </DialogPrimitive>
  )
}

export default Dialog
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------tools--------------------------------------------------*/
// Botón de envío
interface SubmitButtonProps extends ThemeContextProps {
  label: string
}

const SubmitButton = ({ label, theme }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn('w-full text-white',
        'transition-all duration-300 transform hover:scale-105',
        theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-800 hover:bg-purple-900'
      )}
    >
      {label}
      <CheckIcon className="h-4 w-4" />
    </Button>
  )
}