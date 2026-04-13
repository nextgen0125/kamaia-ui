
import CompanyWorkspaceKPIs from "@/components/companies/workspace/company-workspace-kpis"
import CompanyActivityAndChat from "@/components/companies/workspace/company-activity-and-chat"
import CardCompanyTeamMembers from "@/components/companies/workspace/card-company-team-members"
import CardCompanyNotifications from "@/components/companies/workspace/card-company-notifications"




export default function WorkspacePage() {

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
          <p className="text-muted-foreground">
            Colabore com sua equipe em tempo real
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <CompanyWorkspaceKPIs />

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Left Column - Activity & Chat */}
        <CompanyActivityAndChat />

        {/* Right Column - Team & Notifications */}
        <div className="space-y-4">
          {/* Team Members */}
          <CardCompanyTeamMembers />

          {/* Notifications */}
          <CardCompanyNotifications />
        </div>
      </div>
    </div>
  )
}