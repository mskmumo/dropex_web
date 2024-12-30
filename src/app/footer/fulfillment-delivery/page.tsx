import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faWarehouse, faBarcode, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

export default function FulfillmentDelivery() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Fulfillment & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dropex offers comprehensive fulfillment and delivery services to streamline your e-commerce operations. From storage to last-mile delivery, we've got you covered.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Our Fulfillment Services</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faWarehouse} className="mr-2" />Inventory storage and management</li>
                <li><FontAwesomeIcon icon={faBarcode} className="mr-2" />Order processing and picking</li>
                <li><FontAwesomeIcon icon={faBoxOpen} className="mr-2" />Custom packaging and kitting</li>
                <li>Returns handling and processing</li>
                <li>Real-time inventory tracking</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Delivery Options</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Same-day delivery for local orders</li>
                <li>Next-day and 2-day shipping options</li>
                <li>International shipping to over 200 countries</li>
                <li>Specialized handling for fragile or oversized items</li>
              </ul>

              <p className="mt-6">Let Dropex handle your fulfillment and delivery needs, so you can focus on growing your business. Contact us today to learn how we can optimize your logistics operations!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

