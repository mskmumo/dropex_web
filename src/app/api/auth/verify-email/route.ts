import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 400 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
    
    const updatedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: { emailVerified: true, verificationToken: null }
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found or already verified' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({ message: 'An error occurred during email verification' }, { status: 500 })
  }
}

