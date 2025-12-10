"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Scale, 
  FileText, 
  Calendar,
  CheckCircle2,
  Settings
} from "lucide-react"

export default function CustomerNotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "case",
      title: "Novo andamento processual",
      message: "Seu processo 0001234-56.2024.8.26.0100 teve uma atualização",
      time: "Há 2 horas",
      read: false
    },
    {
      id: 2,
      type: "document",
      title: "Documento disponível",
      message: "Novo documento foi adicionado ao processo 'Ação Trabalhista'",
      time: "Há 5 horas",
      read: false
    },
    {
      id: 3,
      type: "message",
      title: "Mensagem recebida",
      message: "Dr. João Silva enviou uma mensagem sobre seu caso",
      time: "Ontem",
      read: true
    },
    {
      id: 4,
      type: "appointment",
      title: "Lembrete de reunião",
      message: "Você tem uma reunião agendada para amanhã às 14h",
      time: "Ontem",
      read: true
    },
    {
      id: 5,
      type: "payment",
      title: "Fatura disponível",
      message: "Nova fatura de R$ 500,00 disponível para pagamento",
      time: "2 dias atrás",
      read: true
    }
  ]

  const notificationSettings = [
    {
      category: "Processos",
      description: "Notificações sobre seus processos jurídicos",
      settings: [
        { id: "case_updates", label: "Atualizações de processos", enabled: true },
        { id: "case_deadlines", label: "Prazos importantes", enabled: true },
        { id: "case_hearings", label: "Audiências marcadas", enabled: true }
      ]
    },
    {
      category: "Documentos",
      description: "Notificações sobre documentos",
      settings: [
        { id: "doc_uploaded", label: "Novos documentos", enabled: true },
        { id: "doc_signed", label: "Documentos assinados", enabled: true }
      ]
    },
    {
      category: "Mensagens",
      description: "Notificações de comunicação",
      settings: [
        { id: "new_message", label: "Novas mensagens", enabled: true },
        { id: "message_replies", label: "Respostas às mensagens", enabled: true }
      ]
    },
    {
      category: "Pagamentos",
      description: "Notificações financeiras",
      settings: [
        { id: "new_invoice", label: "Novas faturas", enabled: true },
        { id: "payment_due", label: "Vencimentos próximos", enabled: true },
        { id: "payment_confirmed", label: "Pagamentos confirmados", enabled: false }
      ]
    }
  ]

  const iconMap = {
    case: <Scale className="size-5 text-violet-600" />,
    document: <FileText className="size-5 text-blue-600" />,
    message: <MessageSquare className="size-5 text-green-600" />,
    appointment: <Calendar className="size-5 text-orange-600" />,
    payment: <Mail className="size-5 text-red-600" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notificações</h1>
          <p className="text-muted-foreground">
            Acompanhe todas as atualizações importantes
          </p>
        </div>
        <Button variant="outline">
          <CheckCircle2 className="size-4 mr-2" />
          Marcar todas como lidas
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            <Bell className="size-4 mr-2" />
            Todas
            <Badge variant="secondary" className="ml-2">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Não Lidas
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="size-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        {/* All Notifications */}
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-violet-500/5' : ''
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {iconMap[notification.type as keyof typeof iconMap]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <div className="size-2 rounded-full bg-violet-600" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unread Notifications */}
        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.filter(n => !n.read).map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer bg-violet-500/5"
                  >
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        {iconMap[notification.type as keyof typeof iconMap]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{notification.title}</h3>
                              <div className="size-2 rounded-full bg-violet-600" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure quais notificações você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((category, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">{category.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className="space-y-3 pl-4 border-l-2">
                    {category.settings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between"
                      >
                        <Label htmlFor={setting.id} className="cursor-pointer">
                          {setting.label}
                        </Label>
                        <Switch
                          id={setting.id}
                          defaultChecked={setting.enabled}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <Button>Salvar Preferências</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
