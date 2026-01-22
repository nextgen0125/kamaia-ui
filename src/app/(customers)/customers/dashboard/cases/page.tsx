"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Briefcase,
  Search,
  Eye,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Filter,
  Download,
} from "lucide-react"
import Link from "next/link"

const mockCases = [
  {
    id: "1",
    number: "0001234-56.2024.8.26.0100",
    title: "Ação Trabalhista - Horas Extras",
    status: "in_progress",
    priority: "high",
    progress: 65,
    court: "TRT 2ª Região - São Paulo",
    area: "Direito Trabalhista",
    value: 45000,
    startDate: "2024-01-15",
    lastUpdate: "2024-03-15",
    lawyer: "Dr. João Silva",
    nextEvent: {
      title: "Audiência de Instrução",
      date: "2024-03-25",
      time: "09:30",
    },
  },
  {
    id: "2",
    number: "0002345-67.2024.8.26.0000",
    title: "Revisão Contratual",
    status: "completed",
    priority: "medium",
    progress: 100,
    court: "TJSP",
    area: "Direito Civil",
    value: 15000,
    startDate: "2023-11-20",
    lastUpdate: "2024-03-01",
    lawyer: "Dr. João Silva",
    nextEvent: null,
  },
  {
    id: "3",
    number: "0003456-78.2024.8.26.0100",
    title: "Ação de Indenização",
    status: "in_progress",
    priority: "high",
    progress: 30,
    court: "TJSP - 5ª Vara Cível",
    area: "Direito do Consumidor",
    value: 25000,
    startDate: "2024-02-10",
    lastUpdate: "2024-03-18",
    lawyer: "Dra. Maria Santos",
    nextEvent: {
      title: "Audiência de Conciliação",
      date: "2024-03-30",
      time: "14:00",
    },
  },
]

export default function CustomerCasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.number.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(value)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

  const getStatusInfo = (status: string) => {
    const config = {
      in_progress: { label: "Em Andamento", variant: "default" as const, icon: Clock },
      completed: { label: "Concluído", variant: "outline" as const, icon: CheckCircle2 },
      pending: { label: "Aguardando", variant: "secondary" as const, icon: AlertCircle },
    }
    return config[status as keyof typeof config] || config.in_progress
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { label: "Alta", variant: "destructive" as const },
      medium: { label: "Média", variant: "default" as const },
      low: { label: "Baixa", variant: "secondary" as const },
    }
    return config[priority as keyof typeof config] || config.medium
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Processos</h1>
        <p className="text-muted-foreground">Acompanhe todos os seus processos jurídicos</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCases.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCases.filter((c) => c.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCases.filter((c) => c.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockCases.reduce((sum, c) => sum + c.value, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos os Processos</CardTitle>
              <CardDescription>{filteredCases.length} processos encontrados</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número ou título..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
                <SelectItem value="pending">Aguardando</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredCases.map((caseItem) => {
              const statusInfo = getStatusInfo(caseItem.status)
              const priorityInfo = getPriorityBadge(caseItem.priority)
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={caseItem.id}
                  className="p-6 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{caseItem.title}</h3>
                          <p className="text-sm text-muted-foreground font-mono mt-1">
                            {caseItem.number}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={statusInfo.variant}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                          <Badge variant={priorityInfo.variant}>{priorityInfo.label}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Tribunal</p>
                          <p className="text-sm font-medium">{caseItem.court}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Área</p>
                          <p className="text-sm font-medium">{caseItem.area}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Valor</p>
                          <p className="text-sm font-medium">{formatCurrency(caseItem.value)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Advogado</p>
                          <p className="text-sm font-medium">{caseItem.lawyer}</p>
                        </div>
                      </div>

                      {caseItem.status === "in_progress" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">{caseItem.progress}%</span>
                          </div>
                          <Progress value={caseItem.progress} className="h-2" />
                        </div>
                      )}

                      {caseItem.nextEvent && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{caseItem.nextEvent.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(caseItem.nextEvent.date)} às {caseItem.nextEvent.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="default" asChild className="flex-1 md:flex-none">
                      <Link href={`/customers/dashboard/cases/${caseItem.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes Completos
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none">
                      <Download className="mr-2 h-4 w-4" />
                      Documentos
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
