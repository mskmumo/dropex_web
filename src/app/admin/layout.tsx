// import { AdminSidebar } from "@/components/admin/sidebar"
// import { AdminHeader } from "@/components/admin/header"

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <AdminHeader />
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Dropex Logistics</span>
              </div>
            </div>
            <div className="flex items-center">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

