/**
 * Formatea un precio para su visualización.
 * Si el precio es undefined o solo contiene ceros, retorna 'Precio no disponible'
 */
export const formatPrice = (price?: string) => {
  if (!price || !parseFloat(price)) return 'Precio no disponible'
  return `$${Number(price).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}