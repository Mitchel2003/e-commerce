export function getParams(url: string | null) {
  const decodedUrl = decodeURIComponent(url || '')

  /** get params from continueUrl */
  const getParam = (param: string): string => {
    const match = decodedUrl.match(new RegExp(`${param}=([^&]*)`))
    return match ? match[1] : `${param} no encontrado`
  }

  return {
    username: getParam('username'),
    email: getParam('email'),
    role: getParam('role')
  }
}