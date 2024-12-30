import { sign, verify } from 'jsonwebtoken'
import { hash, compare } from 'bcryptjs'

export async function hashPassword(password: string) {
  return await hash(password, 10)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export function generateToken(userId: string) {
  return sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string) {
  return verify(token, process.env.JWT_SECRET || 'fallback-secret-key')
}