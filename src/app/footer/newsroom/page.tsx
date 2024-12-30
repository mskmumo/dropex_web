import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"

export default function Newsroom() {
  return (
    <div className="flex flex-col min-h-screen">
    <CustomHeader />
    <main className="flex-grow bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Newsroom</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Stay up to date with the latest news and updates from Dropex Logistics.</p>
          <ul className="mt-4 space-y-4">
            <li>
              <h3 className="font-semibold">Dropex Expands Operations to South America</h3>
              <p className="text-sm text-gray-600">June 15, 2024</p>
              <p>We're excited to announce our expansion into the South American market, offering our full range of logistics services to businesses and individuals in Brazil, Argentina, and Chile.</p>
            </li>
            <li>
              <h3 className="font-semibold">New AI-Powered Route Optimization Feature Launched</h3>
              <p className="text-sm text-gray-600">May 1, 2024</p>
              <p>Our latest update introduces AI-powered route optimization, helping our customers save time and reduce shipping costs by up to 15%.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    </main>
    <CustomFooter />
    </div>
  )
}

