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
import { MoreHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react'
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
  const [sortColumn, setSortColumn] = useState('')
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

  const handleSort = (column: string) => {
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
            <Table.Header>
              <Table.Row>
                <Table.Head className="w-[100px]">ID</Table.Head>
                <Table.Head>
                  <Button variant="ghost" onClick={() => handleSort('trackingNumber')}>
                    Tracking Number <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </Table.Head>
                <Table.Head>
                  <Button variant="ghost" onClick={() => handleSort('status')}>
                    Status <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </Table.Head>
                <Table.Head>Origin</Table.Head>
                <Table.Head>Origin</Table.Head>
                <Table.Head>Destination</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedParcels.map((parcel) => (
                <Table.Row key={parcel.id} onClick={() => setSelectedParcel(parcel)} className="cursor-pointer">
                  <Table.Cell className="font-medium">{parcel.id}</Table.Cell>
                  <Table.Cell>{parcel.trackingNumber}</Table.Cell>
                  <Table.Cell>{parcel.status}</Table.Cell>
                  <Table.Cell>{parcel.origin}</Table.Cell>
                  <Table.Cell>{parcel.destination}</Table.Cell>
                  <Table.Cell className="text-right">
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
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Parcel Location</h2>
          <div style={{ height: '400px' }}>
            <MapContainer center={[selectedParcel.lat, selectedParcel.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

