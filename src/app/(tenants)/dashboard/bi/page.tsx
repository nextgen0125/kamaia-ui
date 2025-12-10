"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DollarSign,
  Users,
  Briefcase,
  Target,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { ExportDialog } from "@/components/export/export-dialog"

export default function BIDashboardPage() {
  const [period, setPeriod] = useState("month")
  const [comparison, setComparison] = useState("previous")

  // Mock data - substituir por dados reais
  const kpis = {
    revenue: {
      current: 125000,
      previous: 98000,
      growth: 27.6,
      target: 150000,
    },
    cases: {
      current: 48,
      previous: 42,
      growth: 14.3,
      target: 60,
    },
    clients: {
      current: 67,
      previous: 54,
      growth: 24.1,
      target: 80,
    },
    successRate: {
      current: 87,
      previous: 82,
      growth: 6.1,
      target: 90,
    },
  }

  const revenueByMonth = [
    { month: "Out", revenue: 75000, expenses: 45000, profit: 30000 },
    { month: "Nov", revenue: 85000, expenses: 48000, profit: 37000 },
    { month: "Dez", revenue: 98000, expenses: 52000, profit: 46000 },
    { month: "Jan", revenue: 105000, expenses: 55000, profit: 50000 },
    { month: "Fev", revenue: 115000, expenses: 58000, profit: 57000 },
    { month: "Mar", revenue: 125000, expenses: 60000, profit: 65000 },
  ]

  const casesByArea = [
    { area: "Direito Trabalhista", cases: 18, percentage: 37.5, revenue: 54000, avgValue: 3000 },
    { area: "Direito Civil", cases: 12, percentage: 25, revenue: 36000, avgValue: 3000 },
    { area: "Direito Empresarial", cases: 10, percentage: 20.8, revenue: 25000, avgValue: 2500 },
    { area: "Direito de Família", cases: 5, percentage: 10.4, revenue: 7500, avgValue: 1500 },
    { area: "Outros", cases: 3, percentage: 6.3, revenue: 2500, avgValue: 833 },
  ]

  const lawyersPerformance = [
    {
      name: "Dr. João Silva",
      cases: 15,
      revenue: 45000,
      successRate: 92,
      clientSatisfaction: 4.8,
      efficiency: 88,
    },
    {
      name: "Dra. Maria Santos",
      cases: 12,
      revenue: 38000,
      successRate: 88,
      clientSatisfaction: 4.7,
      efficiency: 85,
    },
    {
      name: "Dr. Pedro Costa",
      cases: 10,
      revenue: 32000,
      successRate: 85,
      clientSatisfaction: 4.5,
      efficiency: 82,
    },
    {
      name: "Dra. Ana Carolina",
      cases: 8,
      revenue: 28000,
      successRate: 90,
      clientSatisfaction: 4.9,
      efficiency: 87,
    },
  ]

  const clientSegmentation = [
    { segment: "Empresas (PJ)", count: 28, percentage: 41.8, revenue: 70000, avgTicket: 2500 },
    { segment: "Pessoa Física", count: 39, percentage: 58.2, revenue: 55000, avgTicket: 1410 },
  ]

  const forecastData = [
    { month: "Abr", projected: 135000, confidence: 85 },
    { month: "Mai", projected: 145000, confidence: 80 },
    { month: "Jun", projected: 155000, confidence: 75 },
  ]

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

  const getGrowthIndicator = (growth: number) => {
    const isPositive = growth > 0
    return (
      <div className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">
          {isPositive ? "+" : ""}
          {growth.toFixed(1)}%
        </span>
      </div>
    )
  }

  const maxRevenue = Math.max(...revenueByMonth.map((m) => m.revenue))

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
          <p className="text-muted-foreground">
            Análise avançada e insights estratégicos do escritório
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <ExportDialog
            title="Exportar Relatório BI"
            description="Exporte análises e dashboards"
            dataType="cases"
          >
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </ExportDialog>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpis.revenue.current)}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.revenue.growth)}
              <span className="text-xs text-muted-foreground">vs. período anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {formatCurrency(kpis.revenue.target)}</span>
                <span className="font-medium">
                  {((kpis.revenue.current / kpis.revenue.target) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(kpis.revenue.current / kpis.revenue.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.cases.current}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.cases.growth)}
              <span className="text-xs text-muted-foreground">vs. período anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.cases.target}</span>
                <span className="font-medium">
                  {((kpis.cases.current / kpis.cases.target) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(kpis.cases.current / kpis.cases.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.clients.current}</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.clients.growth)}
              <span className="text-xs text-muted-foreground">vs. período anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.clients.target}</span>
                <span className="font-medium">
                  {((kpis.clients.current / kpis.clients.target) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(kpis.clients.current / kpis.clients.target) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.successRate.current}%</div>
            <div className="flex items-center justify-between mt-2">
              {getGrowthIndicator(kpis.successRate.growth)}
              <span className="text-xs text-muted-foreground">vs. período anterior</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Meta: {kpis.successRate.target}%</span>
                <span className="font-medium">
                  {((kpis.successRate.current / kpis.successRate.target) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(kpis.successRate.current / kpis.successRate.target) * 100} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs com Análises */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">
            <BarChart3 className="mr-2 h-4 w-4" />
            Receita
          </TabsTrigger>
          <TabsTrigger value="cases">
            <PieChart className="mr-2 h-4 w-4" />
            Processos
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Equipe
          </TabsTrigger>
          <TabsTrigger value="forecast">
            <LineChart className="mr-2 h-4 w-4" />
            Previsões
          </TabsTrigger>
        </TabsList>

        {/* Revenue Analysis */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Financeira</CardTitle>
                <CardDescription>Receita, despesas e lucro nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByMonth.map((item) => {
                    const percentage = (item.revenue / maxRevenue) * 100
                    const profitMargin = (item.profit / item.revenue) * 100

                    return (
                      <div key={item.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                              Receita: {formatCurrency(item.revenue)}
                            </span>
                            <span className="font-bold text-green-600">
                              Lucro: {formatCurrency(item.profit)} ({profitMargin.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                        <div className="relative h-8">
                          <Progress value={percentage} className="h-full" />
                          <div
                            className="absolute top-0 left-0 h-full bg-red-200 dark:bg-red-900/30 rounded-full"
                            style={{ width: `${(item.expenses / maxRevenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segmentação de Clientes</CardTitle>
                <CardDescription>Receita por tipo de cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clientSegmentation.map((segment) => (
                    <div key={segment.segment} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{segment.segment}</p>
                          <p className="text-xs text-muted-foreground">
                            {segment.count} clientes • Ticket médio: {formatCurrency(segment.avgTicket)}
                          </p>
                        </div>
                        <Badge variant="secondary">{segment.percentage.toFixed(1)}%</Badge>
                      </div>
                      <Progress value={segment.percentage} />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Receita</span>
                        <span className="font-bold">{formatCurrency(segment.revenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cases Analysis */}
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos por Área do Direito</CardTitle>
              <CardDescription>Análise detalhada de distribuição e receita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {casesByArea.map((item) => (
                  <div key={item.area} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{item.area}</h4>
                          <Badge>{item.cases} casos</Badge>
                          <Badge variant="secondary">{item.percentage.toFixed(1)}%</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(item.revenue)}</p>
                        <p className="text-xs text-muted-foreground">
                          Média: {formatCurrency(item.avgValue)}
                        </p>
                      </div>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Analysis */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance da Equipe</CardTitle>
              <CardDescription>Ranking e métricas individuais dos advogados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lawyersPerformance.map((lawyer, index) => (
                  <div key={lawyer.name} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{lawyer.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{lawyer.cases} casos</Badge>
                          <Badge>{formatCurrency(lawyer.revenue)}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="font-bold text-green-600">{lawyer.successRate}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">taxa de sucesso</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Satisfação Cliente</p>
                        <div className="flex items-center gap-2">
                          <Progress value={lawyer.clientSatisfaction * 20} className="h-2" />
                          <span className="text-sm font-medium">{lawyer.clientSatisfaction}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Eficiência</p>
                        <div className="flex items-center gap-2">
                          <Progress value={lawyer.efficiency} className="h-2" />
                          <span className="text-sm font-medium">{lawyer.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Taxa de Sucesso</p>
                        <div className="flex items-center gap-2">
                          <Progress value={lawyer.successRate} className="h-2" />
                          <span className="text-sm font-medium">{lawyer.successRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast */}
        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Previsão de Receita</CardTitle>
                <CardDescription>Projeção para os próximos 3 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastData.map((item) => (
                    <div key={item.month} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.month}</span>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(item.projected)}</p>
                          <p className="text-xs text-muted-foreground">
                            Confiança: {item.confidence}%
                          </p>
                        </div>
                      </div>
                      <Progress value={item.confidence} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insights e Recomendações</CardTitle>
                <CardDescription>Análises e sugestões estratégicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-1">
                      Crescimento Sustentável
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A receita cresceu 27.6% no período. Mantenha o foco em Direito Trabalhista,
                      que representa 43% da receita total.
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                      Oportunidade de Expansão
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      A demanda por clientes PJ está crescendo. Considere investir em marketing
                      para este segmento.
                    </p>
                  </div>

                  <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-1">
                      Atenção: Meta de Clientes
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Você está a 83% da meta de clientes. Intensifique ações de captação nas
                      próximas semanas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
