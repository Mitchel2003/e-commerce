import { z } from "zod"

/*--------------------------------------------------forgotSchema--------------------------------------------------*/
export const forgotSchema = z.object({
  email: z.string().email("Correo electrónico inválido")
})
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------loginSchema--------------------------------------------------*/
export const loginSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------registerSchema--------------------------------------------------*/
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
      .max(35, "La categoría debe tener menos de 35 caracteres"),
    isLocal: z
      .boolean()
      .optional()
      .default(false),
    description: z
      .string()
      .min(30, "Descripción demasiado corta")
      .max(2000, "Descripción demasiado larga"),
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
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------registerUpdateSchema--------------------------------------------------*/
export const registerUpdateSchema = z.object({
  //Business data
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
    .max(35, "La categoría debe tener menos de 35 caracteres"),
  isLocal: z
    .boolean()
    .optional()
    .default(false),
  description: z
    .string()
    .min(30, "Descripción demasiado corta")
    .max(1000, "Descripción demasiado larga"),

  //Social networks
  socialNetworks: z.array(
    z.object({
      type: z.enum(['Facebook', 'Instagram', 'Otro']),
      url: z.string().url("URL inválida").or(z.string().length(0))
    })
  ).optional().default([])
}).refine((data) => Object.keys(data).length > 0, { message: "Al menos un campo debe ser proporcionado", path: ["root"] })

export const registerUpdateImageSchema = z.object({
  photoUrl: z.array(
    z.object({
      file: z.instanceof(File, { message: "Debe seleccionar una imagen" })
        .refine(file => file.size <= 5 * 1024 * 1024, "La imagen no debe exceder 5MB")
        .refine(file => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), "La imagen debe ser PNG, JPG o JPEG")
    })
  ).optional().default([])
})
/*---------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------types--------------------------------------------------*/
export type ForgotFormProps = z.infer<typeof forgotSchema>
export type LoginFormProps = z.infer<typeof loginSchema>
export type RegisterFormProps = z.infer<typeof registerSchema>
export type RegisterUpdateFormProps = z.infer<typeof registerUpdateSchema>
export type RegisterUpdateImageFormProps = z.infer<typeof registerUpdateImageSchema>
/*---------------------------------------------------------------------------------------------------------*/