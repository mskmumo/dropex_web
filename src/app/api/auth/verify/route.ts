import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    // Update user verification status
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    })

    return NextResponse.json({ message: 'Email verified successfully! You can now log in.' }, { status: 200 })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ message: 'Verification failed' }, { status: 500 })
  }
} 