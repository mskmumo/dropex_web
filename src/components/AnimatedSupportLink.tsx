'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

interface AnimatedSupportLinkProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export function AnimatedSupportLink({ href, icon: Icon, children }: AnimatedSupportLinkProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      <Link
        href={href}
        className="text-base text-gray-300 hover:text-white flex items-center transition-all duration-300 magic-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="mr-2 w-5 h-5" />
        {children}
      </Link>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 p-4 bg-gray-700 rounded-lg shadow-xl z-10 w-64 glass-effect"
          >
            <p className="text-sm text-gray-300">Click to visit the {children} page</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

