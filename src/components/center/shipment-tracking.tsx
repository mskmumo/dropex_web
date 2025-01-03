"use client"

import { useEffect, useState } from 'react'
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
import { createClientSupabaseClient } from "@/lib/supabase"

interface Shipment {
  id: number
  tracking_number: string
  status: string
  supplier: string
  customer: string
  expected_arrival: string
  shipped_date: string
  type: 'INCOMING' | 'OUTGOING'
}

export function ShipmentTracking({ type }: { type: 'INCOMING' | 'OUTGOING' }) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchShipments = async () => {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('type', type)
      
      if (error) {
        console.error('Error fetching shipments:', error)
      } else {
        setShipments(data)
      }
    }

    fetchShipments()

    const subscription = supabase
      .channel('shipments')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shipments' }, payload => {
        if (payload.eventType === 'INSERT' && payload.new.type === type) {
          setShipments(current => [...current, payload.new as Shipment])
        } else if (payload.eventType === 'UPDATE' && payload.new.type === type) {
          setShipments(current => current.map(shipment => shipment.id === payload.new.id ? payload.new as Shipment : shipment))
        } else if (payload.eventType === 'DELETE') {
          setShipments(current => current.filter(shipment => shipment.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, type])

  const filteredShipments = shipments.filter(shipment => 
    shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          placeholder={`Search ${type.toLowerCase()} shipments...`}
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
              <Button variant="ghost" onClick={() => handleSort('tracking_number')}>
                Tracking Number <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              {type === 'INCOMING' ? 'Supplier' : 'Customer'}
            </Table.Head>
            <Table.Head>
              {type === 'INCOMING' ? 'Expected Arrival' : 'Shipped Date'}
            </Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedShipments.map((shipment) => (
            <Table.Row key={shipment.id}>
              <Table.Cell className="font-medium">{shipment.id}</Table.Cell>
              <Table.Cell>{shipment.tracking_number}</Table.Cell>
              <Table.Cell>{shipment.status}</Table.Cell>
              <Table.Cell>{type === 'INCOMING' ? shipment.supplier : shipment.customer}</Table.Cell>
              <Table.Cell>{type === 'INCOMING' ? shipment.expected_arrival : shipment.shipped_date}</Table.Cell>
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
                    {type === 'INCOMING' && <DropdownMenuItem>Mark as received</DropdownMenuItem>}
                    {type === 'OUTGOING' && <DropdownMenuItem>Generate shipping label</DropdownMenuItem>}
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

