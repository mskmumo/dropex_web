import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faTruckMoving, faMapMarkedAlt, faClock } from '@fortawesome/free-solid-svg-icons'

export default function RegionalTransport() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faRoute} className="mr-2" />
                Regional Transport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dropex's Regional Transport service offers efficient and reliable transportation solutions within your region. We connect businesses and individuals with fast, cost-effective shipping options.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Our Regional Transport Services</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faTruckMoving} className="mr-2" />LTL (Less Than Truckload) shipping</li>
                <li><FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />Cross-border transportation</li>
                <li><FontAwesomeIcon icon={faClock} className="mr-2" />Time-critical shipments</li>
                <li>Temperature-controlled transport</li>
                <li>Specialized handling for high-value or sensitive items</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Our Regional Transport</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Optimized routes for faster delivery times</li>
                <li>Cost-effective solutions for regional shipping</li>
                <li>Real-time tracking and visibility</li>
                <li>Flexible scheduling options</li>
                <li>Dedicated customer support</li>
              </ul>

              <p className="mt-6">Experience the efficiency of Dropex's Regional Transport services. Contact us today to discuss your regional shipping needs and find the perfect solution for your business!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

