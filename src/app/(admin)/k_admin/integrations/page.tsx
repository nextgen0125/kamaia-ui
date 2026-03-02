"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle2, XCircle, Settings } from "lucide-react"

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Stripe",
      description: "Processamento de pagamentos",
      icon: "💳",
      status: "connected",
      config: "Configurado com chave de produção"
    },
    {
      name: "SendGrid",
      description: "Envio de emails transacionais",
      icon: "📧",
      status: "connected",
      config: "API Key configurada"
    },
    {
      name: "AWS S3",
      description: "Armazenamento de arquivos",
      icon: "☁️",
      status: "connected",
      config: "Bucket: kamaia-documents"
    },
    {
      name: "Slack",
      description: "Notificações e alertas",
      icon: "💬",
      status: "disconnected",
      config: "Não configurado"
    },
    {
      name: "Google Analytics",
      description: "Análise de uso",
      icon: "📊",
      status: "connected",
      config: "Tracking ID configurado"
    },
    {
      name: "Sentry",
      description: "Monitoramento de erros",
      icon: "🔍",
      status: "connected",
      config: "DSN configurado"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground">Gerencie integrações com serviços externos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="text-4xl">{integration.icon}</div>
                <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                  {integration.status === "connected" ? (
                    <>
                      <CheckCircle2 className="size-3 mr-1" />
                      Conectado
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3 mr-1" />
                      Desconectado
                    </>
                  )}
                </Badge>
              </div>
              <CardTitle>{integration.name}</CardTitle>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{integration.config}</p>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="size-4 mr-2" />
                Configurar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs de Integração</CardTitle>
          <CardDescription>Últimas atividades das integrações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { service: "Stripe", event: "Pagamento processado", time: "Há 5 min", status: "success" },
              { service: "SendGrid", event: "Email enviado", time: "Há 10 min", status: "success" },
              { service: "AWS S3", event: "Arquivo carregado", time: "Há 15 min", status: "success" },
              { service: "Stripe", event: "Webhook recebido", time: "Há 20 min", status: "success" }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{log.service}</p>
                  <p className="text-sm text-muted-foreground">{log.event}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/10 text-green-500 mb-1">Sucesso</Badge>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
