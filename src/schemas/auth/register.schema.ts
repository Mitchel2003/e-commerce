import { z } from "zod"

export const registerSchema = z.object({
  accessCredentials: z.object({
    email: z
      .string()
      .email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  }),
  businessData: z.object({
    name: z
      .string()
      .min(1, "El nombre es requerido"),
    phone: z
      .string()
      .min(1, "El teléfono es requerido"),
    address: z
      .string()
      .min(1, "La dirección es requerida"),
    description: z
      .string()
      .min(1, "La descripción es requerida")
      .max(100, "Descripción demaciado larga"),
  }),
  references: z.object({
    //images url
    photoUrl: z.object({
      place: z
        .array(z.instanceof(File))
        .min(1, "Debe subir al menos una imagen")
        .max(3, "Máximo 3 imágenes permitidas")
        .refine(
          (files) => files.every(file => file.size <= 5 * 1024 * 1024),
          { message: "Las imágenes no deben exceder 5MB" }
        )
        .refine(
          (files) => files.every(file => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)),
          { message: "Las imágenes deben ser PNG, JPG o JPEG" }
        )
    }),

    //social networks
    socialNetworks: z.array(
      z.object({
        type: z.enum(['Facebook', 'Instagram', 'Otro']),
        url: z.string().url("URL inválida").or(z.string().length(0))
      })
    ).optional().default([])
  })
})

export type RegisterFormProps = z.infer<typeof registerSchema>