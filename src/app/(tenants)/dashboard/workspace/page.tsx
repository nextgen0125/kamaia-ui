"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Users,
  Bell,
  FileText,
  Folder,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Activity,
  UserPlus,
  File,
  Search,
} from "lucide-react"

// Mock data
const teamMembers = [
  {
    id: 1,
    name: "Dr. João Silva",
    role: "Advogado Sênior",
    avatar: "/avatars/joao.jpg",
    status: "online",
    lastSeen: null,
  },
  {
    id: 2,
    name: "Dra. Maria Santos",
    role: "Advogada",
    avatar: "/avatars/maria.jpg",
    status: "online",
    lastSeen: null,
  },
  {
    id: 3,
    name: "Dr. Pedro Costa",
    role: "Advogado Júnior",
    avatar: "/avatars/pedro.jpg",
    status: "away",
    lastSeen: "5 min atrás",
  },
  {
    id: 4,
    name: "Ana Carolina",
    role: "Assistente Jurídica",
    avatar: "/avatars/ana.jpg",
    status: "offline",
    lastSeen: "2h atrás",
  },
]

const activities = [
  {
    id: 1,
    type: "case",
    user: "Dr. João Silva",
    action: "criou um novo processo",
    target: "Ação Trabalhista - Horas Extras",
    time: "5 min atrás",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "document",
    user: "Dra. Maria Santos",
    action: "fez upload de um documento",
    target: "Petição Inicial.pdf",
    time: "15 min atrás",
    icon: File,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "client",
    user: "Dr. Pedro Costa",
    action: "cadastrou um novo cliente",
    target: "Tech Solutions S/A",
    time: "1h atrás",
    icon: UserPlus,
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "task",
    user: "Ana Carolina",
    action: "concluiu uma tarefa",
    target: "Revisar contratos mensais",
    time: "2h atrás",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
  {
    id: 5,
    type: "meeting",
    user: "Dra. Maria Santos",
    action: "agendou uma reunião",
    target: "Audiência de Conciliação",
    time: "3h atrás",
    icon: Calendar,
    color: "text-orange-500",
  },
]

const messages = [
  {
    id: 1,
    user: "Dr. João Silva",
    avatar: "/avatars/joao.jpg",
    message: "Pessoal, precisamos revisar o processo da Tech Solutions antes da audiência de amanhã.",
    time: "10:30",
    isOwn: false,
  },
  {
    id: 2,
    user: "Você",
    avatar: "/avatars/you.jpg",
    message: "Pode deixar, Dr. João. Já estou revisando os documentos.",
    time: "10:32",
    isOwn: true,
  },
  {
    id: 3,
    user: "Dra. Maria Santos",
    avatar: "/avatars/maria.jpg",
    message: "Eu posso ajudar também. Qual o horário da audiência?",
    time: "10:35",
    isOwn: false,
  },
  {
    id: 4,
    user: "Dr. João Silva",
    avatar: "/avatars/joao.jpg",
    message: "Às 14h no Fórum Central, sala 201. Obrigado pela ajuda!",
    time: "10:36",
    isOwn: false,
  },
]

const notifications = [
  {
    id: 1,
    type: "deadline",
    title: "Prazo se aproximando",
    message: "Apresentar contestação - Processo 0001234-56.2024",
    time: "2h",
    priority: "high",
    unread: true,
  },
  {
    id: 2,
    type: "meeting",
    title: "Reunião em 1 hora",
    message: "Audiência de Conciliação com Ana Paula Oliveira",
    time: "1h",
    priority: "medium",
    unread: true,
  },
  {
    id: 3,
    type: "task",
    title: "Nova tarefa atribuída",
    message: "Revisar contrato - Cliente: Carlos Mendes",
    time: "3h",
    priority: "low",
    unread: false,
  },
  {
    id: 4,
    type: "document",
    title: "Documento compartilhado",
    message: "Dra. Maria compartilhou 'Decisão Judicial.pdf'",
    time: "5h",
    priority: "low",
    unread: false,
  },
]

const quickStats = [
  {
    title: "Tarefas Pendentes",
    value: "12",
    change: "+2 hoje",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    title: "Prazos Próximos",
    value: "5",
    change: "3 esta semana",
    icon: AlertCircle,
    color: "text-red-500",
  },
  {
    title: "Reuniões Hoje",
    value: "4",
    change: "2 concluídas",
    icon: Calendar,
    color: "text-blue-500",
  },
  {
    title: "Atividade da Equipe",
    value: "85%",
    change: "+5% vs ontem",
    icon: TrendingUp,
    color: "text-green-500",
  },
]

export default function WorkspacePage() {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("activity")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aqui você adicionaria a lógica para enviar a mensagem
      console.log("Enviando mensagem:", message)
      setMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
          <p className="text-muted-foreground">
            Colabore com sua equipe em tempo real
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column - Activity & Chat */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="activity">
                    <Activity className="mr-2 h-4 w-4" />
                    Atividades
                  </TabsTrigger>
                  <TabsTrigger value="chat">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat da Equipe
                  </TabsTrigger>
                </TabsList>

                {/* Activity Feed */}
                <TabsContent value="activity" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className={`rounded-full p-2 bg-muted ${activity.color}`}>
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              {activity.action}{" "}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Chat */}
                <TabsContent value="chat" className="mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-start space-x-3 ${
                            msg.isOwn ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={msg.avatar} />
                            <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`flex-1 space-y-1 ${
                              msg.isOwn ? "items-end" : ""
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium">
                                {msg.user}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.time}
                              </span>
                            </div>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                msg.isOwn
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="my-4" />

                  {/* Message Input */}
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="icon" variant="outline">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* Right Column - Team & Notifications */}
        <div className="space-y-4">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Equipe Online
              </CardTitle>
              <CardDescription>
                {teamMembers.filter((m) => m.status === "online").length} membros ativos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between space-x-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                              member.status
                            )}`}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {member.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.role}
                          </p>
                          {member.lastSeen && (
                            <p className="text-xs text-muted-foreground">
                              {member.lastSeen}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Enviar mensagem
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Ligar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Video className="mr-2 h-4 w-4" />
                            Videochamada
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notificações
                </span>
                <Badge variant="destructive">
                  {notifications.filter((n) => n.unread).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border-l-4 p-3 transition-colors hover:bg-muted/50 ${getPriorityColor(
                        notification.priority
                      )} ${notification.unread ? "bg-muted/30" : ""}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title}
                            {notification.unread && (
                              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            há {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}