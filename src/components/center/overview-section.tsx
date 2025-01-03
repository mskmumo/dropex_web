"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClientSupabaseClient } from "@/lib/supabase"

interface OverviewData {
  totalParcels: number
  pendingTasks: number
  incomingShipments: number
  outgoingShipments: number
}

export function OverviewSection() {
  const [data, setData] = useState<OverviewData | null>(null)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchOverviewData = async () => {
      const { data: overviewData, error } = await supabase
        .from('center_overview')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching center overview data:', error)
      } else {
        setData(overviewData)
      }
    }

    fetchOverviewData()

    const subscription = supabase
      .channel('center_overview')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'center_overview' }, payload => {
        setData(payload.new as OverviewData)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{data?.totalParcels || 0}</div>
          <p className="text-xs text-blue-700">+20% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{data?.pendingTasks || 0}</div>
          <p className="text-xs text-blue-700">-5% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Incoming Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{data?.incomingShipments || 0}</div>
          <p className="text-xs text-blue-700">Expected today</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Outgoing Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{data?.outgoingShipments || 0}</div>
          <p className="text-xs text-blue-700">To be shipped today</p>
        </CardContent>
      </Card>
    </div>
  )
}

