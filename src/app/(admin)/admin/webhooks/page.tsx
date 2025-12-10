"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Workflow, Plus, CheckCircle2, XCircle, Clock } from "lucide-react"

export default function WebhooksPage() {
  const webhooks = [
    {
      name: "Stripe Payment Webhook",
      url: "https://api.kamaia.com/webhooks/stripe",
      events: ["payment.succeeded", "payment.failed"],
      status: "active",
      lastTriggered: "Há 5 min"
    },
    {
      name: "SendGrid Email Events",
      url: "https://api.kamaia.com/webhooks/sendgrid",
      events: ["email.delivered", "email.opened"],
      status: "active",
      lastTriggered: "Há 15 min"
    },
    {
      name: "Slack Notifications",
      url: "https://hooks.slack.com/services/xxx",
      events: ["incident.created", "system.alert"],
      status: "inactive",
      lastTriggered: "Há 2 dias"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="text-muted-foreground">Gerencie webhooks e integrações</p>
        </div>
        <Button>
          <Plus className="size-4 mr-2" />
          Novo Webhook
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks Configurados</CardTitle>
          <CardDescription>Lista de todos os webhooks ativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhooks.map((webhook, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{webhook.name}</h3>
                      <Badge variant={webhook.status === "active" ? "default" : "secondary"}>
                        {webhook.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{webhook.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm">Testar</Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {webhook.events.map((event, i) => (
                    <Badge key={i} variant="outline">{event}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Último disparo: {webhook.lastTriggered}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Webhook</CardTitle>
          <CardDescription>Configure um novo webhook</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input placeholder="Ex: Slack Notifications" />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input placeholder="https://api.example.com/webhook" />
          </div>
          <div className="space-y-2">
            <Label>Eventos</Label>
            <div className="grid grid-cols-2 gap-2">
              {["user.created", "tenant.created", "payment.succeeded", "incident.created"].map((event) => (
                <label key={event} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-muted">
                  <input type="checkbox" />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>
          <Button>Criar Webhook</Button>
        </CardContent>
      </Card>
    </div>
  )
}
