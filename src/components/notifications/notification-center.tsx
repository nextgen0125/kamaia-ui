"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Check,
  Trash2,
  Calendar,
  FileText,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Users,
  CheckCircle2,
  X,
} from "lucide-react"

interface Notification {
  id: string
  type: "deadline" | "meeting" | "task" | "message" | "payment" | "system"
  title: string
  message: string
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
    time: "5 min atrás",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/cases/1",
  },
  {
    id: "2",
    type: "meeting",
    title: "Reunião em 30 minutos",
    message: "Audiência de Conciliação com Ana Paula Oliveira",
    time: "30 min atrás",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/agenda",
  },
  {
    id: "3",
    type: "task",
    title: "Nova tarefa atribuída",
    message: "Dr. João Silva atribuiu: Revisar contrato - Cliente Carlos Mendes",
    time: "1h atrás",
    read: false,
    priority: "medium",
    actionUrl: "/dashboard/task",
  },
  {
    id: "4",
    type: "message",
    title: "Nova mensagem",
    message: "Dra. Maria Santos: 'Precisamos revisar os documentos do caso X'",
    time: "2h atrás",
    read: true,
    priority: "medium",
    actionUrl: "/dashboard/workspace",
  },
  {
    id: "5",
    type: "payment",
    title: "Pagamento recebido",
    message: "Cliente Carlos Mendes - Honorários: R$ 5.000,00",
    time: "3h atrás",
    read: true,
    priority: "low",
    actionUrl: "/dashboard/finance",
  },
  {
    id: "6",
    type: "system",
    title: "Backup concluído",
    message: "Backup automático realizado com sucesso às 03:00",
    time: "5h atrás",
    read: true,
    priority: "low",
  },
  {
    id: "7",
    type: "deadline",
    title: "Prazo vencido",
    message: "Juntada de documentos - Processo 0002345-67.2024",
    time: "1 dia atrás",
    read: true,
    priority: "high",
    actionUrl: "/dashboard/cases/2",
  },
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [open, setOpen] = useState(false)

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

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: string) => {
    const icons = {
      deadline: <Calendar className="h-4 w-4" />,
      meeting: <Calendar className="h-4 w-4" />,
      task: <CheckCircle2 className="h-4 w-4" />,
      message: <MessageSquare className="h-4 w-4" />,
      payment: <DollarSign className="h-4 w-4" />,
      system: <AlertCircle className="h-4 w-4" />,
    }
    return icons[type as keyof typeof icons] || <Bell className="h-4 w-4" />
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "border-l-red-500 bg-red-50 dark:bg-red-950/20",
      medium: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
      low: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
    }
    return colors[priority as keyof typeof colors] || colors.low
  }

  const unreadNotifications = notifications.filter((n) => !n.read)
  const readNotifications = notifications.filter((n) => n.read)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Notificações</h3>
            <p className="text-xs text-muted-foreground">
              Você tem {unreadCount} notificações não lidas
            </p>
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Marcar todas
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAll}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              Nenhuma notificação
            </p>
          </div>
        ) : (
          <Tabs defaultValue="unread" className="w-full">
            <TabsList className="w-full grid grid-cols-2 rounded-none border-b">
              <TabsTrigger value="unread" className="rounded-none">
                Não lidas ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-none">
                Todas ({notifications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unread" className="m-0">
              <ScrollArea className="h-[400px]">
                {unreadNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Tudo em dia!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {unreadNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-l-4 hover:bg-muted/50 cursor-pointer transition-colors ${getPriorityColor(
                          notification.priority
                        )}`}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.actionUrl) {
                            window.location.href = notification.actionUrl
                          }
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="mt-1 text-primary">
                              {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium leading-none">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="all" className="m-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        notification.read
                          ? "opacity-60 border-l-gray-300"
                          : getPriorityColor(notification.priority)
                      }`}
                      onClick={() => {
                        markAsRead(notification.id)
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1 text-primary">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium leading-none">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full text-xs"
                onClick={() => {
                  window.location.href = "/dashboard/notifications"
                  setOpen(false)
                }}
              >
                Ver todas as notificações
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
