'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ParcelList } from '@/components/center/parcel-list'
import { TaskBoard } from '@/components/center/task-board'
import { ShipmentTracking } from '@/components/center/shipment-tracking'
import { OverviewSection } from '@/components/center/overview-section'
import { ProfileSection } from '@/components/center/profile-section'

export default function CenterDashboard() {
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
          <ShipmentTracking type="incoming" />
        </TabsContent>
        <TabsContent value="outgoing">
          <ShipmentTracking type="outgoing" />
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track and manage center inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add inventory management components here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>Manage center staff and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add staff management components here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your personal information and settings</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <ProfileSection user={user} /> */}
        </CardContent>
      </Card>
    </div>
  )
}

