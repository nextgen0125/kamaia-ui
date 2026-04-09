import { AppSidebar } from "@/components/app-sidebar";
import AuthGuard from "@/components/auth/auth-guard";
import DashboardHeader from "@/components/companies/dashboard/dashboard-header";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { CompanyDashboardContextProvider } from "@/contexts/company-contexts/company-dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard
      requiredCompanyRoles={
        [
          "ADMINISTRATOR",
          "ATTORNEY",
          "ASSISTANT",
          "VISUALIZER",
        ]
      }
    >
      <CompanyDashboardContextProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <DashboardHeader />
            <div className="mx-auto w-full pt-8 px-8">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </CompanyDashboardContextProvider>
    </AuthGuard>
  )
}
