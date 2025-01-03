"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClientSupabaseClient } from "@/lib/supabase"

interface Order {
  id: string
  total: number
  user: {
    name: string
    email: string
  }
}

export function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, total, user:users(name, email)')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching recent orders:', error)
      } else {
        setRecentOrders(data)
      }
    }

    fetchRecentOrders()

    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
        fetchRecentOrders()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${order.user.name}.png`} alt={order.user.name} />
            <AvatarFallback>{order.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.user.name}</p>
            <p className="text-sm text-muted-foreground">{order.user.email}</p>
          </div>
          <div className="ml-auto font-medium">${order.total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

