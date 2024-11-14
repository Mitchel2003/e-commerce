import { z } from "zod"

export const registerSchema = z.object({
  image: z.instanceof(File).optional(),
  email: z.string().email("Correo electronico invalido"),
  phone: z.string().min(10, "El telefono debe tener al menos 10 caracteres"),
  description: z.string().min(10, "La descripcion debe tener al menos 10 caracteres"),
  socialNetwork: z.string().min(10, "La red social debe tener al menos 10 caracteres").optional()
})

export type RegisterFormProps = z.infer<typeof registerSchema>