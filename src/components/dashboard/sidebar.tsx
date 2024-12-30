import Link from 'next/link'
import { Home, Package, CreditCard, Gavel, Settings } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Parcels', href: './dashboard/parcels' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Gavel, label: 'Auctions', href: '/dashboard/auctions' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 text-gray-700 p-2 rounded-lg hover:bg-gray-200"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

