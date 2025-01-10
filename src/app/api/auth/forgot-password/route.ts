import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/nodemailer'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      // We don't want to reveal whether a user exists or not, so we'll return the same message
      return NextResponse.json({ message: 'If a user with that email exists, a password reset link has been sent.' })
    }

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' })
    await prisma.user.update({
      where: { email },
      data: { resetToken }
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    await sendEmail(
      email,
      'Reset your password',
      `Please click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`
    )

    return NextResponse.json({ message: 'If a user with that email exists, a password reset link has been sent.' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}
