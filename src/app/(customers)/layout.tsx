import AuthGuard from "@/components/auth/auth-guard"
import { CustomerHeader } from "@/components/customers/customer-header"
import { CustomerSidebar } from "@/components/customers/customer-sidebar"

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthGuard
      onlyCoustumer
    >
      <div className="flex min-h-screen">
        <CustomerSidebar />
        <div className="flex-1 flex flex-col">
          <CustomerHeader />
          <main className="flex-1 p-6 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
