import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "El nombre es demasiado largo"),
  price: z
    .number({
      required_error: "El precio es requerido",
    })
    .min(0, "El precio no puede ser negativo")
    .max(999999, "El precio es demasiado alto"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(200, "La descripción es demasiado larga"),
  imageUrl: z
    .custom<File>()
    .refine((file) => file instanceof File, "La imagen es requerida")
    .refine((file) => file.size <= 5 * 1024 * 1024, "La imagen no debe exceder 5MB")
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      "La imagen debe ser PNG, JPG o JPEG"
    )
})

export type ProductFormProps = z.infer<typeof productSchema> 