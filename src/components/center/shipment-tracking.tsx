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

const shipments = {
  incoming: [
    { id: 1, trackingNumber: 'IN001', status: 'In Transit', supplier: 'Supplier A', expectedArrival: '2023-07-10' },
    { id: 2, trackingNumber: 'IN002', status: 'Arrived', supplier: 'Supplier B', expectedArrival: '2023-07-09' },
    { id: 3, trackingNumber: 'IN003', status: 'Delayed', supplier: 'Supplier C', expectedArrival: '2023-07-12' },
  ],
  outgoing: [
    { id: 1, trackingNumber: 'OUT001', status: 'Shipped', customer: 'Customer X', shippedDate: '2023-07-08' },
    { id: 2, trackingNumber: 'OUT002', status: 'Processing', customer: 'Customer Y', shippedDate: 'N/A' },
    { id: 3, trackingNumber: 'OUT003', status: 'Delivered', customer: 'Customer Z', shippedDate: '2023-07-07' },
  ],
}

export function ShipmentTracking({ type }: { type: 'incoming' | 'outgoing' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredShipments = shipments[type].filter(shipment => 
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedShipments = [...filteredShipments].sort((a, b) => {
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
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder={`Search ${type} shipments...`}
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
            <Table.Head>
              {type === 'incoming' ? 'Supplier' : 'Customer'}
            </Table.Head>
            <Table.Head>
              {type === 'incoming' ? 'Expected Arrival' : 'Shipped Date'}
            </Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedShipments.map((shipment) => (
            <Table.Row key={shipment.id}>
              <Table.Cell className="font-medium">{shipment.id}</Table.Cell>
              <Table.Cell>{shipment.trackingNumber}</Table.Cell>
              <Table.Cell>{shipment.status}</Table.Cell>
              <Table.Cell>{type === 'incoming' ? shipment.supplier : shipment.customer}</Table.Cell>
              <Table.Cell>{type === 'incoming' ? shipment.expectedArrival : shipment.shippedDate}</Table.Cell>
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(shipment.id.toString())}>
                      Copy shipment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    {type === 'incoming' && <DropdownMenuItem>Mark as received</DropdownMenuItem>}
                    {type === 'outgoing' && <DropdownMenuItem>Generate shipping label</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

