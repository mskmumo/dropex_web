// import { cookies } from 'next/headers'

// import { redirect } from 'next/navigation'
// import { Card, CardDescription, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
"use client"

import jwt from 'jsonwebtoken'
import { PaymentsSection } from '@/components/dashboard/payments-section'
// import { QuickActionsSection } from '@/components/dashboard/quick-actions-section'
import Head from 'next/head'
// import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@react-stripe-js'
import PaymentForm from '@/components/dashboard/payment-form'
import { OnlineOrdersSection } from '@/components/dashboard/online-orders-section';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
// import  cookies  from 'next/headers'

interface Location {
  lat: number;
  lng: number;
}

interface ParcelTrackingSectionProps {
  parcelLocation: Location;
}

const defaultLocation = {
  lat: 0,
  lng: 0
};

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};


export function ParcelTrackingSection({ parcelLocation = defaultLocation }: ParcelTrackingSectionProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);


  return (
    <div className="tracking-section">
      <h2 className="text-2xl font-bold mb-4">Parcel Tracking</h2>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={parcelLocation}
          zoom={12}
          onLoad={map => setMap(map)}
        >
          <Marker position={parcelLocation} />
        </GoogleMap>
      </LoadScript>
      
      <div className="mt-4">
        <p>Current Location:</p>
        <p>Latitude: {parcelLocation.lat}</p>
        <p>Longitude: {parcelLocation.lng}</p>
      </div>
    </div>
  );
}

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
// Removed unused GOOGLE_MAPS_API_KEY variable

// export async function getAuthData() {
//   const cookieStore = cookies()
//   return {
//     token: cookieStore.get('token')?.value,
//     // other cookie data you need
//   }
// }

export default function CustomerDashboard() {
  const [files, setFiles] = useState<Array<{ name: string; preview: string }>>([])
  const [parcelLocation] = useState<Location>({ lat: 40.7128, lng: -74.0060 })

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  useEffect(() => {
    const checkToken = async () => {
      const token = (await cookies()).get('token')?.value

      if (!token) {
        redirect('/login')
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string }

      if (decodedToken.role !== 'CUSTOMER') {
        redirect('/admin')
      }
    }

    checkToken()
  }, [])

  return (
    <>
      <Head>
        <title>Customer Dashboard - Dropex</title>
        <meta name="description" content="Manage your orders, track parcels, and participate in auctions." />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ParcelTrackingSection parcelLocation={parcelLocation} />
          <PaymentsSection />
          {/* <QuickActionsSection /> */}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Online Orders</h2>
          <OnlineOrdersSection />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">File Upload</h2>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
          </div>
          <div className="mt-4 flex flex-wrap">
            {files.map(file => (
              <div key={file.name} className="m-2">
                <img src={file.preview} alt={file.name} style={{ width: '100px', height: '100px' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          {/* <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements> */}
        </div>
      </div>
    </>
  )
}

