import CompanyDashboardKPIs from "@/components/companies/dashboard/company-dashboard-kpis"
import CardCompanyDashboardRecentCases from "@/components/companies/dashboard/card-company-dashboard-recent-cases"
import CardCompanyProcessesByArea from "@/components/companies/dashboard/card-company-processes-by-area"
import CardCompanyUpcomingDeadlines from "@/components/companies/dashboard/card-company-upcoming-deadlines"
import CardCompanyRecentActivities from "@/components/companies/dashboard/card-company-recent-activities"
import CardCompanyDashboardQuickActions from "@/components/companies/dashboard/card-company-dashboard-quick-actions"

export default function DashboardPage() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu escritório jurídico
        </p>
      </div>

      {/* Main Stats */}
      <CompanyDashboardKPIs />

      <div className="grid gap-4 lg:grid-cols-7 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Recent Cases */}
        <CardCompanyDashboardRecentCases />

        {/* Cases by Area */}
        <CardCompanyProcessesByArea />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Upcoming Deadlines */}
        <CardCompanyUpcomingDeadlines />

        {/* Recent Activities */}
        <CardCompanyRecentActivities />
      </div>

      {/* Quick Actions */}
      <CardCompanyDashboardQuickActions />
    </div>
  )
}
