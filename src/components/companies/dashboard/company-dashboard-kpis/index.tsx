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
} from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"
import { useCompanyKPIs } from "@/hooks/queries/use-companies"
import { useParams } from "next/navigation"
import { ICompanyDashboardIKPIs } from "@/interfaces/ICompanyKPIS"

export const trendTypeIcon = {
  "up": <TrendingUp className="size-3 text-green-500" />,
  "down": <TrendingDown className="size-3 text-red-500" />,
  "neutral": null
}

export const trendTypeSymbol = {
  "up": "+",
  "down": "-",
  "neutral": null
}

export default function CompanyDashboardKPIs() {
  const params = useParams();

  const { isLoading, company } = useCompanyDashboardContext();
  const { isLoading: isLoadingCompany, data: kpis } = useCompanyKPIs(params?.company_id as string, "dashboard");

  return isLoading || isLoadingCompany
    ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {
            [1, 2, 3,4].map(item => <StatCardSkeleton key={item} />)
          }
          
      </div>
    : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
            <Scale className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyDashboardIKPIs)?.totalProcesses?.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              { trendTypeIcon[(kpis as ICompanyDashboardIKPIs)?.totalProcesses?.trend || "neutral"] }
              {trendTypeSymbol[(kpis as ICompanyDashboardIKPIs)?.totalProcesses?.trend || "neutral"]}{(kpis as ICompanyDashboardIKPIs)?.totalProcesses?.value}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyDashboardIKPIs)?.activeClients?.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              { trendTypeIcon[(kpis as ICompanyDashboardIKPIs)?.activeClients?.trend || "neutral"] }
              {trendTypeSymbol[(kpis as ICompanyDashboardIKPIs)?.activeClients?.trend || "neutral"]}{(kpis as ICompanyDashboardIKPIs)?.activeClients?.percentChange}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advogados</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(kpis as ICompanyDashboardIKPIs)?.lawyers?.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {trendTypeSymbol[(kpis as ICompanyDashboardIKPIs)?.lawyers?.trend || "neutral"]}{(kpis as ICompanyDashboardIKPIs)?.lawyers?.numericChange} novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency((kpis as ICompanyDashboardIKPIs)?.monthlyRevenue?.value ?? 0)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              { trendTypeIcon[(kpis as ICompanyDashboardIKPIs)?.monthlyRevenue?.trend || "neutral"] }
              {trendTypeSymbol[(kpis as ICompanyDashboardIKPIs)?.monthlyRevenue?.trend || "neutral"]}{(kpis as ICompanyDashboardIKPIs)?.monthlyRevenue?.percentChange}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>
    )
}
