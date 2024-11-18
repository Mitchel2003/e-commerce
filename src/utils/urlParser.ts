export const getUid = (url: string | null) => {
  const decodedUrl = decodeURIComponent(url || '')
  const uidMatch = decodedUrl.match(/uid=([^&]*)/)
  return uidMatch ? uidMatch[1] : 'uid firebase not found'
}

export const validateEmail = (email: string) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}