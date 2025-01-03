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

const orders = [
  { id: 1, user: 'John Doe', status: 'Pending', total: '$100.00', date: '2023-07-01' },
  { id: 2, user: 'Jane Smith', status: 'Shipped', total: '$150.00', date: '2023-07-02' },
  { id: 3, user: 'Bob Johnson', status: 'Delivered', total: '$200.00', date: '2023-07-03' },
  // Add more order data as needed
]

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredOrders = orders.filter(order => 
    order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedOrders = [...filteredOrders].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search orders..."
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
              <Button variant="ghost" onClick={() => handleSort('user')}>
                User <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('total')}>
                Total <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('date')}>
                Date <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedOrders.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell className="font-medium">{order.id}</Table.Cell>
              <Table.Cell>{order.user}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>{order.total}</Table.Cell>
              <Table.Cell>{order.date}</Table.Cell>
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id.toString())}>
                      Copy order ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View order details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
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

