import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Reviews() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Don't just take our word for it. See what our customers have to say about their experience with Dropex Logistics.</p>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">Amazing Service!</h3>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
              <p>"Dropex has revolutionized my e-commerce business. Their efficient logistics solutions have helped me scale my operations and satisfy customers worldwide." - Sarah K.</p>
            </div>
            <div>
              <h3 className="font-semibold">Reliable and Fast</h3>
              <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
              <p>"I've been using Dropex for my international shipments for over a year now. Their service is consistently reliable and faster than any other provider I've used." - Michael T.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

