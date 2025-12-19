import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dasboard/dashboard-header";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="mx-auto w-full pt-8 px-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
