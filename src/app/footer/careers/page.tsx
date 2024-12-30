import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CustomHeader } from "@/components/CustomHeader"
import { CustomFooter } from "@/components/CustomFooter"

export default function Careers() {
  return (
    <div className="flex flex-col min-h-screen">
     <CustomHeader/>
     <main className="flex-grow bg-gray-50">
     <div className="container mx-auto px-4 py-8">

      <Card>
        <CardHeader>
          <CardTitle>Career Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Join our team and be part of the future of logistics! We're always looking for talented individuals to help us innovate and grow.</p>
          <h3 className="font-semibold mt-4">Current Openings:</h3>
          <ul className="list-disc list-inside mt-2">
            <li>Senior Software Engineer - Backend</li>
            <li>UX/UI Designer</li>
            <li>Logistics Coordinator</li>
            <li>Customer Success Manager</li>
            <li>Data Analyst</li>
          </ul>
          <p className="mt-4">To apply, please send your resume and cover letter to careers@dropex.com</p>
        </CardContent>
      </Card>
     
    </div>
    </main>
    <CustomFooter/>
    </div>
  )
}

