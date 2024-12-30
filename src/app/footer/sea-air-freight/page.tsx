import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShip, faPlane, faGlobeAmericas, faAnchor } from '@fortawesome/free-solid-svg-icons'

export default function SeaAirFreight() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faShip} className="mr-2" />
                <FontAwesomeIcon icon={faPlane} className="mr-2" />
                Sea & Air Freight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dropex offers comprehensive sea and air freight services to meet your global shipping needs. Whether you're moving goods across oceans or continents, we provide reliable and cost-effective solutions.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Our Sea Freight Services</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faAnchor} className="mr-2" />FCL (Full Container Load) shipping</li>
                <li><FontAwesomeIcon icon={faShip} className="mr-2" />LCL (Less than Container Load) shipping</li>
                <li>Break bulk and project cargo</li>
                <li>Refrigerated container shipping</li>
                <li>Port-to-port and door-to-door services</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Air Freight Services</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faPlane} className="mr-2" />Standard air freight</li>
                <li><FontAwesomeIcon icon={faGlobeAmericas} className="mr-2" />Express air freight for time-sensitive shipments</li>
                <li>Charter services for oversized or special cargo</li>
                <li>Temperature-controlled air freight</li>
                <li>Dangerous goods handling</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Why Choose Dropex for Sea & Air Freight?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Global network of trusted partners</li>
                <li>Competitive rates and flexible solutions</li>
                <li>Advanced tracking and visibility tools</li>
                <li>Customs clearance assistance</li>
                <li>Dedicated account management</li>
              </ul>

              <p className="mt-6">Let Dropex handle your international shipping needs with our expert Sea & Air Freight services. Contact us today to get a quote and learn how we can optimize your global supply chain!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

