import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre es demasiado largo"),
  price: z
    .string({ required_error: "El precio es requerido" })
    .regex(/^\d+$/, "El precio debe ser un número válido"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(2000, "La descripción es demasiado larga"),
  imageUrl: z.instanceof(File, { message: "Debe seleccionar una imagen" })
    .refine(file => file.size <= 5 * 1024 * 1024, "La imagen no debe exceder 5MB")
    .refine(file => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), "La imagen debe ser PNG, JPG o JPEG")
})

export const productUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre es demasiado largo")
    .optional(),
  price: z
    .string({ required_error: "El precio es requerido" })
    .regex(/^\d+$/, "El precio debe ser un número válido"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(2000, "La descripción es demasiado larga")
    .optional()
}).refine((data) => Object.keys(data).length > 0, { message: "Al menos un campo debe ser proporcionado", path: ["root"] })

export type ProductFormProps = z.infer<typeof productSchema>
export type ProductUpdateFormProps = z.infer<typeof productUpdateSchema>