// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/lib/auth'

// const prisma = new PrismaClient()

// export async function PUT(req: Request) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session || !session.user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await req.json()
//     const { email, phone, password, twoFactorEnabled } = body

//     const updateData: any = {
//       email,
//       phone,
//       twoFactorEnabled,
//     }

//     if (password) {
//       updateData.password = await bcrypt.hash(password, 10)
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id: session.user.id },
//       data: updateData,
//     })

//     return NextResponse.json(updatedUser)
//   } catch (error) {
//     console.error('Error updating profile:', error)
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
//   }
// }

