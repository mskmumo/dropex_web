import { Button } from '@/components/ui/button'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function OnlinePurchases() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Online Purchases</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            Our Online Purchases service allows you to shop from your favorite online stores worldwide, even if they don't ship to your country. We provide you with a personal shopping address, making international online shopping a breeze.
          </p>
          <h2 className="text-2xl font-semibold mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Sign up and receive your personal Aquantuo shopping address</li>
            <li>Shop at your favorite online stores using your Aquantuo address</li>
            <li>We receive and verify your packages</li>
            <li>Pay for shipping and any applicable duties</li>
            <li>We deliver your packages right to your doorstep</li>
          </ol>
          <Button className="bg-[#324879] text-white hover:bg-[#263a61]">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <Image
            src="/images/online-shopping-detailed.jpg"
            alt="Online Shopping Experience"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Successful Deliveries</p>
                <p className="text-2xl font-bold">14K+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">What types of items can I purchase?</h3>
            <p>You can purchase almost anything that's legal to import. This includes clothing, electronics, books, and more. However, certain restrictions may apply for oversized items or goods prohibited by customs regulations.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">How long does delivery usually take?</h3>
            <p>Delivery times vary depending on the origin of your purchase and your location. Typically, you can expect your items to arrive within 7-21 business days after we receive them at our facility.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Are there any additional fees?</h3>
            <p>In addition to the cost of shipping, you may be responsible for import duties and taxes, which vary by country. We'll provide you with a clear breakdown of all costs before you finalize your shipment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

