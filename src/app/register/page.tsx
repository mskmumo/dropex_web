"use client"

import RegisterForm from '@/components/auth-form'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"

export default function RegisterPage() {
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
      {/* Form Container */}
      <div className="flex flex-grow items-center justify-center z-20 relative">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-900" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            Join Dropex Today and Simplify Your Shipping!
          </h2>

          <RegisterForm />
        </div>
      </div>

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
                <h3 className="font-bold mb-2">Why Register to Dropex?</h3>
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
