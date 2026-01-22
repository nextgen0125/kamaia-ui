"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Briefcase,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Bell,
} from "lucide-react"

// Quick Stats Widget
export function QuickStatsWidget() {
  const stats = [
    {
      title: "Processos Ativos",
      value: "32",
      change: "+4 esta semana",
      trend: "up",
      icon: Briefcase,
    },
    {
      title: "Novos Clientes",
      value: "8",
      change: "+2 este mês",
      trend: "up",
      icon: Users,
    },
    {
      title: "Receita Mensal",
      value: "125.000.000 AOA",
      change: "+12% vs mês anterior",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Tarefas Pendentes",
      value: "15",
      change: "-3 hoje",
      trend: "down",
      icon: Clock,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendIcon
                  className={`h-3 w-3 mr-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Upcoming Deadlines Widget
export function UpcomingDeadlinesWidget() {
  const deadlines = [
    {
      id: 1,
      title: "Apresentar contestação",
      case: "Processo 0001234-56.2024",
      date: "2024-03-25",
      daysLeft: 2,
      priority: "high",
    },
    {
      id: 2,
      title: "Juntada de documentos",
      case: "Processo 0002345-67.2024",
      date: "2024-03-28",
      daysLeft: 5,
      priority: "medium",
    },
    {
      id: 3,
      title: "Recurso ordinário",
      case: "Processo 0003456-78.2024",
      date: "2024-03-30",
      daysLeft: 7,
      priority: "medium",
    },
  ]

  const getPriorityColor = (priority: string) => {
    return priority === "high" ? "text-red-500" : "text-yellow-500"
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
          Prazos Próximos
        </CardTitle>
        <CardDescription>Atenção aos prazos importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">{deadline.case}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(deadline.date)}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={deadline.priority === "high" ? "destructive" : "default"}
                  >
                    {deadline.daysLeft} dias
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Recent Activities Widget
export function RecentActivitiesWidget() {
  const activities = [
    {
      id: 1,
      user: "Dr. João Silva",
      action: "criou um novo processo",
      target: "Ação Trabalhista",
      time: "10 min atrás",
      icon: Briefcase,
    },
    {
      id: 2,
      user: "Dra. Maria Santos",
      action: "finalizou uma tarefa",
      target: "Revisar contrato",
      time: "1h atrás",
      icon: CheckCircle2,
    },
    {
      id: 3,
      user: "Ana Carolina",
      action: "fez upload de",
      target: "Petição Inicial.pdf",
      time: "2h atrás",
      icon: FileText,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>Últimas ações da equipe</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-full p-2 bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Task Progress Widget
export function TaskProgressWidget() {
  const taskStats = {
    total: 45,
    completed: 28,
    inProgress: 12,
    pending: 5,
  }

  const completionRate = (taskStats.completed / taskStats.total) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progresso de Tarefas</CardTitle>
        <CardDescription>Status geral das tarefas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{completionRate.toFixed(0)}%</div>
            <p className="text-sm text-muted-foreground">Taxa de conclusão</p>
          </div>
          <Progress value={completionRate} className="h-3" />
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {taskStats.completed}
              </div>
              <p className="text-xs text-muted-foreground">Concluídas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {taskStats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {taskStats.pending}
              </div>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Upcoming Events Widget
export function UpcomingEventsWidget() {
  const events = [
    {
      id: 1,
      title: "Audiência de Instrução",
      time: "09:30",
      date: "Hoje",
      location: "TRT 2ª Região",
      type: "hearing",
    },
    {
      id: 2,
      title: "Reunião com cliente",
      time: "14:00",
      date: "Hoje",
      location: "Escritório",
      type: "meeting",
    },
    {
      id: 3,
      title: "Audiência de Conciliação",
      time: "10:00",
      date: "Amanhã",
      location: "Fórum Central",
      type: "hearing",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          Próximos Eventos
        </CardTitle>
        <CardDescription>Compromissos de hoje e amanhã</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-xs font-medium text-muted-foreground">
                    {event.date}
                  </span>
                  <span className="text-lg font-bold">{event.time}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                  <Badge variant="outline" className="mt-1">
                    {event.type === "hearing" ? "Audiência" : "Reunião"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Performance Chart Widget
export function PerformanceChartWidget() {
  const monthlyData = [
    { month: "Jan", cases: 8, revenue: 85000 },
    { month: "Fev", cases: 12, revenue: 98000 },
    { month: "Mar", cases: 15, revenue: 125000 },
  ]

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Mensal</CardTitle>
        <CardDescription>Casos e receita dos últimos 3 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyData.map((data) => {
            const percentage = (data.revenue / maxRevenue) * 100
            return (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {data.cases} casos
                    </span>
                    <span className="font-bold">{formatCurrency(data.revenue)}</span>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Widget
export function QuickActionsWidget() {
  const actions = [
    { label: "Novo Processo", icon: Briefcase, href: "/dashboard/cases" },
    { label: "Adicionar Cliente", icon: Users, href: "/dashboard/clients" },
    { label: "Agendar Evento", icon: Calendar, href: "/dashboard/agenda" },
    { label: "Upload Documento", icon: FileText, href: "/dashboard/document" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às funcionalidades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Icon className="h-6 w-6 mb-2 text-primary" />
                <span className="text-xs font-medium text-center">
                  {action.label}
                </span>
              </a>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
