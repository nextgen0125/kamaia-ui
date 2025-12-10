"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Zap,
  RefreshCw,
  Download,
  Bell,
  Eye,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react"

export default function RealtimeDashboardPage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simular updates em tempo real
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const realtimeMetrics = {
    activeUsers: 12,
    tasksCompleted: 8,
    newMessages: 3,
    documentsUploaded: 5,
    eventsToday: 7,
  }

  const recentActivities = [
    {
      id: 1,
      user: "Dr. João Silva",
      action: "concluiu uma tarefa",
      target: "Revisar petição inicial",
      time: "30s atrás",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 2,
      user: "Dra. Maria Santos",
      action: "fez upload de",
      target: "Contestação.pdf",
      time: "1m atrás",
      icon: FileText,
      color: "text-green-500",
    },
    {
      id: 3,
      user: "Ana Carolina",
      action: "enviou uma mensagem para",
      target: "Carlos Mendes",
      time: "2m atrás",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      id: 4,
      user: "Dr. Pedro Costa",
      action: "agendou uma",
      target: "Audiência de Instrução",
      time: "3m atrás",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      id: 5,
      user: "Sistema",
      action: "gerou relatório de",
      target: "Performance mensal",
      time: "5m atrás",
      icon: Activity,
      color: "text-gray-500",
    },
  ]

  const systemHealth = [
    { metric: "CPU", value: 45, status: "good" },
    { metric: "Memória", value: 62, status: "good" },
    { metric: "API Response", value: 180, status: "good", unit: "ms" },
    { metric: "Database", value: 85, status: "warning" },
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    if (status === "good") return "bg-green-500"
    if (status === "warning") return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Dashboard em Tempo Real
            {isLive && (
              <Badge variant="destructive" className="animate-pulse">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                AO VIVO
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Última atualização: {formatTime(lastUpdate)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Pausar
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retomar
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.activeUsers}</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-muted-foreground">online agora</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas (Hoje)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">+2 na última hora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.newMessages}</div>
            <p className="text-xs text-muted-foreground">não lidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.documentsUploaded}</div>
            <p className="text-xs text-muted-foreground">documentos hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeMetrics.eventsToday}</div>
            <p className="text-xs text-muted-foreground">agendados hoje</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Activity Stream */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stream de Atividades</CardTitle>
                <CardDescription>Ações em tempo real da equipe</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`rounded-full p-2 bg-muted ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
            <CardDescription>Monitoramento em tempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {item.value}
                        {item.unit || "%"}
                      </span>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(item.status)}`} />
                    </div>
                  </div>
                  <Progress value={item.status === "good" ? item.value : 100} />
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Status Geral</span>
                  <Badge variant="default">Operacional</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Todos os sistemas funcionando normalmente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade por Hora</CardTitle>
          <CardDescription>Volume de ações nas últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end justify-between gap-2">
            {Array.from({ length: 24 }, (_, i) => {
              const height = Math.random() * 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{i}h</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
