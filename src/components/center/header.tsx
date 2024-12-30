import { Bell, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CenterHeader() {
  return (
    <header className="bg-white shadow-md py-4 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-blue-900 mr-4">Logistics Center</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-blue-900" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-blue-900" />
        </Button>
      </div>
    </header>
  )
}

