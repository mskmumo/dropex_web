import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard } from 'lucide-react'

export function PaymentsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span>Payments</span>
        </CardTitle>
        <CardDescription>Recent transactions and payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        {/* This is a placeholder. We'll implement real payment data later */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Payment #001</span>
            <span className="text-green-600">$50.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Payment #002</span>
            <span className="text-green-600">$75.00</span>
          </div>
        </div>
        <Button className="w-full mt-4">View All Transactions</Button>
      </CardContent>
    </Card>
  )
}

