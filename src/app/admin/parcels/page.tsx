'use client'

import { useState } from 'react'
import { Table } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const parcels = [
  { id: 1, trackingNumber: 'TRK001', status: 'In Transit', origin: 'New York', destination: 'Los Angeles', lat: 40.7128, lng: -74.0060 },
  { id: 2, trackingNumber: 'TRK002', status: 'Delivered', origin: 'Chicago', destination: 'Houston', lat: 41.8781, lng: -87.6298 },
  { id: 3, trackingNumber: 'TRK003', status: 'Processing', origin: 'Miami', destination: 'Seattle', lat: 25.7617, lng: -80.1918 },
  // Add more parcel data as needed
]

export default function ParcelTracking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof typeof parcels[0] | ''>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedParcel, setSelectedParcel] = useState(parcels[0])

  const filteredParcels = parcels.filter(parcel => 
    parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedParcels = [...filteredParcels].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  const handleSort = (column: keyof typeof parcels[0] | '') => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Parcel Tracking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search parcels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <thead>
              <tr>
                <th className="w-[100px]">ID</th>
                <th>
                  <Button variant="ghost" onClick={() => handleSort('trackingNumber')}>
                    Tracking Number <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th>
                  <Button variant="ghost" onClick={() => handleSort('status')}>
                    Status <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th>Origin</th>
                <th>Destination</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedParcels.map((parcel) => (
                <tr key={parcel.id} onClick={() => setSelectedParcel(parcel)} className="cursor-pointer">
                  <td className="font-medium">{parcel.id}</td>
                  <td>{parcel.trackingNumber}</td>
                  <td>{parcel.status}</td>
                  <td>{parcel.origin}</td>
                  <td>{parcel.destination}</td>
                  <td className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(parcel.id.toString())}>
                          Copy parcel ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View parcel details</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                        <DropdownMenuItem>Print label</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Parcel Location</h2>
          <div className="map-container">
            <MapContainer center={[selectedParcel.lat, selectedParcel.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[selectedParcel.lat, selectedParcel.lng]}>
                <Popup>
                  Tracking Number: {selectedParcel.trackingNumber}<br />
                  Status: {selectedParcel.status}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

