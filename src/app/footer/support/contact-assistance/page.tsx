import SupportLayout from '../support-layout'

export default function ContactAssistancePage() {
  return (
    <SupportLayout currentPage="/contact-assistance">
      <h1 className="text-3xl font-bold mb-6">Contact Assistance</h1>
      <div className="space-y-6">
        <div className="bg-teal-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
          <p>Our customer support team is available 24/7 to assist you. You can reach us through the following channels:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Email: support@example.com</li>
            <li>Phone: 1-800-123-4567</li>
            <li>Live Chat: Available on our website</li>
          </ul>
        </div>
        <div className="bg-teal-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">Submit a Ticket</h2>
          <p>For non-urgent inquiries, you can submit a support ticket. We'll respond within 24 hours.</p>
          <button className="mt-4 px-6 py-2 bg-white text-teal-900 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300">Submit Ticket</button>
        </div>
      </div>
    </SupportLayout>
  )
}

