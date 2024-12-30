import SupportLayout from '../support-layout'

export default function UserGuidePage() {
  return (
    <SupportLayout currentPage="/user-guide">
      <h1 className="text-3xl font-bold mb-6">User Guide</h1>
      <div className="space-y-6">
        <div className="bg-blue-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p>Welcome to our platform! This guide will walk you through the basic features and how to make the most of our services.</p>
        </div>
        <div className="bg-blue-800 bg-opacity-50 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-75">
          <h2 className="text-xl font-semibold mb-2">Account Management</h2>
          <p>Learn how to update your profile, manage your settings, and customize your experience on our platform.</p>
        </div>
        {/* Add more user guide sections as needed */}
      </div>
    </SupportLayout>
  )
}

