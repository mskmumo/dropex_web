import Link from 'next/link'
import { Package, Truck, ClipboardList, BarChart2 } from 'lucide-react'

const navItems = [
  { icon: Package, label: 'Parcels', href: '/center' },
  { icon: ClipboardList, label: 'Tasks', href: '/center?tab=tasks' },
  { icon: Truck, label: 'Shipments', href: '/center?tab=incoming' },
  { icon: BarChart2, label: 'Analytics', href: '/center/analytics' },
]

export function CenterSidebar() {
  return (
    <div className="bg-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 text-gray-100 p-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-150 ease-in-out"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

