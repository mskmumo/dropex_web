import prisma from '@/lib/prisma'

export async function getParcels() {
  try {
    const parcels = await prisma.parcel.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return parcels
  } catch (error) {
    console.error('Failed to fetch parcels:', error)
    throw new Error('Failed to fetch parcels.')
  }
}

