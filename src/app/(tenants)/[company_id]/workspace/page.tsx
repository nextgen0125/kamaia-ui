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
import CardCompanyTeamMembers from "@/components/companies/workspace/card-company-team-members"



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
          <CardCompanyTeamMembers />

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