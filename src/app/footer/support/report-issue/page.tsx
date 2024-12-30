// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// export default function ReportIssuePage() {
//   return (
//     <div className="space-y-6 animate-fade-in">
//       <h2 className="text-3xl font-bold">Report an Issue</h2>
//       <Card>
//         <CardHeader>
//           <CardTitle>Issue Report</CardTitle>
//           <CardDescription>Please provide details about the issue you're experiencing.</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="issue-type">Issue Type</Label>
//             <Select>
//               <SelectTrigger id="issue-type">
//                 <SelectValue placeholder="Select issue type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="technical">Technical Problem</SelectItem>
//                 <SelectItem value="billing">Billing Issue</SelectItem>
//                 <SelectItem value="account">Account Problem</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="issue-description">Issue Description</Label>
//             <Textarea id="issue-description" placeholder="Please describe the issue in detail" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="steps-to-reproduce">Steps to Reproduce</Label>
//             <Textarea id="steps-to-reproduce" placeholder="If applicable, list the steps to reproduce the issue" />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full">Submit Report</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

import { CustomHeader } from '@/components/CustomHeader'
import SupportLayout from '../support-layout'
import { CustomFooter } from '@/components/CustomFooter'

export default function ReportIssuePage() {
  return (
    <div className="flex flex-col min-h-screen">
    <CustomHeader />
    <main className="flex-grow bg-gray-50">
    <div className="container mx-auto px-4 py-8">
    
    <SupportLayout currentPage="/report-issue">
      
      <h1 className="text-3xl font-bold mb-6">Report an Issue</h1>
      <div className="bg-red-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
        <form className="space-y-4">
          <div>
            <label htmlFor="issue-type" className="block text-sm font-medium mb-1">Issue Type</label>
            <select id="issue-type" className="w-full px-3 py-2 bg-blue bg-opacity-20 rounded-lg text-black">
              <option>Technical Problem</option>
              <option>Billing Issue</option>
              <option>Account Access</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <textarea id="description" rows={4} className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-lg text-white"></textarea>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Steps to Reproduce</label>
            <textarea id="description" rows={4} className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-lg text-white" placeholder="If applicable, list the steps to reproduce the issue"></textarea>
          </div>
          <button type="submit" className="px-6 py-2 bg-white text-red-900 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">Submit Report</button>
        </form>
      </div>
    </SupportLayout>
    </div>
    </main>
    <CustomFooter />
    </div>
    
  )
}
