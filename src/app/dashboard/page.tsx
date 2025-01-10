// /* eslint-disable react-hooks/rules-of-hooks */
// "use client"

// import { useEffect, useState } from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { PaymentsSection } from '@/components/dashboard/payments-section'
// import { QuickActionsSection } from '@/components/dashboard/quick-actions-section'
// import { OnlineOrdersSection } from '@/components/dashboard/online-orders-section'
// import { createClient } from '@/utils/supabase/client'
// import { useToast } from '@/hooks/use-toast'
// import { redirect, useRouter } from 'next/navigation'

// // eslint-disable-next-line @next/next/no-async-client-component
// export default async function DashboardPage() {
//   useEffect(() => {
//     const checkUserRole = async () => {
//       try {
//         const role = await getUserRole()

//         if (role !== 'USER') {
//           redirect('/')
//         }
//       } catch (error) {
//         console.error('Error checking user role:', error)
//       }
//     }

//     checkUserRole()
//   }, [])
//     const role = await getUserRole()

//     if (role !== 'USER') {
//       redirect('/')
//     }
//   interface DashboardData {
//     parcels: { length: number }[];
//     auctions: { length: number }[];
//     tasks: { status: string }[];
//     shipments: { status: string }[];
//   }

//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()
//   const supabase = createClient()
//   const router = useRouter()

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser()
//         if (!user) throw new Error('No user found')

//         const response = await fetch(`/api/dashboard?userId=${user.id}`)
//         if (!response.ok) throw new Error('Failed to fetch dashboard data')

//         const data = await response.json()
//         setDashboardData(data)
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error)
//         toast({
//           title: "Error",
//           description: "Failed to load dashboard data. Please try again.",
//           variant: "destructive",
//         })
//         router.push('/login')
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [supabase.auth, toast, router])

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   if (!dashboardData) {
//     return <div>No dashboard data available.</div>
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//         <Button asChild>
//           <Link href="/dashboard/parcels/create">Create New Parcel</Link>
//         </Button>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{dashboardData.parcels.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{dashboardData.auctions.length}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardData.tasks.filter(task => task.status === 'pending').length}
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {dashboardData.shipments.filter(shipment => shipment.status === 'in_transit').length}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Overview</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">
//             {/* <Overview data={dashboardData} /> */}
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Recent Orders</CardTitle>
//             <CardDescription>You have {dashboardData.parcels.length} total orders</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {/* <RecentOrders parcels={dashboardData.parcels.slice(0, 5)} /> */}
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {/* <ParcelTrackingSection parcels={dashboardData.parcels} /> */}
//         <PaymentsSection />
//         <QuickActionsSection />
//       </div>
//       <OnlineOrdersSection />
//     </div>
//   )
//   }
// async function getUserRole(): Promise<string> {
//   // Implement the logic to get the user role
//   const supabase = createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) throw new Error('No user found');

//   // Fetch user role from your database or API
//   const response = await fetch(`/api/user-role?userId=${user.id}`);
//   if (!response.ok) throw new Error('Failed to fetch user role');

//   const { role } = await response.json();
//   return role;
// }
"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PaymentsSection } from '@/components/dashboard/payments-section'
import { QuickActionsSection } from '@/components/dashboard/quick-actions-section'
import { OnlineOrdersSection } from '@/components/dashboard/online-orders-section'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  interface DashboardData {
    parcels: { length: number }[];
    auctions: { length: number }[];
    tasks: { status: string }[];
    shipments: { status: string }[];
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')

        const response = await fetch(`/api/dashboard?userId=${user.id}`)
        if (!response.ok) throw new Error('Failed to fetch dashboard data')

        const data = await response.json()
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        })
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase.auth, toast, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!dashboardData) {
    return <div>No dashboard data available.</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/parcels/create">Create New Parcel</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parcels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.parcels.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.auctions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.tasks.filter(task => task.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.shipments.filter(shipment => shipment.status === 'in_transit').length}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Overview data={dashboardData} /> */}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {dashboardData.parcels.length} total orders</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <RecentOrders parcels={dashboardData.parcels.slice(0, 5)} /> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <ParcelTrackingSection parcels={dashboardData.parcels} /> */}
        <PaymentsSection />
        <QuickActionsSection />
      </div>
      <OnlineOrdersSection />
    </div>
  )
}

