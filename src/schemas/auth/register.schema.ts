import { z } from "zod"

export const registerSchema = z.object({
  photo: z.instanceof(File).optional(),
  email: z.string().email("Correo electronico invalido"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: z.string().min(10, "El telefono debe tener al menos 10 caracteres"),
  description: z.string().min(10, "La descripcion debe tener al menos 10 caracteres"),
  socialNetworks: z.array(z.object({
    type: z.string(),
    url: z.string().url("URL invalida")
  })).optional()
})

export type RegisterFormProps = z.infer<typeof registerSchema>