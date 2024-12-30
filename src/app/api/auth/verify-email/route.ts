import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 400 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
    const user = await prisma.user.findUnique({ where: { email: decoded.email } })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Email already verified' }, { status: 400 })
    }

    await prisma.user.update({
      where: { email: decoded.email },
      data: { emailVerified: true, verificationToken: null },
    })

    return NextResponse.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({ message: 'An error occurred during email verification' }, { status: 500 })
  }
}

