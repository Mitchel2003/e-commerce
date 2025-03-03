/**
 * Formatea un precio para su visualización.
 * Si el precio es undefined o solo contiene ceros, retorna 'Precio no disponible'
 */
export const formatPrice = (price?: string) => {
  if (!price || !parseFloat(price)) return 'Precio no disponible'
  return `$${Number(price).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

/**
 * Formatea el número de likes para su visualización.
 * Si el número de likes es undefined, retorna '0'
 * Si el número de likes es mayor o igual a 1000, retorna el número formateado con 1 decimal
 * Si el número de likes es menor a 1000, retorna el número como está
 * @param {number} likes - El número de likes a formatear
 * @returns {string} El número de likes formateado
 */
export const formatLikes = (likes?: number) => {
  if (!likes) return '0'
  if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`
  return likes.toString()
}