"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function IncidentsPage() {
  const incidents = [
    {
      id: "INC-2025-001",
      title: "Lentidão na API de Documentos",
      severity: "high",
      status: "investigating",
      reported: "Há 15 min",
      affected: "23 tenants"
    },
    {
      id: "INC-2025-002",
      title: "Erro intermitente no upload de arquivos",
      severity: "medium",
      status: "monitoring",
      reported: "Há 1 hora",
      affected: "5 tenants"
    },
    {
      id: "INC-2024-456",
      title: "Falha no serviço de email",
      severity: "critical",
      status: "resolved",
      reported: "Ontem",
      affected: "Todos os tenants",
      resolvedIn: "2h 15min"
    }
  ]

  const severityConfig = {
    critical: { label: "Crítico", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    high: { label: "Alto", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    medium: { label: "Médio", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    low: { label: "Baixo", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" }
  }

  const statusConfig = {
    investigating: { label: "Investigando", icon: Clock, color: "text-orange-500" },
    monitoring: { label: "Monitorando", icon: AlertTriangle, color: "text-yellow-500" },
    resolved: { label: "Resolvido", icon: CheckCircle2, color: "text-green-500" }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Incidentes</h1>
          <p className="text-muted-foreground">Gerencie incidentes e status da plataforma</p>
        </div>
        <Button>
          <AlertTriangle className="size-4 mr-2" />
          Reportar Incidente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Incidentes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.5h</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incidentes Recentes</CardTitle>
          <CardDescription>Histórico de problemas e resoluções</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident) => {
              const StatusIcon = statusConfig[incident.status as keyof typeof statusConfig].icon
              return (
                <div key={incident.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{incident.title}</h3>
                        <Badge className={severityConfig[incident.severity as keyof typeof severityConfig].color}>
                          {severityConfig[incident.severity as keyof typeof severityConfig].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {incident.id} • {incident.affected} afetados • Reportado {incident.reported}
                      </p>
                      {incident.resolvedIn && (
                        <p className="text-sm text-green-600">
                          Resolvido em {incident.resolvedIn}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`size-5 ${statusConfig[incident.status as keyof typeof statusConfig].color}`} />
                      <span className="text-sm font-medium">
                        {statusConfig[incident.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                    {incident.status !== "resolved" && (
                      <Button size="sm">Atualizar Status</Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
