"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, FileText, Clock, AlertCircle, CheckCircle, Scale } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddCaseDialog } from "@/components/cases/add-case-dialog"

// Mock data
const cases = [
  {
    id: 1,
    number: "0001234-56.2024.8.26.0100",
    title: "Ação Trabalhista - Horas Extras",
    client: "Carlos Mendes",
    lawyer: "Dra. Maria Santos",
    court: "TRT 2ª Região",
    status: "active",
    priority: "high",
    phase: "Contestação",
    value: 50000,
    createdAt: "2024-01-15",
    lastUpdate: "2024-03-10",
  },
  {
    id: 2,
    number: "0002345-67.2024.8.26.0000",
    title: "Divórcio Consensual",
    client: "Ana Paula Oliveira",
    lawyer: "Dr. João Silva",
    court: "Vara de Família - SP",
    status: "active",
    priority: "medium",
    phase: "Audiência",
    value: 0,
    createdAt: "2024-02-20",
    lastUpdate: "2024-03-12",
  },
  {
    id: 3,
    number: "0003456-78.2024.8.26.0100",
    title: "Cobrança - Inadimplência",
    client: "Empresa ABC Ltda",
    lawyer: "Dr. Pedro Costa",
    court: "Foro Central - SP",
    status: "pending",
    priority: "low",
    phase: "Distribuição",
    value: 25000,
    createdAt: "2024-03-05",
    lastUpdate: "2024-03-05",
  },
  {
    id: 4,
    number: "0004567-89.2023.8.26.0100",
    title: "Indenização por Danos Morais",
    client: "Tech Solutions S/A",
    lawyer: "Dr. João Silva",
    court: "Vara Cível - SP",
    status: "completed",
    priority: "medium",
    phase: "Sentença",
    value: 100000,
    createdAt: "2023-06-10",
    lastUpdate: "2024-02-28",
  },
]

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "completed">("all")

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.client.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || case_.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: cases.length,
    active: cases.filter((c) => c.status === "active").length,
    pending: cases.filter((c) => c.status === "pending").length,
    completed: cases.filter((c) => c.status === "completed").length,
    totalValue: cases.reduce((acc, c) => acc + c.value, 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Em Andamento"
      case "pending":
        return "Aguardando"
      case "completed":
        return "Concluído"
      default:
        return status
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="size-4 text-red-500" />
      case "medium":
        return <Clock className="size-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="size-4 text-green-500" />
      default:
        return null
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Processos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os processos jurídicos
          </p>
        </div>
        <AddCaseDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
            <Scale className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todos os status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Processos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
            <AlertCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Finalizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground">Soma das causas</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Processos</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os processos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterStatus(v as any)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <TabsList>
                <TabsTrigger value="all">Todos ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">Em Andamento ({stats.active})</TabsTrigger>
                <TabsTrigger value="pending">Aguardando ({stats.pending})</TabsTrigger>
                <TabsTrigger value="completed">Concluídos ({stats.completed})</TabsTrigger>
              </TabsList>

              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, título ou cliente..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={filterStatus} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Processo</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Advogado</TableHead>
                      <TableHead>Fórum/Tribunal</TableHead>
                      <TableHead>Fase</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCases.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground">
                          Nenhum processo encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCases.map((case_) => (
                        <TableRow key={case_.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{case_.title}</div>
                              <div className="text-sm text-muted-foreground font-mono">{case_.number}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{case_.client}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{case_.lawyer}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{case_.court}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{case_.phase}</Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">
                              {case_.value > 0 ? formatCurrency(case_.value) : "-"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(case_.status)}>
                              {getStatusLabel(case_.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getPriorityIcon(case_.priority)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="size-4" />
                                  <span className="sr-only">Abrir menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/cases/${case_.id}`}>
                                    <Eye className="mr-2 size-4" />
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/cases/${case_.id}/edit`}>
                                    <Edit className="mr-2 size-4" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/cases/${case_.id}/timeline`}>
                                    <Clock className="mr-2 size-4" />
                                    Timeline
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 size-4" />
                                  Arquivar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
