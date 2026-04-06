"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Scale,
  Users,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import CompanyDashboardKPIs from "@/components/dasboard/company-dashboard-kpis"
import CardCompanyDashboardRecentCases from "@/components/dasboard/card-company-dashboard-recent-cases"
import CardCompanyProcessesByArea from "@/components/dasboard/card-company-processes-by-area"

export default function DashboardPage() {




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





  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
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
      <CompanyDashboardKPIs />

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Recent Cases */}
        <CardCompanyDashboardRecentCases />

        {/* Cases by Area */}
        <CardCompanyProcessesByArea />
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
