"use client"
import Link from 'next/link'
import { AnimatedSupportLink } from '@/components/AnimatedSupportLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faGift, faNewspaper, faBriefcase, faStar, faShoppingCart, faUser, faTruck, faRoute, faShip, faBox } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { HelpCircle, Book, Headphones, Bug, CreditCard, Truck } from 'lucide-react'

export function CustomFooter() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About Dropex</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="../footer/our-story" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faHistory} className="mr-2" />Our Story</Link></li>
              <li><Link href="../footer/loyalty-program" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faGift} className="mr-2" />Loyalty Program</Link></li>
              <li><Link href="../footer/newsroom" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faNewspaper} className="mr-2" />Newsroom</Link></li>
              <li><Link href="../footer/careers" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Career Opportunities</Link></li>
              <li><Link href="../footer/reviews" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faStar} className="mr-2" />Customer Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Our Services</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="../footer/global-purchases" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faShoppingCart} className="mr-2" />Global Purchases</Link></li>
              <li><Link href="../footer/personal-shopper" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faUser} className="mr-2" />Personal Shopper</Link></li>
              <li><Link href="../footer/fulfillment-delivery" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTruck} className="mr-2" />Fulfillment & Delivery</Link></li>
              <li><Link href="../footer/regional-transport" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faRoute} className="mr-2" />Regional Transport</Link></li>
              <li><Link href="../footer/sea-air-freight" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faShip} className="mr-2" />Sea & Air Freight</Link></li>
              <li><Link href="../footer/storage-solutions" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faBox} className="mr-2" />Storage Solutions</Link></li>
            </ul>
          </div>
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-sm font-semibold uppercase tracking-wider gradient-text">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><AnimatedSupportLink href="../footer/support/faq" icon={HelpCircle}>Frequently Asked Questions</AnimatedSupportLink></li>
              <li><AnimatedSupportLink href="../footer/support/user-guide" icon={Book}>User Guide</AnimatedSupportLink></li>
              <li><AnimatedSupportLink href="../footer/support/contact-assistance" icon={Headphones}>Contact Assistance</AnimatedSupportLink></li>
              <li><AnimatedSupportLink href="../footer/support/report-issue" icon={Bug}>Report an Issue</AnimatedSupportLink></li>
              <li><AnimatedSupportLink href="../footer/support/track-shipment" icon={Truck}>Track My Shipment</AnimatedSupportLink></li>
              <li><AnimatedSupportLink href="../footer/support/payment-options" icon={CreditCard}>Payment Options</AnimatedSupportLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2024 Dropex Logistics. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

