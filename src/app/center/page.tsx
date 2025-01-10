'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ParcelList } from '@/components/center/parcel-list'
import { TaskBoard } from '@/components/center/task-board'
import { ShipmentTracking } from '@/components/center/shipment-tracking'
import { OverviewSection } from '@/components/center/overview-section'
import { ProfileSection } from '@/components/center/profile-section'
import { redirect } from 'next/navigation'

export default function CenterDashboard() {
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/auth/get-user-role');
        const data = await response.json();

        if (data.role !== 'CENTER_USER') {
          redirect('../center');
        }
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, []);


  const [activeTab, setActiveTab] = useState('parcels')

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-blue-900">Logistics Center Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Assign Tasks</Button>
          <Button variant="outline">Generate Report</Button>
        </div>
      </div>
      
      <OverviewSection />

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="parcels" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Parcels</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Tasks</TabsTrigger>
          <TabsTrigger value="incoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Incoming Shipments</TabsTrigger>
          <TabsTrigger value="outgoing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Outgoing Shipments</TabsTrigger>
        </TabsList>
        <TabsContent value="parcels">
          <ParcelList />
        </TabsContent>
        <TabsContent value="tasks">
          <TaskBoard />
        </TabsContent>
        <TabsContent value="incoming">
          <ShipmentTracking type="INCOMING" />
        </TabsContent>
        <TabsContent value="outgoing">
          <ShipmentTracking type="OUTGOING" />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSection user={undefined} />
        </CardContent>
      </Card>
    </div>
  )
}

