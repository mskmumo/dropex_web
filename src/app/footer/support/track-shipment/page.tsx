import React from 'react'
import SupportLayout from '../support-layout'

export default function TrackShipmentPage() {
  return (
    <SupportLayout currentPage="/track-shipment">
      <h1 className="text-3xl font-bold mb-6">Track My Shipment</h1>
      <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
        <form className="space-y-4">
          <div>
            <label htmlFor="tracking-number" className="block text-sm font-medium mb-1">Tracking Number</label>
            <input type="text" id="tracking-number" className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-lg text-white" placeholder="Enter your tracking number" />
          </div>
          <button type="submit" className="px-6 py-2 bg-white text-indigo-900 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">Track Shipment</button>
        </form>
      </div>
      <div className="mt-8 bg-indigo-800 bg-opacity-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Shipment Status</h2>
        <p>Enter your tracking number above to see the current status and location of your shipment.</p>
      </div>
    </SupportLayout>
  )
}

