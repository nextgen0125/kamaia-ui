"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Phone,
  Video,
  MoreVertical,
  Users,
  Bell,
  MessageSquare,
} from "lucide-react"
import CompanyWorkspaceKPIs from "@/components/companies/workspace/company-workspace-kpis"
import CompanyActivityAndChat from "@/components/companies/workspace/company-activity-and-chat"

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

export default function WorkspacePage() {

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
      <CompanyWorkspaceKPIs />

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column - Activity & Chat */}
        <CompanyActivityAndChat />

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