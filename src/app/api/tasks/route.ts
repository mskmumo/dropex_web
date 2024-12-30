import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      include: { assignedTo: true, parcel: true },
    })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newTask = await prisma.task.create({
      data: body,
      include: { assignedTo: true, parcel: true },
    })
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: body,
      include: { assignedTo: true, parcel: true },
    })
    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating task' }, { status: 500 })
  }
}

