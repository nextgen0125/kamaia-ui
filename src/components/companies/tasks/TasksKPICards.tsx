"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListTodo, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useTaskKPIs } from "@/hooks/queries/tasks/use-task"
import { Skeleton } from "@/components/ui/skeleton"

export function TasksKPICards() {
  const params = useParams()
  const companyId = params.company_id as string
  const { data: stats, isLoading } = useTaskKPIs(companyId)

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const items = [
    {
      title: "Total",
      value: stats?.total || 0,
      description: "Todas as tarefas",
      icon: ListTodo,
      color: "text-muted-foreground",
    },
    {
      title: "A Fazer",
      value: stats?.todo || 0,
      description: "Aguardando início",
      icon: Clock,
      color: "text-muted-foreground",
    },
    {
      title: "Em Progresso",
      value: stats?.inProgress || 0,
      description: "Em andamento",
      icon: Clock,
      color: "text-blue-500",
      valueColor: "text-blue-600",
    },
    {
      title: "Concluídas",
      value: stats?.done || 0,
      description: "Finalizadas",
      icon: CheckCircle2,
      color: "text-green-500",
      valueColor: "text-green-600",
    },
    {
      title: "Atrasadas",
      value: stats?.overdue || 0,
      description: "Vencidas",
      icon: AlertCircle,
      color: "text-destructive",
      valueColor: "text-destructive",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`size-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.valueColor || ""}`}>{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
