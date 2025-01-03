import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, CreditCard, Gavel, Settings, ShoppingCart, TrendingUp } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Parcels', href: '/dashboard/parcels' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Gavel, label: 'Auctions', href: '/dashboard/auctions' },
  { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

