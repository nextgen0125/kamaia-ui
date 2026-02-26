"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  CheckCircle2,
  MessageSquare,
  DollarSign,
  AlertCircle,
  Filter,
  Archive,
} from "lucide-react"

interface Notification {
  id: string
  type: "deadline" | "meeting" | "task" | "message" | "payment" | "system"
  title: string
  message: string
  date: string
  time: string
  read: boolean
  priority: "high" | "medium" | "low"
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "deadline",
    title: "Prazo se aproximando",
    message: "Apresentar contestação - Processo 0001234-56.2024 vence em 2 dias",
    date: "2024-03-20",
    time: "14:30",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    type: "meeting",
    title: "Reunião agendada",
    message: "Audiência de Conciliação com Ana Paula Oliveira",
    date: "2024-03-20",
    time: "13:00",
    read: false,
    priority: "high",
  },
  {
    id: "3",
    type: "task",
    title: "Nova tarefa atribuída",
    message: "Dr. João Silva atribuiu: Revisar contrato - Cliente Carlos Mendes",
    date: "2024-03-20",
    time: "11:00",
    read: false,
    priority: "medium",
  },
  {
    id: "4",
    type: "message",
    title: "Nova mensagem",
    message: "Dra. Maria Santos: 'Precisamos revisar os documentos do caso X'",
    date: "2024-03-20",
    time: "10:00",
    read: true,
    priority: "medium",
  },
  {
    id: "5",
    type: "payment",
    title: "Pagamento recebido",
    message: "Cliente Carlos Mendes - Honorários: 5.000.000 AOA",
    date: "2024-03-19",
    time: "16:00",
    read: true,
    priority: "low",
  },
  {
    id: "6",
    type: "system",
    title: "Backup concluído",
    message: "Backup automático realizado com sucesso",
    date: "2024-03-19",
    time: "03:00",
    read: true,
    priority: "low",
  },
  {
    id: "7",
    type: "deadline",
    title: "Prazo vencido",
    message: "Juntada de documentos - Processo 0002345-67.2024",
    date: "2024-03-18",
    time: "23:59",
    read: true,
    priority: "high",
  },
  {
    id: "8",
    type: "task",
    title: "Tarefa concluída",
    message: "Ana Carolina concluiu: Organizar documentos do processo 0001234",
    date: "2024-03-18",
    time: "15:30",
    read: true,
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    const icons = {
      deadline: <Calendar className="h-5 w-5" />,
      meeting: <Calendar className="h-5 w-5" />,
      task: <CheckCircle2 className="h-5 w-5" />,
      message: <MessageSquare className="h-5 w-5" />,
      payment: <DollarSign className="h-5 w-5" />,
      system: <AlertCircle className="h-5 w-5" />,
    }
    return icons[type as keyof typeof icons] || <Bell className="h-5 w-5" />
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { label: "Alta", variant: "destructive" as const },
      medium: { label: "Média", variant: "default" as const },
      low: { label: "Baixa", variant: "secondary" as const },
    }
    return config[priority as keyof typeof config] || config.medium
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      deadline: "Prazo",
      meeting: "Reunião",
      task: "Tarefa",
      message: "Mensagem",
      payment: "Pagamento",
      system: "Sistema",
    }
    return labels[type as keyof typeof labels] || type
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread" && n.read) return false
    if (filter !== "all" && n.type !== filter) return false
    return true
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">
            Gerencie todas as suas notificações
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notifications.filter((n) => n.priority === "high" && !n.read).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todas as Notificações</CardTitle>
              <CardDescription>
                Visualize e gerencie suas notificações
              </CardDescription>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="deadline">Prazos</SelectItem>
                <SelectItem value="meeting">Reuniões</SelectItem>
                <SelectItem value="task">Tarefas</SelectItem>
                <SelectItem value="message">Mensagens</SelectItem>
                <SelectItem value="payment">Pagamentos</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="all">
                Todas ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Não lidas ({unreadCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <ScrollArea className="h-[600px] pr-4">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma notificação encontrada
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                          !notification.read ? "bg-muted/30 border-l-4 border-l-primary" : ""
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${notification.read ? "text-muted-foreground" : "text-primary"}`}>
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{formatDate(notification.date)}</span>
                                  <span>•</span>
                                  <span>{notification.time}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {getTypeLabel(notification.type)}
                                  </Badge>
                                  <Badge variant={getPriorityBadge(notification.priority).variant}>
                                    {getPriorityBadge(notification.priority).label}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
