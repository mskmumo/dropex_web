import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')

  try {
    const shipments = await prisma.shipment.findMany({
      where: { type: type as 'INCOMING' | 'OUTGOING' },
      include: { supplier: true, customer: true },
    })
    return NextResponse.json(shipments)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching shipments' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newShipment = await prisma.shipment.create({
      data: body,
      include: { supplier: true, customer: true },
    })
    return NextResponse.json(newShipment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating shipment' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const updatedShipment = await prisma.shipment.update({
      where: { id: body.id },
      data: body,
      include: { supplier: true, customer: true },
    })
    return NextResponse.json(updatedShipment)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating shipment' }, { status: 500 })
  }
}

