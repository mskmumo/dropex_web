import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { LineChart, Line } from 'recharts'
// import { ManageCenterUsers } from '@/components/admin/manage-center-users'
// import { UserManagement } from '@/components/admin/user-management'
// import { OrderManagement } from '@/components/admin/order-management'
// import { AuctionManagement } from '@/components/admin/auction-management'
// import { ParcelTracking } from '@/components/admin/parcel-tracking'
// import { SupportTickets } from '@/components/admin/support-tickets'
import { getUserRole } from '../api/auth/get-user-role/route'
import { redirect } from 'next/navigation'

const data = [
  { name: 'Jan', users: 4000, orders: 2400, auctions: 2400 },
  { name: 'Feb', users: 3000, orders: 1398, auctions: 2210 },
  { name: 'Mar', users: 2000, orders: 9800, auctions: 2290 },
  { name: 'Apr', users: 2780, orders: 3908, auctions: 2000 },
  { name: 'May', users: 1890, orders: 4800, auctions: 2181 },
  { name: 'Jun', users: 2390, orders: 3800, auctions: 2500 },
]

export default async function AdminDashboard() {
  try {
    const role = await getUserRole()

    if (role !== 'ADMIN') {
      redirect('/')
    }
  } catch (error) {
    console.error('Failed to get user role:', error)
    redirect('/')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,245</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$98,765.43</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                <Line type="monotone" dataKey="auctions" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New user registered</p>
                  <p className="text-sm text-muted-foreground">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New order placed</p>
                  <p className="text-sm text-muted-foreground">
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Auction ended</p>
                  <p className="text-sm text-muted-foreground">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <UserManagement /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>Manage and track orders</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <OrderManagement /> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Auction Management</CardTitle>
            <CardDescription>Manage ongoing and upcoming auctions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <AuctionManagement /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Parcel Tracking</CardTitle>
            <CardDescription>Track and manage parcels</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ParcelTracking /> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage customer support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <SupportTickets /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


