import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '@/utils/sendEmail'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, username, role, employeeId, governmentId, workLocation, shift } = body

    // Generate a unique default password
    const defaultPassword = `${uuidv4().split('-')[0]}${Math.random().toString(36).substring(2, 8)}`
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        username,
        password: hashedPassword,
        role,
        employeeId,
        governmentId,
        workLocation,
        shift,
      },
    })

    // Send email with login credentials
    await sendEmail(
      email,
      'Your Logistics Center Account',
      `Your account has been created. Please log in with the following credentials:
      Username: ${username}
      Password: ${defaultPassword}
      
      Please change your password upon first login.`
    )

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('Error creating center user:', error)
    return NextResponse.json({ error: 'Failed to create center user' }, { status: 500 })
  }
}

