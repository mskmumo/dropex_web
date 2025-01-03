import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, CreditCard } from 'lucide-react'

export function QuickActionsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Create Auction
        </Button>
        <Button className="w-full">
          <Search className="mr-2 h-4 w-4" /> Track Order
        </Button>
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" /> Make Payment
        </Button>
      </CardContent>
    </Card>
  )
}

