"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Send, Users, CheckCircle2, Clock } from "lucide-react"

export default function AdminNotificationsPage() {
  const notifications = [
    { title: "Manutenção Programada", sent: "24/01/2025", recipients: 487, status: "sent" },
    { title: "Novo Recurso Disponível", sent: "20/01/2025", recipients: 487, status: "sent" },
    { title: "Atualização de Segurança", sent: "15/01/2025", recipients: 487, status: "sent" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notificações em Massa</h1>
        <p className="text-muted-foreground">Envie comunicados para todos os usuários</p>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">
            <Send className="size-4 mr-2" />
            Enviar Notificação
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="size-4 mr-2" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nova Notificação</CardTitle>
              <CardDescription>Envie uma notificação para todos os tenants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input placeholder="Ex: Nova funcionalidade disponível" />
              </div>
              <div className="space-y-2">
                <Label>Mensagem</Label>
                <Textarea rows={5} placeholder="Escreva a mensagem da notificação..." />
              </div>
              <div className="space-y-2">
                <Label>Destinatários</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-background">
                  <option>Todos os tenants (487)</option>
                  <option>Apenas plano Enterprise</option>
                  <option>Apenas plano Professional</option>
                  <option>Apenas plano Starter</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="size-4 mr-2" />
                  Enviar Agora
                </Button>
                <Button variant="outline">Agendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Enviadas</CardTitle>
              <CardDescription>Histórico de comunicados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Bell className="size-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Enviado em {notif.sent} para {notif.recipients} destinatários
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">
                      <CheckCircle2 className="size-3 mr-1" />
                      Enviado
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
