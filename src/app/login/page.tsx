"use client"

import { useState } from 'react'

import LoginForm from '@/components/login-form'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"

export default function LoginPage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Background Image */}
      <Image
        src="/assets/drop ex banner.png?height=1080&width=1920"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

      {/* Header */}
      <header className="relative z-20 bg-navy-blue bg-opacity-90 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center bg-navyBlue p-2">
                  <Image
              src="/images/logo.png"
              alt="Dropex Logo"
              width={50}
              height={50}
              className="filter brightness-0 invert"
            />
            <span className="ml-2 text-xl font-bold text-white">Dropex</span>
          </div>
          
          <Button
            onClick={() => setShowInfo(!showInfo)}
            variant="outline"
          >
            Why Dropex?
          </Button>
        </div>
      </header>
<br />
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-20">
        <div className="w-full max-w-md px-6 py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
          <LoginForm />
        </div>
      </main>

      {/* Info Card */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 right-4 z-30"
          >
            <Card className="w-64">
              <CardContent className="p-4">
                <h3 className="font-bold mb-2">Why Login to Dropex?</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Track your parcels in real-time</li>
                  <li>Manage multiple shipments easily</li>
                  <li>Access exclusive shipping rates</li>
                  <li>24/7 customer support</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}