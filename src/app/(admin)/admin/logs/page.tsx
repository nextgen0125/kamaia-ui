"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import {
  FileText,
  Search,
  Download,
  Filter,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Activity,
  Clock,
} from "lucide-react"

const mockLogs = [
  {
    id: "1",
    timestamp: "2024-03-20T14:32:15Z",
    level: "error",
    service: "API Gateway",
    message: "Database connection timeout",
    user: "system",
    tenant: null,
    details: "Connection to primary database failed after 30s",
  },
  {
    id: "2",
    timestamp: "2024-03-20T14:30:45Z",
    level: "warning",
    service: "Email Service",
    message: "High queue size detected",
    user: "system",
    tenant: null,
    details: "Email queue reached 1000 pending messages",
  },
  {
    id: "3",
    timestamp: "2024-03-20T14:28:30Z",
    level: "info",
    service: "Auth Service",
    message: "User login successful",
    user: "joao.silva@silvaassociados.com",
    tenant: "Silva & Associados",
    details: "Login from IP: 192.168.1.100",
  },
  {
    id: "4",
    timestamp: "2024-03-20T14:25:12Z",
    level: "success",
    service: "Backup Service",
    message: "Database backup completed",
    user: "system",
    tenant: null,
    details: "Backup size: 2.5GB, Duration: 15m",
  },
  {
    id: "5",
    timestamp: "2024-03-20T14:20:00Z",
    level: "error",
    service: "Payment Service",
    message: "Payment processing failed",
    user: "system",
    tenant: "Advocacia Costa",
    details: "Card declined: insufficient funds",
  },
  {
    id: "6",
    timestamp: "2024-03-20T14:15:30Z",
    level: "info",
    service: "API Gateway",
    message: "New tenant created",
    user: "admin@kamaia.com",
    tenant: "Legal Tech Solutions",
    details: "Plan: Professional, Users: 5",
  },
  {
    id: "7",
    timestamp: "2024-03-20T14:10:45Z",
    level: "warning",
    service: "Storage Service",
    message: "Storage quota exceeded",
    user: "system",
    tenant: "Escritório Mendes",
    details: "Current usage: 52GB / 50GB limit",
  },
  {
    id: "8",
    timestamp: "2024-03-20T14:05:20Z",
    level: "info",
    service: "API Gateway",
    message: "API rate limit updated",
    user: "admin@kamaia.com",
    tenant: null,
    details: "New limit: 10000 req/hour",
  },
]

export default function LogsPage() {
  const [logs, setLogs] = useState(mockLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.tenant && log.tenant.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesService = serviceFilter === "all" || log.service === serviceFilter
    return matchesSearch && matchesLevel && matchesService
  })

  const services = [...new Set(logs.map((l) => l.service))]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getLevelBadge = (level: string) => {
    const config = {
      error: { label: "Error", variant: "destructive" as const },
      warning: { label: "Warning", variant: "default" as const },
      success: { label: "Success", variant: "default" as const },
      info: { label: "Info", variant: "secondary" as const },
    }
    return config[level as keyof typeof config] || config.info
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const stats = {
    total: logs.length,
    errors: logs.filter((l) => l.level === "error").length,
    warnings: logs.filter((l) => l.level === "warning").length,
    info: logs.filter((l) => l.level === "info").length,
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs do Sistema</h1>
          <p className="text-muted-foreground">Monitoramento e auditoria de eventos</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.errors}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.errors / stats.total) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.warnings}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.warnings / stats.total) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.info}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.info / stats.total) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos os Logs</CardTitle>
              <CardDescription>{filteredLogs.length} registros encontrados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar logs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                <SelectItem value="error">Errors</SelectItem>
                <SelectItem value="warning">Warnings</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtrar por serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os serviços</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Timestamp</TableHead>
                  <TableHead className="w-[100px]">Nível</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const levelBadge = getLevelBadge(log.level)
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={levelBadge.variant} className="gap-1">
                          {getLevelIcon(log.level)}
                          {levelBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.service}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{log.message}</p>
                          <p className="text-xs text-muted-foreground">{log.details}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.tenant ? (
                          <span className="text-sm">{log.tenant}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{log.user}</span>
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
