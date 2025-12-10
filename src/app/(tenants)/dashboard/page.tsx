"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  // Mock data
  const stats = {
    cases: { total: 45, change: 20, trend: "up" },
    clients: { total: 32, change: 15, trend: "up" },
    lawyers: { total: 8, change: 2, trend: "up" },
    revenue: { total: 45231.89, change: 12, trend: "up" },
  }

  const recentCases = [
    {
      id: 1,
      number: "0001234-56.2024.8.26.0100",
      title: "Ação Trabalhista - Horas Extras",
      client: "Carlos Mendes",
      status: "active",
      priority: "high",
      date: "2024-03-15",
    },
    {
      id: 2,
      number: "0002345-67.2024.8.26.0000",
      title: "Divórcio Consensual",
      client: "Ana Paula Oliveira",
      status: "active",
      priority: "medium",
      date: "2024-03-14",
    },
    {
      id: 3,
      number: "0003456-78.2024.8.26.0100",
      title: "Cobrança - Inadimplência",
      client: "Empresa ABC Ltda",
      status: "pending",
      priority: "low",
      date: "2024-03-13",
    },
  ]

  const upcomingDeadlines = [
    {
      id: 1,
      case: "Ação Trabalhista - Horas Extras",
      description: "Apresentar contestação",
      date: "2024-03-20",
      daysLeft: 5,
      priority: "high",
    },
    {
      id: 2,
      case: "Divórcio Consensual",
      description: "Audiência de conciliação",
      date: "2024-03-22",
      daysLeft: 7,
      priority: "medium",
    },
    {
      id: 3,
      case: "Indenização por Danos Morais",
      description: "Recurso de apelação",
      date: "2024-03-25",
      daysLeft: 10,
      priority: "high",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: "Dr. João Silva",
      action: "adicionou um novo processo",
      case: "Ação Trabalhista - Horas Extras",
      time: "há 2 horas",
    },
    {
      id: 2,
      user: "Dra. Maria Santos",
      action: "atualizou o andamento de",
      case: "Divórcio Consensual",
      time: "há 4 horas",
    },
    {
      id: 3,
      user: "Dr. Pedro Costa",
      action: "cadastrou um novo cliente",
      case: "Tech Solutions S/A",
      time: "há 6 horas",
    },
  ]

  const casesByArea = [
    { area: "Trabalhista", count: 15, percentage: 33 },
    { area: "Civil", count: 12, percentage: 27 },
    { area: "Penal", count: 8, percentage: 18 },
    { area: "Família", count: 6, percentage: 13 },
    { area: "Outros", count: 4, percentage: 9 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

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

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Cases */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Processos Recentes</CardTitle>
                <CardDescription>Últimos processos cadastrados</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/cases">
                  Ver todos
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div
                  key={case_.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{case_.title}</p>
                      <Badge variant={getPriorityColor(case_.priority)} className="text-xs">
                        {case_.priority === "high" ? "Alta" : case_.priority === "medium" ? "Média" : "Baixa"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{case_.client}</p>
                    <p className="text-xs text-muted-foreground font-mono">{case_.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{formatDate(case_.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cases by Area */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Processos por Área</CardTitle>
            <CardDescription>Distribuição de casos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {casesByArea.map((item) => (
                <div key={item.area} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.area}</span>
                    <span className="text-muted-foreground">{item.count} casos</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Próximos Prazos</CardTitle>
                <CardDescription>Prazos que vencem em breve</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/agenda">
                  Ver todos
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-start gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                    deadline.daysLeft <= 5 ? "bg-red-100 dark:bg-red-950" : "bg-blue-100 dark:bg-blue-950"
                  }`}>
                    <Calendar className={`size-5 ${
                      deadline.daysLeft <= 5 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                    }`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{deadline.description}</p>
                    <p className="text-xs text-muted-foreground">{deadline.case}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(deadline.date)}
                      </Badge>
                      <Badge variant={deadline.daysLeft <= 5 ? "destructive" : "default"} className="text-xs">
                        {deadline.daysLeft} dias
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas ações realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="size-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${activity.user}`} />
                    <AvatarFallback>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                      {activity.case}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/cases">
                <Scale className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Processos</p>
                  <p className="text-xs text-muted-foreground">Gerenciar casos</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/clients">
                <Users className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Clientes</p>
                  <p className="text-xs text-muted-foreground">Gerenciar clientes</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/finance">
                <DollarSign className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Financeiro</p>
                  <p className="text-xs text-muted-foreground">Controle financeiro</p>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link href="/dashboard/document">
                <FileText className="size-6" />
                <div className="text-center">
                  <p className="font-semibold">Documentos</p>
                  <p className="text-xs text-muted-foreground">Biblioteca</p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
