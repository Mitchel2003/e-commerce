import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  description: z.string().optional(),
  photo: z.any().optional(),
  socialNetworks: z.array(
    z.object({
      type: z.enum(['Facebook', 'Instagram', 'Otro']),
      url: z.string().url("URL inválida").or(z.string().length(0))
    })
  ).optional()
})

export type RegisterFormProps = z.infer<typeof registerSchema>