'use client'

import { useState } from 'react'
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";



interface Auction {
  id: number;
  title: string;
  seller: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  currentPrice: number;
  endTime: string;
  [key: string]: unknown;
}
const auctions: Auction[] = [
  {
    id: 1, title: 'Vintage Watch', seller: 'John Doe', currentBid: '$500.00', status: 'Active',
    description: '',
    endDate: '',
    endTime: '2023-07-10 15:00:00',
    currentPrice: 0,
    startDate: ''
  },
  {
    id: 2, title: 'Antique Vase', seller: 'Jane Smith', currentBid: '$300.00', status: 'Pending',
    description: '',
    startDate: '',
    endDate: '',
    endTime: '2023-07-11 12:00:00',
    currentPrice: 0
  },
  {
    id: 3,
    title: 'Rare Coin',
    seller: 'Bob Johnson',
    currentBid: '$1000.00',
    status: 'Ended',
    description: 'Rare collectible coin',
    startDate: '2023-07-08',
    endDate: '2023-07-09',
    endTime: '2023-07-09 18:00:00',
    currentPrice: 1000
  // Add more auction data as needed
  }
];

export default function AuctionManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof Auction>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const filteredAuctions = auctions.filter(auction => 
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.seller.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortAuctions = (auctions: Auction[]) => {
    return [...auctions].sort((a: Auction, b: Auction) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (sortDirection === 'asc') {
        return (aValue as string | number) > (bValue as string | number) ? 1 : -1;
      }
      return (aValue as string | number) < (bValue as string | number) ? 1 : -1;
    });
  };

  const handleSort = (column: keyof Auction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

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
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('title')}>
                Title <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('seller')}>
                Seller <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('currentBid')}>
                Current Bid <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('endTime')}>
                End Time <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortAuctions(filteredAuctions).map((auction: Auction) => (
            <TableRow key={auction.id}>
              <TableCell className="font-medium">{auction.id}</TableCell>
              <TableCell>{auction.title}</TableCell>
              <TableCell>{auction.seller}</TableCell>
              <TableCell>{auction.currentBid as string}</TableCell>
              <TableCell>{auction.endTime}</TableCell>
              <TableCell>{auction.status}</TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

