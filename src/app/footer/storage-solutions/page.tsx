import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faWarehouse, faBarcode, faTemperatureLow, faClock } from '@fortawesome/free-solid-svg-icons'

export default function StorageSolutions() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faBox} className="mr-2" />
                Storage Solutions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Dropex offers flexible and secure storage solutions to meet your business needs. Whether you require short-term or long-term storage, we have the facilities and expertise to safeguard your inventory.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Our Storage Services</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faWarehouse} className="mr-2" />Warehouse storage</li>
                <li><FontAwesomeIcon icon={faTemperatureLow} className="mr-2" />Climate-controlled storage</li>
                <li><FontAwesomeIcon icon={faBarcode} className="mr-2" />Inventory management and tracking</li>
                <li><FontAwesomeIcon icon={faClock} className="mr-2" />Short-term and long-term storage options</li>
                <li>Secure facilities with 24/7 surveillance</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Benefits of Our Storage Solutions</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Flexible space allocation to accommodate your changing needs</li>
                <li>Integration with our fulfillment and shipping services</li>
                <li>Real-time inventory visibility</li>
                <li>Cost-effective alternatives to maintaining your own warehouse</li>
                <li>Specialized handling for sensitive or high-value items</li>
              </ul>

              <p className="mt-6">Let Dropex take care of your storage needs, allowing you to focus on growing your business. Contact us today to learn more about our storage solutions and how we can customize them to fit your requirements!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

