import { ReactNode } from 'react'
import Link from 'next/link'
import { HelpCircle, Book, Headphones, Bug, Truck, CreditCard } from 'lucide-react'
import React from 'react'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomFooter } from '@/components/CustomFooter'


interface SupportLayoutProps {
  children: ReactNode
  currentPage: string
}

export default function SupportLayout({ children, currentPage }: SupportLayoutProps) {
  const navItems = [
    { href: './faq', icon: HelpCircle, text: 'Frequently Asked Questions' },
    { href: './user-guide', icon: Book, text: 'User Guide' },
    { href: './contact-assistance', icon: Headphones, text: 'Contact Assistance' },
    { href: './report-issue', icon: Bug, text: 'Report an Issue' },
    { href: './track-shipment', icon: Truck, text: 'Track My Shipment' },
    { href: './payment-options', icon: CreditCard, text: 'Payment Options' },
  ]

  return (  
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-dark-blue-900 to-teal-900 text-white p-8">
   

      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    currentPage === item.href 
                      ? 'bg-white text-purple-900 shadow-lg' 
                      : 'bg-purple-800 bg-opacity-50 hover:bg-opacity-75'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          {children}
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.5 + 0.25,
              animation: `twinkle ${Math.random() * 5 + 5}s infinite`
            }}
          />
        ))}
      </div>

    
      </div>
    
  )
}

