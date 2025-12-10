"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function EmailPage() {
  const stats = [
    { label: "Emails Enviados Hoje", value: "1,234", icon: Mail, color: "text-blue-500" },
    { label: "Taxa de Entrega", value: "98.5%", icon: CheckCircle2, color: "text-green-500" },
    { label: "Taxa de Abertura", value: "42.3%", icon: TrendingUp, color: "text-violet-500" },
    { label: "Em Fila", value: "45", icon: Clock, color: "text-orange-500" }
  ]

  const campaigns = [
    { name: "Boas-vindas", sent: 145, opened: 98, clicked: 45, status: "active" },
    { name: "Newsletter Mensal", sent: 487, opened: 203, clicked: 87, status: "active" },
    { name: "Atualização de Sistema", sent: 487, opened: 412, clicked: 156, status: "completed" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestão de Emails</h1>
        <p className="text-muted-foreground">Monitore e gerencie os emails da plataforma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`size-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campanhas de Email</CardTitle>
          <CardDescription>Performance das campanhas automáticas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.sent} enviados • {campaign.opened} abertos • {campaign.clicked} cliques
                  </p>
                </div>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status === "active" ? "Ativa" : "Concluída"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Templates de email configurados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Boas-vindas</span>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Recuperação de Senha</span>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Notificação de Processo</span>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuração SMTP</CardTitle>
            <CardDescription>Status do servidor de email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <Badge className="bg-green-500/10 text-green-500">
                <CheckCircle2 className="size-3 mr-1" />
                Conectado
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Servidor</span>
              <span className="text-sm text-muted-foreground">smtp.gmail.com</span>
            </div>
            <Button variant="outline" className="w-full">Testar Conexão</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
