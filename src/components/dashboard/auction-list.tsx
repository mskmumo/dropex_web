'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Auction = {
  id: string
  title: string
  currentBid: number
  endTime: string
}

export function AuctionList() {
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(() => {
    // This is a placeholder. We'll implement real data fetching later.
    setAuctions([
      { id: '1', title: 'Vintage Watch', currentBid: 100, endTime: '2023-07-01T00:00:00Z' },
      { id: '2', title: 'Antique Vase', currentBid: 50, endTime: '2023-07-02T00:00:00Z' },
    ])
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Auctions</CardTitle>
        <CardDescription>Bid on these items before time runs out!</CardDescription>
      </CardHeader>
      <CardContent>
        {auctions.map((auction) => (
          <div key={auction.id} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{auction.title}</h3>
            <p>Current Bid: ${auction.currentBid}</p>
            <p>Ends: {new Date(auction.endTime).toLocaleString()}</p>
            <Button className="mt-2">Place Bid</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

