export function getAuthHeader(token: string): Record<'Authorization', `Bearer: ${string}`> {
  return {
    Authorization: `Bearer: ${token}`
  }
}