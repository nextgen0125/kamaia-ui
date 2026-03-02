"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle, CheckCircle2, Eye, Key, Activity } from "lucide-react"

export default function SecurityPage() {
  const securityMetrics = [
    { label: "Tentativas de Login Falhadas", value: "23", status: "warning", icon: AlertTriangle },
    { label: "Usuários com 2FA", value: "98%", status: "success", icon: CheckCircle2 },
    { label: "Sessões Ativas", value: "145", status: "info", icon: Activity },
    { label: "APIs Ativas", value: "12", status: "info", icon: Key }
  ]

  const securityEvents = [
    {
      type: "warning",
      title: "Múltiplas tentativas de login falhadas",
      user: "user@example.com",
      ip: "192.168.1.100",
      time: "Há 5 min",
      action: "Bloquear IP"
    },
    {
      type: "info",
      title: "Novo dispositivo detectado",
      user: "admin@kamaia.com",
      ip: "192.168.1.50",
      time: "Há 15 min",
      action: "Verificar"
    },
    {
      type: "success",
      title: "2FA ativado com sucesso",
      user: "tenant@escritorio.com",
      ip: "192.168.1.75",
      time: "Há 1 hora",
      action: "OK"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Segurança</h1>
        <p className="text-muted-foreground">Monitore a segurança da plataforma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Icon className={`size-4 ${
                  metric.status === 'warning' ? 'text-yellow-500' :
                  metric.status === 'success' ? 'text-green-500' : 'text-blue-500'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos de Segurança Recentes</CardTitle>
          <CardDescription>Atividades suspeitas e alertas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-full flex items-center justify-center ${
                    event.type === 'warning' ? 'bg-yellow-500/10' :
                    event.type === 'success' ? 'bg-green-500/10' : 'bg-blue-500/10'
                  }`}>
                    {event.type === 'warning' && <AlertTriangle className="size-5 text-yellow-500" />}
                    {event.type === 'success' && <CheckCircle2 className="size-5 text-green-500" />}
                    {event.type === 'info' && <Eye className="size-5 text-blue-500" />}
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.user} • {event.ip} • {event.time}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">{event.action}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Políticas de Segurança</CardTitle>
            <CardDescription>Configurações ativas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Autenticação de Dois Fatores</span>
              <Badge variant="secondary">Obrigatória</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tempo de Sessão</span>
              <Badge variant="secondary">2 horas</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tentativas de Login</span>
              <Badge variant="secondary">5 máximo</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificados SSL</CardTitle>
            <CardDescription>Status dos certificados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">kamaia.com</span>
              <Badge className="bg-green-500/10 text-green-500">Válido até 2026</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">api.kamaia.com</span>
              <Badge className="bg-green-500/10 text-green-500">Válido até 2026</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
