import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'

export function ParcelTrackingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-6 w-6" />
          <span>Parcel Tracking</span>
        </CardTitle>
        <CardDescription>Track your recent parcels</CardDescription>
      </CardHeader>
      <CardContent>
        {/* This is a placeholder. We'll implement real tracking later */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Parcel #12345</span>
            <span className="text-green-600">In Transit</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Parcel #67890</span>
            <span className="text-blue-600">Out for Delivery</span>
          </div>
        </div>
        <Button className="w-full mt-4">View All Parcels</Button>
      </CardContent>
    </Card>
  )
}

