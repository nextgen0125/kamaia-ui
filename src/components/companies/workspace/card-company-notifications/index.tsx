"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useAuditLogs } from "@/hooks/queries/useAuditLog"
import { IAuditLog } from "@/interfaces/IAuditLog"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Bell,
} from "lucide-react"

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


// ─── Componente principal ─────────────────────────────────────────────────────

export default function CardCompanyNotifications() {
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading: isContextLoading, company } = useCompanyDashboardContext()

  const {
    isLoading: isAuditLogLoading,
    isError,
    data,
  } = useAuditLogs(company?.id as string, {
    page: currentPage,
    take: 9,
  })

  const isLoading = isContextLoading || isAuditLogLoading
  const logs: IAuditLog[] = data?.audit_logs ?? []
  const totalPages = data?.total_pages ?? 1
  const total = data?.total ?? 0

  // Volta à primeira página ao mudar (segurança caso a página actual
  // fique fora do intervalo após um refetch)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll suave para o topo da lista
    document
      .getElementById("activity-feed-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
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
  )
}