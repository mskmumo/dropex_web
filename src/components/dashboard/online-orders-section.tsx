'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Order = {
  id: string
  platform: 'Amazon' | 'eBay'
  status: string
  total: string
  date: string
}

export function OnlineOrdersSection() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // This is a placeholder. In a real application, you would fetch this data from your API.
    const fetchOrders = async () => {
      // const response = await fetch('/api/orders')
      // const data = await response.json()
      // setOrders(data)
      
      // Placeholder data
      setOrders([
        { id: 'AMZ001', platform: 'Amazon', status: 'Shipped', total: '$50.00', date: '2023-07-01' },
        { id: 'EBY001', platform: 'eBay', status: 'Processing', total: '$75.00', date: '2023-07-02' },
      ])
    }

    fetchOrders()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online Orders</CardTitle>
        <CardDescription>Your recent orders from Amazon and eBay</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium">{order.platform} Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p>{order.total}</p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4">View All Orders</Button>
      </CardContent>
    </Card>
  )
}

