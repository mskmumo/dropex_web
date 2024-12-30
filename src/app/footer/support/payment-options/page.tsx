import SupportLayout from '../support-layout'
import { CreditCard, ShoppingCartIcon as Paypal, BanknoteIcon as Bank } from 'lucide-react'

export default function PaymentOptionsPage() {
  return (
<SupportLayout currentPage="/payment-options">
  <h1 className="text-3xl font-bold mb-6">Payment Options</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Credit Card Payment Form */}
    <div className="bg-green-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
      <CreditCard className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Credit Cards</h2>
      <p>We accept Visa, MasterCard, and American Express. Your transactions are secure and encrypted.</p>
      <form action="/process-credit-card-payment" method="POST" className="mt-4">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Expiration Date</label>
          <input
            type="month"
            name="expiryDate"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="123"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800"
        >
          Pay Now
        </button>
      </form>
    </div>

    {/* PayPal Payment Link */}
    <a
      href="https://www.paypal.com/checkout"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75 block"
    >
      <Paypal className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold mb-2">PayPal</h2>
      <p>Pay easily and securely using your PayPal account. Link your bank account or cards to PayPal for quick checkout.</p>
    </a>

    {/* Bank Transfer Instructions */}
    <div className="bg-green-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
      <Bank className="w-12 h-12 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Bank Transfer</h2>
      <p>For larger transactions, use the following bank details to make a direct transfer:</p>
      <ul className="mt-4 text-sm">
        <li><strong>Bank Name:</strong> Example Bank</li>
        <li><strong>Account Name:</strong> ABC Payments</li>
        <li><strong>Account Number:</strong> 1234567890</li>
        <li><strong>SWIFT Code:</strong> ABCD1234</li>
      </ul>
      <p className="mt-4">After making the transfer, email us your payment receipt at <a href="mailto:payments@example.com" className="underline">payments@example.com</a>.</p>
    </div>
  </div>
</SupportLayout>


  )
}

