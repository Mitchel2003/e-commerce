import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Correo electronico invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

export type LoginFormProps = z.infer<typeof loginSchema>