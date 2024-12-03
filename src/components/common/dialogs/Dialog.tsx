import { Dialog as DialogPrimitive, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "#/ui/dialog"
import { ThemeContextProps } from "@/interfaces/context.interface"
import { HeaderSpanProps } from "@/interfaces/props.interface"
import { DialogField } from "@/interfaces/props.interface"
import HeaderCustom from "#/common/elements/HeaderCustom"
import { UseFormReturn } from "react-hook-form"
import React, { useState } from "react"
import { Form } from "#/ui/form"
import { cn } from "@/lib/utils"

interface DialogProps extends ThemeContextProps, HeaderSpanProps {
  //to header custom
  description?: string
  title: string

  //to form
  form: { methods: UseFormReturn<any>, onSubmit: () => Promise<void> | void }
  submitButton: React.ReactNode
  trigger: React.ReactNode
  fields: DialogField[]
}

const Dialog = ({
  submitButton,
  description,
  iconSpan,
  trigger,
  fields,
  title,
  theme,
  form
}: DialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DialogPrimitive
      open={open}
      onOpenChange={(e) => { form.methods.formState.isSubmitSuccessful && setOpen(e) }}
    >
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className={cn(
        'sm:max-w-[425px]',
        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
      )}>
        <DialogHeader>
          <DialogTitle>
            <HeaderCustom
              to="component"
              theme={theme}
              title={title}
              span={description}
              iconSpan={iconSpan}
              className="text-left"
            />
          </DialogTitle>
        </DialogHeader>

        <Form {...form.methods}>
          <form onSubmit={form.onSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <div key={`${field.name}-${index}`}>
                {React.cloneElement(field.component, {
                  name: field.name,
                  theme
                })}
              </div>
            ))}

            {submitButton}
          </form>
        </Form>
      </DialogContent>
    </DialogPrimitive>
  )
}

export default Dialog