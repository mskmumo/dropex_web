'use client'

import { useState } from 'react'
import { Table, TableHead } from '@/components/ui/table'
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

const auctions = [
  { id: 1, title: 'Vintage Watch', seller: 'John Doe', currentBid: '$500.00', endTime: '2023-07-10 15:00:00', status: 'Active' },
  { id: 2, title: 'Antique Vase', seller: 'Jane Smith', currentBid: '$300.00', endTime: '2023-07-11 12:00:00', status: 'Pending' },
  { id: 3, title: 'Rare Coin', seller: 'Bob Johnson', currentBid: '$1000.00', endTime: '2023-07-09 18:00:00', status: 'Ended' },
  // Add more auction data as needed
]

export default function AuctionManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredAuctions = auctions.filter(auction => 
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.seller.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
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
      <h1 className="text-2xl font-bold mb-4">Auction Management</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search auctions..."
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
              <Button variant="ghost" onClick={() => handleSort('title')}>
                Title <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('seller')}>
                Seller <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('currentBid')}>
                Current Bid <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('endTime')}>
                End Time <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </Table.Head>
            <Table.Head className="text-right">Actions</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedAuctions.map((auction) => (
            <Table.Row key={auction.id}>
              <Table.Cell className="font-medium">{auction.id}</Table.Cell>
              <Table.Cell>{auction.title}</Table.Cell>
              <Table.Cell>{auction.seller}</Table.Cell>
              <Table.Cell>{auction.currentBid}</Table.Cell>
              <Table.Cell>{auction.endTime}</Table.Cell>
              <Table.Cell>{auction.status}</Table.Cell>
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
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(auction.id.toString())}>
                      Copy auction ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View auction details</DropdownMenuItem>
                    <DropdownMenuItem>Edit auction</DropdownMenuItem>
                    <DropdownMenuItem>End auction</DropdownMenuItem>
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

