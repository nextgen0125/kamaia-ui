"use client"


import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { SkeletonList, StatCardSkeleton } from "@/components/ui/skeleton-cards"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Scale,
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
} from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"
import { useCompanyKPIs } from "@/hooks/queries/use-companies"
import { useParams } from "next/navigation"
import { IWorkspaceKPIs } from "@/interfaces/ICompanyKPIS"

const trendTypeIcon = {
  "up": <TrendingUp className="size-3 text-green-500" />,
  "down": <TrendingDown className="size-3 text-red-500" />,
  "neutral": null
}

const trendTypeSymbol = {
  "up": "+",
  "down": "-",
  "neutral": null
}

const quickStats = [
  {
    title: "Tarefas Pendentes",
    value: "12",
    change: "+2 hoje",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    title: "Prazos Próximos",
    value: "5",
    change: "3 esta semana",
    icon: AlertCircle,
    color: "text-red-500",
  },
  {
    title: "Reuniões Hoje",
    value: "4",
    change: "2 concluídas",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Atividade da Equipe",
    value: "85%",
    change: "+5% vs ontem",
    icon: TrendingUp,
    color: "text-green-500",
  },
]


export default function CompanyWorkspaceKPIs() {
  const params = useParams();

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingKpis, data: kpis } = useCompanyKPIs(company?.id as string, "workspace");

  return isLoading || isLoadingKpis
    ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {
            [1, 2, 3,4].map(item => <StatCardSkeleton key={item} />)
          }
          
      </div>
    : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card key={"Tarefas-Pendentes"}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {"Tarefas Pendentes"}
                    </CardTitle>
                    <AlertCircle className={`h-4 w-4 text-orange-500`} />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{(kpis as IWorkspaceKPIs)?.pendingTasks?.value}</div>
                <p className="text-xs text-muted-foreground">
                    {trendTypeSymbol[(kpis as IWorkspaceKPIs)?.pendingTasks?.trend || "neutral"]}{(kpis as IWorkspaceKPIs)?.pendingTasks?.numericChange} hoje
                </p>
                </CardContent>
            </Card>

            <Card key={"Prazos-Proximos"}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {"Prazos Próximos"}
                    </CardTitle>
                    <Clock className={`h-4 w-4 text-red-500`} />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{(kpis as IWorkspaceKPIs)?.upcomingDeadlines?.value}</div>
                <p className="text-xs text-muted-foreground">
                    {(kpis as IWorkspaceKPIs)?.upcomingDeadlines?.numericChange} esta semana
                </p>
                </CardContent>
            </Card>

            <Card key={"Reuniões-Hoje"}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {"Reuniões Hoje"}
                    </CardTitle>
                    <Calendar className={`h-4 w-4 text-blue-500`} />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{(kpis as IWorkspaceKPIs)?.meetingsToday?.value}</div>
                <p className="text-xs text-muted-foreground">
                    {(kpis as IWorkspaceKPIs)?.meetingsToday?.numericChange} concluídas
                </p>
                </CardContent>
            </Card>

            <Card key={"Atividade-da-Equipe"}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {"Atividade da Equipe"}
                    </CardTitle>
                    <TrendingUp className={`h-4 w-4 text-green-500`} />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{(kpis as IWorkspaceKPIs)?.teamActivity?.value}%</div>
                <p className="text-xs text-muted-foreground">
                    {trendTypeSymbol[(kpis as IWorkspaceKPIs)?.teamActivity?.trend || "neutral"]}{(kpis as IWorkspaceKPIs)?.teamActivity?.percentChange} vs ontem
                </p>
                </CardContent>
            </Card>
        </div>
        )
}
