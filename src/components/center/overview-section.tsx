import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function OverviewSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Total Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">1,234</div>
          <p className="text-xs text-blue-700">+20% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">56</div>
          <p className="text-xs text-blue-700">-5% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Incoming Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">23</div>
          <p className="text-xs text-blue-700">Expected today</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">Outgoing Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">45</div>
          <p className="text-xs text-blue-700">To be shipped today</p>
        </CardContent>
      </Card>
    </div>
  )
}

