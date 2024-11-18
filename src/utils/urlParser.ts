export const getUid = (url: string | null) => {
  const decodedUrl = decodeURIComponent(url || '')
  const uidMatch = decodedUrl.match(/uid=([^&]*)/)
  return uidMatch ? uidMatch[1] : 'uid firebase not found'
}