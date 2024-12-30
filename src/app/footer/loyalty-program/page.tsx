import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"

export default function LoyaltyProgram() {
  return (
    <div className="flex flex-col min-h-screen">
        <CustomHeader />
    <main className="flex-grow bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Join our Loyalty Program and enjoy exclusive benefits! As a member, you'll earn points on every shipment, access special discounts, and receive priority support.</p>
          <ul className="list-disc list-inside mt-4">
            <li>Earn 1 point for every $1 spent</li>
            <li>Redeem points for discounts on future shipments</li>
            <li>Exclusive access to member-only promotions</li>
            <li>Priority customer support</li>
          </ul>
        </CardContent>
      </Card>
    </div>
    </main>
    <CustomFooter/>
    </div>
  )
}

