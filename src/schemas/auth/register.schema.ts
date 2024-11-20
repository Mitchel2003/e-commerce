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
      .min(1, "La dirección es requerida")
      .max(100, "Descripción demaciado larga"),
  }),
  references: z.object({
    photoUrl: z
      .instanceof(File)
      .optional(),
    socialNetworks: z.array(
      z.object({
        type: z.enum(['Facebook', 'Instagram', 'Otro']),
        url: z.string().url("URL inválida").or(z.string().length(0))
      })
    ).optional()
  })
})

export type RegisterFormProps = z.infer<typeof registerSchema>