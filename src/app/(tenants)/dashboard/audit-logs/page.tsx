"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  Shield,
  Search,
  Download,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Upload,
} from "lucide-react"
import { ExportDialog } from "@/components/export/export-dialog"

interface AuditLog {
  id: string
  timestamp: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  entity: string
  entityId: string
  entityName: string
  changes?: {
    field: string
    oldValue: string
    newValue: string
  }[]
  ipAddress: string
  userAgent: string
}

const mockLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-03-20T14:30:00",
    user: { name: "Dr. João Silva" },
    action: "create",
    entity: "case",
    entityId: "1",
    entityName: "Ação Trabalhista - Horas Extras",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 122.0",
  },
  {
    id: "2",
    timestamp: "2024-03-20T14:15:00",
    user: { name: "Dra. Maria Santos" },
    action: "update",
    entity: "client",
    entityId: "5",
    entityName: "Carlos Eduardo Mendes",
    changes: [
      { field: "phone", oldValue: "(11) 98765-4320", newValue: "(11) 98765-4321" },
      { field: "email", oldValue: "carlos@email.com", newValue: "carlos.mendes@email.com" },
    ],
    ipAddress: "192.168.1.101",
    userAgent: "Firefox 123.0",
  },
  {
    id: "3",
    timestamp: "2024-03-20T13:45:00",
    user: { name: "Dr. Pedro Costa" },
    action: "delete",
    entity: "document",
    entityId: "15",
    entityName: "Rascunho Petição.pdf",
    ipAddress: "192.168.1.102",
    userAgent: "Safari 17.0",
  },
  {
    id: "4",
    timestamp: "2024-03-20T13:30:00",
    user: { name: "Ana Carolina" },
    action: "upload",
    entity: "document",
    entityId: "16",
    entityName: "Contestação Final.pdf",
    ipAddress: "192.168.1.103",
    userAgent: "Chrome 122.0",
  },
  {
    id: "5",
    timestamp: "2024-03-20T12:00:00",
    user: { name: "Dr. João Silva" },
    action: "update",
    entity: "case",
    entityId: "1",
    entityName: "Ação Trabalhista - Horas Extras",
    changes: [
      { field: "status", oldValue: "pending", newValue: "in_progress" },
    ],
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 122.0",
  },
  {
    id: "6",
    timestamp: "2024-03-20T11:30:00",
    user: { name: "Admin Sistema" },
    action: "settings",
    entity: "system",
    entityId: "config",
    entityName: "Configurações de notificações",
    changes: [
      { field: "email_notifications", oldValue: "false", newValue: "true" },
    ],
    ipAddress: "192.168.1.1",
    userAgent: "Chrome 122.0",
  },
]

export default function AuditLogsPage() {
  const [logs, setLogs] = useState(mockLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterEntity, setFilterEntity] = useState("all")

  const getActionIcon = (action: string) => {
    const icons = {
      create: <Plus className="h-4 w-4" />,
      update: <Edit className="h-4 w-4" />,
      delete: <Trash2 className="h-4 w-4" />,
      upload: <Upload className="h-4 w-4" />,
      view: <Eye className="h-4 w-4" />,
      settings: <Settings className="h-4 w-4" />,
    }
    return icons[action as keyof typeof icons] || <FileText className="h-4 w-4" />
  }

  const getActionBadge = (action: string) => {
    const config = {
      create: { label: "Criar", variant: "default" as const },
      update: { label: "Editar", variant: "secondary" as const },
      delete: { label: "Excluir", variant: "destructive" as const },
      upload: { label: "Upload", variant: "default" as const },
      view: { label: "Visualizar", variant: "outline" as const },
      settings: { label: "Configurar", variant: "secondary" as const },
    }
    return config[action as keyof typeof config] || config.view
  }

  const getEntityLabel = (entity: string) => {
    const labels = {
      case: "Processo",
      client: "Cliente",
      lawyer: "Advogado",
      document: "Documento",
      task: "Tarefa",
      transaction: "Transação",
      system: "Sistema",
    }
    return labels[entity as keyof typeof labels] || entity
  }

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesEntity = filterEntity === "all" || log.entity === filterEntity

    return matchesSearch && matchesAction && matchesEntity
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs de Auditoria</h1>
          <p className="text-muted-foreground">
            Histórico completo de ações no sistema
          </p>
        </div>
        <ExportDialog
          title="Exportar Logs de Auditoria"
          description="Escolha o formato e período para exportar os logs"
          dataType="documents"
        >
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </ExportDialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(l => l.user.name)).size}
            </div>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Criações</CardTitle>
            <Plus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter(l => l.action === "create").length}
            </div>
            <p className="text-xs text-muted-foreground">Novos registros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exclusões</CardTitle>
            <Trash2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter(l => l.action === "delete").length}
            </div>
            <p className="text-xs text-muted-foreground">Registros removidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por usuário, ação ou entidade..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Todas as ações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="create">Criar</SelectItem>
                <SelectItem value="update">Editar</SelectItem>
                <SelectItem value="delete">Excluir</SelectItem>
                <SelectItem value="upload">Upload</SelectItem>
                <SelectItem value="view">Visualizar</SelectItem>
                <SelectItem value="settings">Configurar</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterEntity} onValueChange={setFilterEntity}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Todas entidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas entidades</SelectItem>
                <SelectItem value="case">Processos</SelectItem>
                <SelectItem value="client">Clientes</SelectItem>
                <SelectItem value="lawyer">Advogados</SelectItem>
                <SelectItem value="document">Documentos</SelectItem>
                <SelectItem value="task">Tarefas</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Atividades</CardTitle>
          <CardDescription>
            {filteredLogs.length} registros encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Entidade</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const { date, time } = formatDateTime(log.timestamp)
                  const actionBadge = getActionBadge(log.action)
                  
                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{date}</span>
                          <span className="text-xs text-muted-foreground">{time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {log.user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{log.user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={actionBadge.variant}>
                          {actionBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {getEntityLabel(log.entity)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {log.entityName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.changes && log.changes.length > 0 ? (
                          <div className="text-xs">
                            {log.changes.map((change, idx) => (
                              <div key={idx} className="text-muted-foreground">
                                <span className="font-medium">{change.field}:</span>{" "}
                                <span className="line-through">{change.oldValue}</span>
                                {" → "}
                                <span className="text-foreground">{change.newValue}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs">{log.ipAddress}</span>
                          <span className="text-xs text-muted-foreground">
                            {log.userAgent}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
