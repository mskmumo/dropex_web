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

interface Parcel {
  id: number
  tracking_number: string
  status: string
  origin: string
  destination: string
}

export function ParcelList() {
  const [parcels, setParcels] = useState<Parcel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const fetchParcels = async () => {
      const { data, error } = await supabase
        .from('parcels')
        .select('*')
      
      if (error) {
        console.error('Error fetching parcels:', error)
      } else {
        setParcels(data)
      }
    }

    fetchParcels()

    const subscription = supabase
      .channel('parcels')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'parcels' }, payload => {
        if (payload.eventType === 'INSERT') {
          setParcels(current => [...current, payload.new as Parcel])
        } else if (payload.eventType === 'UPDATE') {
          setParcels(current => current.map(parcel => parcel.id === payload.new.id ? payload.new as Parcel : parcel))
        } else if (payload.eventType === 'DELETE') {
          setParcels(current => current.filter(parcel => parcel.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const filteredParcels = parcels.filter(parcel => 
    parcel.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <Button variant="ghost" onClick={() => handleSort('tracking_number')}>
                Tracking Number <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>Origin</Table.Head>
            <Table.Head>Destination</Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedParcels.map((parcel) => (
            <Table.Row key={parcel.id}>
              <Table.Cell className="font-medium">{parcel.id}</Table.Cell>
              <Table.Cell>{parcel.tracking_number}</Table.Cell>
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
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem>Assign task</DropdownMenuItem>
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

