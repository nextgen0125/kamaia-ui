"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Target,
  Calendar,
  Download,
  BarChart3,
  PieChart,
} from "lucide-react"

export default function AnalyticsPage() {
  const kpis = {
    revenue: { current: 45230, previous: 38500, growth: 17.5, target: 50000 },
    tenants: { current: 45, previous: 39, growth: 15.4, target: 60 },
    users: { current: 234, previous: 198, growth: 18.2, target: 300 },
    churn: { current: 2.3, previous: 3.1, growth: -25.8, target: 2.0 },
  }

  const revenueByPlan = [
    { plan: "Enterprise", revenue: 24950, percentage: 55.2, tenants: 5 },
    { plan: "Professional", revenue: 13972, percentage: 30.9, tenants: 28 },
    { plan: "Starter", revenue: 6308, percentage: 13.9, tenants: 12 },
  ]

  const growthMetrics = [
    { month: "Out", tenants: 32, revenue: 28500, users: 165 },
    { month: "Nov", tenants: 36, revenue: 32800, users: 182 },
    { month: "Dez", tenants: 39, revenue: 38500, users: 198 },
    { month: "Jan", tenants: 42, revenue: 41200, users: 215 },
    { month: "Fev", tenants: 44, revenue: 43800, users: 228 },
    { month: "Mar", tenants: 45, revenue: 45230, users: 234 },
  ]

  const topTenants = [
    { name: "Escritório Mendes", plan: "Enterprise", mrr: 4990, users: 25, growth: 5.2 },
    { name: "Legal Tech Solutions", plan: "Enterprise", mrr: 4990, users: 18, growth: 12.5 },
    { name: "Silva & Associados", plan: "Professional", mrr: 1990, users: 12, growth: 8.3 },
    { name: "Costa Advogados", plan: "Professional", mrr: 1990, users: 15, growth: -2.1 },
    { name: "Advocacia Moderna", plan: "Professional", mrr: 1990, users: 10, growth: 15.7 },
  ]

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "AOA", minimumFractionDigits: 0 }).format(value)

  const getGrowthIndicator = (growth: number) => {
    const isPositive = growth > 0
    return (
      <div className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
        <span className="text-xs font-medium">{isPositive ? "+" : ""}{growth.toFixed(1)}%</span>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">Análise detalhada da plataforma</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.revenue.current)}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.revenue.growth)}
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {formatCurrency(kpis.revenue.target)}</span>
                <span className="font-medium">{((kpis.revenue.current / kpis.revenue.target) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(kpis.revenue.current / kpis.revenue.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.tenants.current}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.tenants.growth)}
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.tenants.target}</span>
                <span className="font-medium">{((kpis.tenants.current / kpis.tenants.target) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(kpis.tenants.current / kpis.tenants.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.users.current}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.users.growth)}
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.users.target}</span>
                <span className="font-medium">{((kpis.users.current / kpis.users.target) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(kpis.users.current / kpis.users.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.churn.current}%</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.churn.growth)}
              <span className="text-xs text-muted-foreground">vs. mês anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.churn.target}%</span>
                <Badge variant={kpis.churn.current <= kpis.churn.target ? "default" : "destructive"}>
                  {kpis.churn.current <= kpis.churn.target ? "Atingido" : "Acima"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue by Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Receita por Plano
            </CardTitle>
            <CardDescription>Distribuição do MRR</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByPlan.map((item) => (
                <div key={item.plan} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.plan}</span>
                      <Badge variant="secondary">{item.tenants} tenants</Badge>
                    </div>
                    <span className="font-bold">{formatCurrency(item.revenue)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.percentage} className="flex-1" />
                    <span className="text-sm font-medium">{item.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Crescimento Mensal
            </CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {growthMetrics.map((item) => (
                <div key={item.month} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{item.tenants} tenants</span>
                      <span className="font-bold">{formatCurrency(item.revenue)}</span>
                    </div>
                  </div>
                  <Progress value={(item.revenue / 50000) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tenants */}
      <Card>
        <CardHeader>
          <CardTitle>Top Tenants por Receita</CardTitle>
          <CardDescription>Maiores geradores de receita</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTenants.map((tenant, index) => (
              <div key={tenant.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{tenant.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{tenant.plan}</Badge>
                      <span>•</span>
                      <span>{tenant.users} usuários</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(tenant.mrr)}/mês</p>
                  {getGrowthIndicator(tenant.growth)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
