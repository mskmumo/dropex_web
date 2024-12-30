'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Package, CreditCard } from 'lucide-react'

const notifications = [
  { id: 1, type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago' },
  { id: 2, type: 'order', message: 'New order placed: #12345', time: '15 minutes ago' },
  { id: 3, type: 'payment', message: 'Payment received: $100.00', time: '1 hour ago' },
  { id: 4, type: 'user', message: 'User updated profile: Jane Smith', time: '2 hours ago' },
  { id: 5, type: 'order', message: 'Order shipped: #67890', time: '3 hours ago' },
]

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="mb-4 flex space-x-2">
        <Button 
          variant={activeTab === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveTab('all')}
        >
          All
        </Button>
        <Button 
          variant={activeTab === 'user' ? 'default' : 'outline'}
          onClick={() => setActiveTab('user')}
        >
          Users
        </Button>
        <Button 
          variant={activeTab === 'order' ? 'default' : 'outline'}
          onClick={() => setActiveTab('order')}
        >
          Orders
        </Button>
        <Button 
          variant={activeTab === 'payment' ? 'default' : 'outline'}
          onClick={() => setActiveTab('payment')}
        >
          Payments
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Stay updated with the latest activities</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {filteredNotifications.map((notification) => (
              <li key={notification.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-100">
              {notification.type === 'user' && <User className="h-6 w-6 text-blue-500" />}
              {notification.type === 'order' && <Package className="h-6 w-6 text-green-500" />}
              {notification.type === 'payment' && <CreditCard className="h-6 w-6 text-purple-500" />}
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </div>
)
}

