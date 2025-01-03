import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const supabase = createClient()

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', userId)
      .single()

    if (userError) throw userError

    const companyId = user.company_id

    const [parcels, auctions, tasks, shipments] = await Promise.all([
      supabase.from('parcels').select('*').eq('company_id', companyId),
      supabase.from('auctions').select('*').eq('company_id', companyId),
      supabase.from('tasks').select('*').eq('company_id', companyId),
      supabase.from('shipments').select('*').eq('company_id', companyId),
    ])

    if (parcels.error) throw parcels.error
    if (auctions.error) throw auctions.error
    if (tasks.error) throw tasks.error
    if (shipments.error) throw shipments.error

    return NextResponse.json({
      parcels: parcels.data,
      auctions: auctions.data,
      tasks: tasks.data,
      shipments: shipments.data,
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}

