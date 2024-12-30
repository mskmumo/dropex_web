import { AuctionList } from '@/components/dashboard/auction-list'
import { CreateAuctionForm } from '@/components/dashboard/create-auction-form'

export default function AuctionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AuctionList />
        <CreateAuctionForm />
      </div>
    </div>
  )
}

