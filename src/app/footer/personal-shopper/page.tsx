import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faTags, faClock } from '@fortawesome/free-solid-svg-icons'

export default function PersonalShopper() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Personal Shopper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Our Personal Shopper service brings the expertise of professional shoppers to your fingertips. Whether you're looking for hard-to-find items or simply don't have the time to shop, our team is here to help.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Our Services Include</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><FontAwesomeIcon icon={faSearch} className="mr-2" />Product research and recommendations</li>
                <li><FontAwesomeIcon icon={faTags} className="mr-2" />Price comparisons and deal hunting</li>
                <li><FontAwesomeIcon icon={faClock} className="mr-2" />Time-sensitive purchases (e.g., limited editions, sales)</li>
                <li>Gift shopping for special occasions</li>
                <li>Personal styling and wardrobe consultation</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Tell us what you're looking for</li>
                <li>We research and present options</li>
                <li>You approve the selections</li>
                <li>We make the purchase on your behalf</li>
                <li>Your items are shipped directly to you</li>
              </ol>

              <p className="mt-6">Experience the convenience of having a personal shopper at your service. Try Dropex Personal Shopper today and save time while getting exactly what you want!</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>
  )
}

