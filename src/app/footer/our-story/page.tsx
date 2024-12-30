import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"

export default function OurStory() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomHeader />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Here at Dropex, our journey began with a simple idea: to make global logistics accessible to everyone. Founded in 2015, we've grown from a small startup to a leading player in the logistics industry.</p>
              <p className="mt-4">Our mission is to simplify the complex world of shipping and logistics, providing innovative solutions that empower businesses and individuals alike.</p>
              <p className="mt-4">Over the years, we've expanded our services to cover every aspect of the logistics chain, from global purchases to last-mile delivery. Our team of experts works tirelessly to ensure that your packages are handled with care and delivered on time, every time.</p>
              <p className="mt-4">As we look to the future, we're committed to pushing the boundaries of what's possible in logistics. We're investing in cutting-edge technology, sustainable practices, and our greatest asset - our people - to continue delivering exceptional service to our customers around the world.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <CustomFooter />
    </div>

  )
}

