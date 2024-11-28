import { z } from "zod"

export const forgotSchema = z.object({
  email: z.string().email("Correo electrónico inválido")
})

export const loginSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

export const registerSchema = z.object({
  //Access credentials
  accessCredentials: z.object({
    email: z
      .string()
      .email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  }),

  //Business data
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
    category: z
      .string()
      .min(1, "La categoría es requerida")
      .max(20, "La categoría debe tener menos de 20 caracteres"),
    isLocal: z
      .boolean()
      .optional()
      .default(false),
    description: z
      .string()
      .min(1, "La descripción es requerida")
      .max(250, "Descripción demasiado larga"),
  }),

  //References (like images and social networks)
  references: z.object({
    //images url
    photoUrl: z.array(
      z.object({
        file: z.instanceof(File, { message: "Debe seleccionar una imagen" })
          .refine(file => file.size <= 5 * 1024 * 1024, "La imagen no debe exceder 5MB")
          .refine(file => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), "La imagen debe ser PNG, JPG o JPEG")
      }))
      .min(1, "Debe subir al menos una imagen")
      .max(3, "Máximo 3 imágenes permitidas"),

    //social networks
    socialNetworks: z.array(
      z.object({
        type: z.enum(['Facebook', 'Instagram', 'Otro']),
        url: z.string().url("URL inválida").or(z.string().length(0))
      })
    ).optional().default([])
  })
})

export type LoginFormProps = z.infer<typeof loginSchema>
export type ForgotFormProps = z.infer<typeof forgotSchema>
export type RegisterFormProps = z.infer<typeof registerSchema>