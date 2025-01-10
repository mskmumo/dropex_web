import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json()

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await prisma.user.update({
      where: { email: decoded.email, resetToken: token },
      data: { password: hashedPassword, resetToken: null }
    })

    if (!updatedUser) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'An error occurred while resetting your password' }, { status: 500 })
  }
}
