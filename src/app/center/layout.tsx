import { CenterSidebar } from "@/components/center/sidebar"
import { CenterHeader } from "@/components/center/header"

export default function CenterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-blue-50">
      <CenterSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CenterHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-50">
          {children}
        </main>
      </div>
    </div>
  )
}

