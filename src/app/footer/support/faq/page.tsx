import SupportLayout from '../support-layout'

export default function FAQPage() {
  return (
    <SupportLayout currentPage="/faq">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">How do I create an account?</h2>
          <p>To create an account, click on the "Sign Up" button in the top right corner of our homepage. Follow the prompts to enter your information and set up your account.</p>
        </div>
        <div className="bg-purple-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">What payment methods do you accept?</h2>
          <p>We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For more details, please visit our Payment Options page.</p>
        </div>
        {/* Add more FAQ items as needed */}
      </div>
    </SupportLayout>
  )
}

