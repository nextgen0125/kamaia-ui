"use client"


import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { ActivitySkeleton, StatCardSkeleton } from "@/components/ui/skeleton-cards"
import {
  Calendar,
  FileText,
  CheckCircle2,
  UserPlus,
} from "lucide-react"
import { useCompanyKPIs } from "@/hooks/queries/use-companies"
import { useParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "case",
    user: "Dr. João Silva",
    action: "criou um novo processo",
    target: "Ação Trabalhista - Horas Extras",
    time: "5 min atrás",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "document",
    user: "Dra. Maria Santos",
    action: "fez upload de um documento",
    target: "Petição Inicial.pdf",
    time: "15 min atrás",
    icon: File,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "client",
    user: "Dr. Pedro Costa",
    action: "cadastrou um novo cliente",
    target: "Tech Solutions S/A",
    time: "1h atrás",
    icon: UserPlus,
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "task",
    user: "Ana Carolina",
    action: "concluiu uma tarefa",
    target: "Revisar contratos mensais",
    time: "2h atrás",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
  {
    id: 5,
    type: "meeting",
    user: "Dra. Maria Santos",
    action: "agendou uma reunião",
    target: "Audiência de Conciliação",
    time: "3h atrás",
    icon: Calendar,
    color: "text-orange-500",
  },
]


export default function CompanyWorkspaceActivityFeedTab() {
  const params = useParams();

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingKpis, data: kpis } = useCompanyKPIs(company?.id as string, "workspace");

  return isLoading || isLoadingKpis
    ? <ActivitySkeleton />
    : (
            <>
                <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className={`rounded-full p-2 bg-muted ${activity.color}`}>
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action}{" "}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
            </>
        )
}
