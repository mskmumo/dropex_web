import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const body = await req.json()
      const { trackingNumber, status, origin, destination, weight, dimensions, userId } = body

      const newParcel = await prisma.parcel.create({
        data: {
          trackingNumber,
          status,
          origin,
          destination,
          weight,
          dimensions,
          userId,
        },
      })

      return NextResponse.json(newParcel, { status: 201 })
    } catch (error) {
      return NextResponse.json({ error: 'Error creating parcel' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
}

