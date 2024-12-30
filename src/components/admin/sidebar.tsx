import Link from 'next/link'
import { Users, Package, CreditCard, Gavel, BarChart2, MessageSquare, Bell } from 'lucide-react'

const navItems = [
  { icon: Users, label: 'User Management', href: '../admin/users' },
  { icon: Package, label: 'Order Management', href: '/admin/orders' },
  { icon: Gavel, label: 'Auction Management', href: '/admin/auctions' },
  { icon: CreditCard, label: 'Parcel Tracking', href: '/admin/parcels' },
  { icon: MessageSquare, label: 'Support Tickets', href: '/admin/tickets' },
  { icon: BarChart2, label: 'Analytics', href: '/admin/analytics' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
]

export function AdminSidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 text-gray-300 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

