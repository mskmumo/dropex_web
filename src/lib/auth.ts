import { jwtVerify } from 'jose'

export async function getUser(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

export function redirectBasedOnRole(role: string) {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/admin'
    case 'CENTER_ADMIN':
    case 'WAREHOUSE_STAFF':
    case 'LOGISTICS_COORDINATOR':
      return '/center'
    default:
      return '/dashboard'
  }
}

