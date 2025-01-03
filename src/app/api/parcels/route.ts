import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId')

  if (!companyId) {
    return NextResponse.json({ error: 'Company ID is required' }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from('parcels')
      .select('*')
      .eq('company_id', companyId)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching parcels:', error)
    return NextResponse.json({ error: 'Failed to fetch parcels' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data, error } = await supabase
      .from('parcels')
      .insert(body)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating parcel:', error)
    return NextResponse.json({ error: 'Failed to create parcel' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    const { data, error } = await supabase
      .from('parcels')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating parcel:', error)
    return NextResponse.json({ error: 'Failed to update parcel' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Parcel ID is required' }, { status: 400 })
  }

  try {
    const { error } = await supabase
      .from('parcels')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Parcel deleted successfully' })
  } catch (error) {
    console.error('Error deleting parcel:', error)
    return NextResponse.json({ error: 'Failed to delete parcel' }, { status: 500 })
  }
}

