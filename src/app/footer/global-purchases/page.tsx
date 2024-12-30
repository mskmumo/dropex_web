import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faGlobe, faCreditCard, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

export default function GlobalPurchases() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Global Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">At Dropex, we make international shopping a breeze. Our Global Purchases service allows you to buy products from anywhere in the world and have them delivered right to your doorstep.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Choose your products from any international online store</li>
                <li>Use our Dropex shipping address at checkout</li>
                <li>We receive and inspect your items</li>
                <li>We consolidate your purchases to save on shipping</li>
                <li>Your items are shipped directly to you</li>
              </ol>

              <h3 className="text-xl font-semibold mt-6 mb-3">Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faGlobe} className="mr-2" />Access to products not available in your country</li>
                <li><FontAwesomeIcon icon={faCreditCard} className="mr-2" />Save on international shipping costs</li>
                <li><FontAwesomeIcon icon={faShieldAlt} className="mr-2" />Package consolidation and repackaging services</li>
                <li>Expert handling of customs and import procedures</li>
              </ul>

              <p className="mt-6">Experience the world of international shopping with Dropex Global Purchases. Sign up today and start shopping without borders!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

