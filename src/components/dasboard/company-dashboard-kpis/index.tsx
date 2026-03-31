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

export default function CompanyDashboardKPIs() {

  const { isLoading } = useCompanyDashboardContext();

    // Mock data
  const stats = {
    cases: { total: 45, change: 20, trend: "up" },
    clients: { total: 32, change: 15, trend: "up" },
    lawyers: { total: 8, change: 2, trend: "up" },
    revenue: { total: 45231.89, change: 12, trend: "up" },
  }

  return isLoading
    ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCardSkeleton />
      </div>
    : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
            <Scale className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cases.total}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="size-3 text-green-500" />
              +{stats.cases.change}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients.total}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="size-3 text-green-500" />
              +{stats.clients.change}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advogados</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lawyers.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.lawyers.change} novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue.total)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="size-3 text-green-500" />
              +{stats.revenue.change}% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>
    )
}
