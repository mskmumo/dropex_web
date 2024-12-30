'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', users: 4000, orders: 2400, revenue: 24000 },
  { name: 'Feb', users: 3000, orders: 1398, revenue: 22000 },
  { name: 'Mar', users: 2000, orders: 9800, revenue: 32000 },
  { name: 'Apr', users: 2780, orders: 3908, revenue: 39000 },
  { name: 'May', users: 1890, orders: 4800, revenue: 42000 },
  { name: 'Jun', users: 2390, orders: 3800, revenue: 38000 },
  { name: 'Jul', users: 3490, orders: 4300, revenue: 43000 },
]

export default function Analytics() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Number of registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,245</p>
            <p className="text-sm text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Number of completed orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5,678</p>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Revenue generated this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$123,456</p>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Monthly trend of users, orders, and revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#82ca9d" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

