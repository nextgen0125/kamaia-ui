"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react"

interface AnalyticsDashboardProps {
  period?: "week" | "month" | "quarter" | "year"
}

export function AnalyticsDashboard({ period = "month" }: AnalyticsDashboardProps) {
  // Mock data - substituir por dados reais da API
  const stats = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6,
    },
    cases: {
      total: 48,
      active: 32,
      completed: 12,
      archived: 4,
    },
    clients: {
      total: 67,
      new: 8,
      active: 54,
      inactive: 13,
    },
    tasks: {
      total: 156,
      completed: 98,
      pending: 45,
      overdue: 13,
    },
  }

  const casesByArea = [
    { area: "Direito Trabalhista", count: 18, percentage: 37.5, color: "bg-blue-500" },
    { area: "Direito Civil", count: 12, percentage: 25, color: "bg-green-500" },
    { area: "Direito Empresarial", count: 10, percentage: 20.8, color: "bg-purple-500" },
    { area: "Direito de Família", count: 5, percentage: 10.4, color: "bg-orange-500" },
    { area: "Outros", count: 3, percentage: 6.3, color: "bg-gray-500" },
  ]

  const topLawyers = [
    {
      name: "Dr. João Silva",
      cases: 15,
      revenue: 45000,
      successRate: 92,
    },
    {
      name: "Dra. Maria Santos",
      cases: 12,
      revenue: 38000,
      successRate: 88,
    },
    {
      name: "Dr. Pedro Costa",
      cases: 10,
      revenue: 32000,
      successRate: 85,
    },
  ]

  const monthlyRevenue = [
    { month: "Jan", revenue: 85000 },
    { month: "Fev", revenue: 92000 },
    { month: "Mar", revenue: 125000 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
    }).format(value)
  }

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">+{growth.toFixed(1)}%</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{growth.toFixed(1)}%</span>
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho do escritório
          </p>
        </div>
        <Select defaultValue={period}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="quarter">Último trimestre</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.revenue.current)}
            </div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(stats.revenue.growth)}
              <p className="text-xs text-muted-foreground">
                vs. período anterior
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cases.total}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="default">{stats.cases.active} ativos</Badge>
              <Badge variant="outline">{stats.cases.completed} concluídos</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients.total}</div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-green-600">+{stats.clients.new}</span> novos este período
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.total}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{stats.tasks.completed} concluídas</Badge>
              {stats.tasks.overdue > 0 && (
                <Badge variant="destructive">{stats.tasks.overdue} atrasadas</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Cases by Area */}
        <Card>
          <CardHeader>
            <CardTitle>Processos por Área do Direito</CardTitle>
            <CardDescription>Distribuição dos casos ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {casesByArea.map((item) => (
                <div key={item.area} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.count}</span>
                      <span className="text-xs text-muted-foreground">
                        ({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Lawyers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Advogados</CardTitle>
            <CardDescription>Performance dos advogados no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLawyers.map((lawyer, index) => (
                <div key={lawyer.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lawyer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{lawyer.cases} casos</span>
                        <span>•</span>
                        <span>{formatCurrency(lawyer.revenue)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{lawyer.successRate}%</p>
                    <p className="text-xs text-muted-foreground">taxa sucesso</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Receita</CardTitle>
          <CardDescription>Receita mensal nos últimos 3 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenue.map((item, index) => {
              const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))
              const percentage = (item.revenue / maxRevenue) * 100
              const growth = index > 0 
                ? ((item.revenue - monthlyRevenue[index - 1].revenue) / monthlyRevenue[index - 1].revenue) * 100 
                : 0

              return (
                <div key={item.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.month}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {formatCurrency(item.revenue)}
                      </span>
                      {index > 0 && (
                        <span className={`text-xs ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((stats.tasks.completed / stats.tasks.total) * 100).toFixed(0)}%
            </div>
            <Progress 
              value={(stats.tasks.completed / stats.tasks.total) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazo Médio</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 dias</div>
            <p className="text-xs text-muted-foreground mt-2">
              Para conclusão de tarefas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.overdue}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Tarefas com prazo vencido
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
