import { create } from "zustand";

export type FavoriteTaskState = {
  favoriteTaskIds: string[];
  addFavoriteTask: (id: string) => void;
  removeFavoriteTask: (id: string) => void;
}

export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
  favoriteTaskIds: [],
  addFavoriteTask: (id: string) => set((state) => ({
    favoriteTaskIds: [...state.favoriteTaskIds, id]
  })),
  removeFavoriteTask: (id: string) => set((state) => ({
    favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
  }))
}));




/**
 * template
 * 
 * <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Restablecer contraseña</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hola %EMAIL%,</p>
    <p>Hemos recibido una solicitud de restablecimiento de contraseña; si no has generado esta peticion, por favor ignora este mensaje.</p>
    <p>Para restablecer tu coontraseña has click aqui en el enlace:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="%LINK%" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer contraseña</a>
    </div>
    <p>Este enlace expirará en una hora por razones de seguridad.</p>
    <p>Saludos, <br>Tu equipo de Gestion_salud ;)</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Este es un mensaje automatizado, por favor no responder a este correo.</p>
  </div>
</body>
</html>
 * 
 */