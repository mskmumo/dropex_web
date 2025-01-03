"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { createClientSupabaseClient } from "@/lib/supabase"

interface OverviewData {
  totalParcels: number
  activeAuctions: number
  totalRevenue: number
  pendingOrders: number
}

export function Overview() {
  const [data, setData] = useState<OverviewData | null>(null)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchOverviewData = async () => {
      const { data: overviewData, error } = await supabase
        .from('dashboard_overview')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching overview data:', error)
      } else {
        setData(overviewData)
      }
    }

    fetchOverviewData()

    const subscription = supabase
      .channel('dashboard_overview')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dashboard_overview' }, payload => {
        setData(payload.new as OverviewData)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const chartData = [
    {
      name: "Parcels",
      total: data?.totalParcels || 0,
    },
    {
      name: "Auctions",
      total: data?.activeAuctions || 0,
    },
    {
      name: "Revenue",
      total: data?.totalRevenue || 0,
    },
    {
      name: "Pending",
      total: data?.pendingOrders || 0,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

