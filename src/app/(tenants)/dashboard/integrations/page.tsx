"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Link as LinkIcon,
  Mail,
  Calendar,
  FileText,
  DollarSign,
  Cloud,
  Shield,
  CheckCircle2,
  XCircle,
  Settings,
  ExternalLink,
  Key,
} from "lucide-react"
import { toast } from "sonner"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  icon: any
  enabled: boolean
  configured: boolean
  features: string[]
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "gmail",
      name: "Gmail",
      description: "Sincronize emails e envie notificações via Gmail",
      category: "Comunicação",
      icon: Mail,
      enabled: true,
      configured: true,
      features: ["Envio de emails", "Notificações automáticas", "Templates de email"],
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sincronize eventos e compromissos com Google Calendar",
      category: "Calendário",
      icon: Calendar,
      enabled: true,
      configured: true,
      features: ["Sincronização bidirecional", "Lembretes", "Convites automáticos"],
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Armazene e compartilhe documentos no Google Drive",
      category: "Armazenamento",
      icon: Cloud,
      enabled: false,
      configured: false,
      features: ["Backup automático", "Compartilhamento", "Controle de versões"],
    },
    {
      id: "stripe",
      name: "Stripe",
      description: "Aceite pagamentos online via Stripe",
      category: "Pagamentos",
      icon: DollarSign,
      enabled: false,
      configured: false,
      features: ["Pagamentos online", "Assinaturas", "Faturamento automático"],
    },
    {
      id: "pje",
      name: "PJe - Processo Judicial Eletrônico",
      description: "Integração com o sistema PJe para consulta de processos",
      category: "Jurídico",
      icon: FileText,
      enabled: false,
      configured: false,
      features: ["Consulta de processos", "Download de documentos", "Notificações"],
    },
    {
      id: "esaj",
      name: "e-SAJ",
      description: "Integração com o sistema e-SAJ do TJSP",
      category: "Jurídico",
      icon: FileText,
      enabled: false,
      configured: false,
      features: ["Acompanhamento processual", "Peticionamento", "Consultas"],
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Envie mensagens e notificações via WhatsApp",
      category: "Comunicação",
      icon: Mail,
      enabled: false,
      configured: false,
      features: ["Mensagens automáticas", "Atendimento ao cliente", "Notificações"],
    },
    {
      id: "oab",
      name: "OAB - Consulta",
      description: "Consulte dados de advogados no sistema da OAB",
      category: "Jurídico",
      icon: Shield,
      enabled: false,
      configured: false,
      features: ["Validação de OAB", "Dados cadastrais", "Situação profissional"],
    },
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, enabled: !int.enabled } : int
      )
    )
    const integration = integrations.find((i) => i.id === id)
    if (integration?.enabled) {
      toast.success(`${integration.name} desativada`)
    } else {
      toast.success(`${integration.name} ativada`)
    }
  }

  const categories = [...new Set(integrations.map((i) => i.category))]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrações</h1>
          <p className="text-muted-foreground">
            Conecte a Kamaia com suas ferramentas favoritas
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground">integrações disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter((i) => i.enabled).length}
            </div>
            <p className="text-xs text-muted-foreground">em uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Configuradas</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {integrations.filter((i) => i.configured).length}
            </div>
            <p className="text-xs text-muted-foreground">prontas para usar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">tipos diferentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{category}</h2>
            <Badge variant="secondary">
              {integrations.filter((i) => i.category === category).length}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => {
                const Icon = integration.icon
                return (
                  <Card key={integration.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {integration.name}
                            </CardTitle>
                            <div className="flex gap-2 mt-1">
                              {integration.enabled ? (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Ativa
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Inativa
                                </Badge>
                              )}
                              {integration.configured ? (
                                <Badge variant="outline" className="text-xs">
                                  Configurada
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-muted-foreground">
                                  Não configurada
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                          disabled={!integration.configured}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{integration.description}</CardDescription>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Funcionalidades:</Label>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {integration.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {integration.configured ? (
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setSelectedIntegration(integration)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Configurar
                          </Button>
                        ) : (
                          <Button
                            className="flex-1"
                            onClick={() => setSelectedIntegration(integration)}
                          >
                            <Key className="mr-2 h-4 w-4" />
                            Conectar
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      ))}

      {/* Configuration Dialog */}
      {selectedIntegration && (
        <Dialog
          open={!!selectedIntegration}
          onOpenChange={() => setSelectedIntegration(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Configurar {selectedIntegration.name}
              </DialogTitle>
              <DialogDescription>
                {selectedIntegration.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {selectedIntegration.configured ? (
                <>
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Integração configurada</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                      Esta integração está pronta para uso.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Status da Conexão</Label>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Conectado</span>
                        <Badge variant="default">Ativo</Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Última Sincronização</Label>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Há 5 minutos</span>
                        <Button variant="outline" size="sm">
                          Sincronizar Agora
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Configurações Avançadas</Label>
                      <div className="space-y-3 p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Sincronização automática</p>
                            <p className="text-xs text-muted-foreground">
                              Sincronizar dados a cada hora
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Notificações</p>
                            <p className="text-xs text-muted-foreground">
                              Receber alertas sobre esta integração
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Para conectar esta integração, você precisará fornecer as credenciais de acesso.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <Input
                        id="api-key"
                        type="password"
                        placeholder="Digite sua API key"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="api-secret">API Secret</Label>
                      <Input
                        id="api-secret"
                        type="password"
                        placeholder="Digite seu API secret"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL (opcional)</Label>
                      <Input
                        id="webhook-url"
                        placeholder="https://seu-dominio.com/webhook"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedIntegration(null)}
              >
                Cancelar
              </Button>
              {selectedIntegration.configured ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.success("Integração desconectada")
                    setSelectedIntegration(null)
                  }}
                >
                  Desconectar
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toast.success("Integração conectada com sucesso!")
                    setIntegrations((prev) =>
                      prev.map((i) =>
                        i.id === selectedIntegration.id
                          ? { ...i, configured: true, enabled: true }
                          : i
                      )
                    )
                    setSelectedIntegration(null)
                  }}
                >
                  Conectar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
