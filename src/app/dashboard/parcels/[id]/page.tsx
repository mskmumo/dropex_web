'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type ParcelLocation = {
  lat: number
  lng: number
  status: string
}

export default function ParcelTrackingPage() {
  const params = useParams()
  const [parcelLocation, setParcelLocation] = useState<ParcelLocation | null>(null)

  useEffect(() => {
    // This is a placeholder. We'll implement real data fetching later.
    setParcelLocation({
      lat: 51.505,
      lng: -0.09,
      status: 'In Transit'
    })
  }, [params.id])

  if (!parcelLocation) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Parcel Tracking</CardTitle>
          <CardDescription>Track your parcel in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <strong>Status:</strong> {parcelLocation.status}
          </div>
          <div style={{ height: '400px' }}>
            <MapContainer center={[parcelLocation.lat, parcelLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[parcelLocation.lat, parcelLocation.lng]}>
                <Popup>
                  Your parcel is here!
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

