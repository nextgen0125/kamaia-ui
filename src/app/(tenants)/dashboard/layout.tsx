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
        <div className="mx-auto w-full pt-2 px-2 sm:px-4 max-w-full md:max-w-5xl lg:max-w-7xl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
