"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Activity,
  Server,
  Database,
  Zap,
  Globe,
  HardDrive,
  Cpu,
  MemoryStick,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
} from "lucide-react"

export default function MonitoringPage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => setLastUpdate(new Date()), 5000)
    return () => clearInterval(interval)
  }, [isLive])

  const systemMetrics = {
    cpu: { value: 42, status: "good", trend: -2.5 },
    memory: { value: 68, status: "good", trend: 1.2 },
    disk: { value: 54, status: "good", trend: 0.8 },
    network: { value: 35, status: "good", trend: -1.1 },
  }

  const services = [
    { name: "API Gateway", status: "operational", uptime: 99.99, response: 145 },
    { name: "Database Primary", status: "operational", uptime: 99.98, response: 8 },
    { name: "Database Replica", status: "operational", uptime: 99.95, response: 12 },
    { name: "Cache Redis", status: "operational", uptime: 99.97, response: 2 },
    { name: "Storage S3", status: "operational", uptime: 99.99, response: 95 },
    { name: "Email Service", status: "degraded", uptime: 98.50, response: 450 },
    { name: "Queue System", status: "operational", uptime: 99.92, response: 25 },
    { name: "Search Engine", status: "operational", uptime: 99.88, response: 180 },
  ]

  const recentEvents = [
    { id: 1, type: "info", message: "Database backup completed", time: "2 min ago" },
    { id: 2, type: "warning", message: "High memory usage on Server 3", time: "15 min ago" },
    { id: 3, type: "success", message: "All services health check passed", time: "30 min ago" },
    { id: 4, type: "error", message: "Email service degraded performance", time: "1h ago" },
    { id: 5, type: "info", message: "SSL certificates renewed", time: "2h ago" },
  ]

  const getStatusColor = (status: string) => {
    if (status === "operational" || status === "good") return "bg-green-500"
    if (status === "degraded") return "bg-yellow-500"
    return "bg-red-500"
  }

  const getEventIcon = (type: string) => {
    if (type === "success") return <CheckCircle2 className="h-4 w-4 text-green-500" />
    if (type === "warning") return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    if (type === "error") return <AlertTriangle className="h-4 w-4 text-red-500" />
    return <Activity className="h-4 w-4 text-blue-500" />
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Monitoramento em Tempo Real
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
            Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")}
          </p>
        </div>
        <Button
          variant={isLive ? "default" : "outline"}
          onClick={() => setIsLive(!isLive)}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLive ? "animate-spin" : ""}`} />
          {isLive ? "Pausar" : "Retomar"}
        </Button>
      </div>

      {/* System Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpu.value}%</div>
            <Progress value={systemMetrics.cpu.value} className="mt-2" />
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs ${systemMetrics.cpu.trend < 0 ? "text-green-600" : "text-red-600"}`}>
                {systemMetrics.cpu.trend > 0 ? "+" : ""}{systemMetrics.cpu.trend}%
              </span>
              <span className="text-xs text-muted-foreground">vs última hora</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memória</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memory.value}%</div>
            <Progress value={systemMetrics.memory.value} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">18.5 GB / 32 GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disco</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.disk.value}%</div>
            <Progress value={systemMetrics.disk.value} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">540 GB / 1 TB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rede</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.network.value}%</div>
            <Progress value={systemMetrics.network.value} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">350 Mbps / 1 Gbps</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Services Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status dos Serviços</CardTitle>
            <CardDescription>Monitoramento de todos os serviços</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(service.status)}`} />
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.response}ms • Uptime: {service.uptime}%
                        </p>
                      </div>
                    </div>
                    <Badge variant={service.status === "operational" ? "default" : "destructive"}>
                      {service.status === "operational" ? "OK" : "Degradado"}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos Recentes</CardTitle>
            <CardDescription>Últimas atividades do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Performance Graphs */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Requisições por Minuto</CardTitle>
            <CardDescription>Últimos 60 minutos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-1">
              {Array.from({ length: 60 }, (_, i) => {
                const height = Math.random() * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary rounded-t hover:bg-primary/80 transition-all cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${Math.floor(height * 50)} req/min`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo de Resposta</CardTitle>
            <CardDescription>Média dos últimos 60 minutos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-1">
              {Array.from({ length: 60 }, (_, i) => {
                const height = 30 + Math.random() * 40
                const color = height > 60 ? "bg-red-500" : height > 50 ? "bg-yellow-500" : "bg-green-500"
                return (
                  <div
                    key={i}
                    className={`flex-1 ${color} rounded-t hover:opacity-80 transition-all cursor-pointer`}
                    style={{ height: `${height}%` }}
                    title={`${Math.floor(height * 3)}ms`}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Server Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Infraestrutura</CardTitle>
          <CardDescription>Status dos servidores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { name: "Server 1 (Primary)", load: 45, status: "healthy" },
              { name: "Server 2 (Replica)", load: 38, status: "healthy" },
              { name: "Server 3 (Worker)", load: 72, status: "warning" },
              { name: "Server 4 (Backup)", load: 12, status: "healthy" },
            ].map((server) => (
              <div key={server.name} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(server.status)}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">{server.name}</p>
                  <p className="text-xs text-muted-foreground">Load: {server.load}%</p>
                </div>
                <Progress value={server.load} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
