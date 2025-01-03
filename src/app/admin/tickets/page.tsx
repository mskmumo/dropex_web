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

const tickets = [
  { id: 1, user: 'John Doe', subject: 'Order Delay', status: 'Open', priority: 'High', createdAt: '2023-07-01 10:00:00' },
  { id: 2, user: 'Jane Smith', subject: 'Payment Issue', status: 'In Progress', priority: 'Medium', createdAt: '2023-07-02 11:30:00' },
  { id: 3, user: 'Bob Johnson', subject: 'Account Access', status: 'Closed', priority: 'Low', createdAt: '2023-07-03 09:15:00' },
  // Add more ticket data as needed
]

export default function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredTickets = tickets.filter(ticket => 
    ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTickets = [...filteredTickets].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search tickets..."
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
              <Button variant="ghost" onClick={() => handleSort('subject')}>
                Subject <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('priority')}>
                Priority <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('createdAt')}>
                Created At <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedTickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell className="font-medium">{ticket.id}</Table.Cell>
              <Table.Cell>{ticket.user}</Table.Cell>
              <Table.Cell>{ticket.subject}</Table.Cell>
              <Table.Cell>{ticket.status}</Table.Cell>
              <Table.Cell>{ticket.priority}</Table.Cell>
              <Table.Cell>{ticket.createdAt}</Table.Cell>
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ticket.id.toString())}>
                      Copy ticket ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View ticket details</DropdownMenuItem>
                    <DropdownMenuItem>Assign to agent</DropdownMenuItem>
                    <DropdownMenuItem>Change priority</DropdownMenuItem>
                    <DropdownMenuItem>Close ticket</DropdownMenuItem>
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

