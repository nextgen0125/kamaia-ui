"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  Calendar,
  DollarSign,
  User,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  Upload,
  Plus,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

// Mock data - substituir por API real
const getCaseDetails = (id: string) => ({
  id,
  number: "0001234-56.2024.8.26.0100",
  title: "Ação Trabalhista - Horas Extras",
  description: "Reclamação trabalhista referente ao não pagamento de horas extras realizadas no período de 2022 a 2024.",
  status: "in_progress",
  priority: "high",
  type: "Ação Trabalhista",
  court: "TRT 2ª Região - São Paulo",
  area: "Direito Trabalhista",
  value: 45000,
  startDate: "2024-01-15",
  lastUpdate: "2024-03-15",
  client: {
    id: "1",
    name: "Carlos Eduardo Mendes",
    type: "Pessoa Física",
    cpf: "123.456.789-00",
    email: "carlos.mendes@email.com",
    phone: "(11) 98765-4321",
  },
  lawyer: {
    id: "1",
    name: "Dr. João Silva",
    oab: "OAB/SP 123456",
    email: "joao.silva@escritorio.com",
    phone: "(11) 91234-5678",
  },
  timeline: [
    {
      id: 1,
      date: "2024-03-15",
      time: "14:30",
      title: "Audiência de Instrução realizada",
      description: "Foram ouvidas testemunhas de ambas as partes. Próxima etapa: apresentação de memoriais.",
      type: "hearing",
      user: "Dr. João Silva",
    },
    {
      id: 2,
      date: "2024-03-10",
      time: "10:00",
      title: "Documento anexado",
      description: "Petição de juntada de documentos - Contracheques do período.",
      type: "document",
      user: "Dr. João Silva",
    },
    {
      id: 3,
      date: "2024-03-01",
      time: "16:00",
      title: "Contestação apresentada",
      description: "Reclamada apresentou contestação refutando os pedidos.",
      type: "document",
      user: "Sistema",
    },
    {
      id: 4,
      date: "2024-02-15",
      time: "09:00",
      title: "Audiência de Conciliação",
      description: "Tentativa de acordo frustrada. Processo prosseguirá para instrução.",
      type: "hearing",
      user: "Dr. João Silva",
    },
    {
      id: 5,
      date: "2024-01-15",
      time: "11:00",
      title: "Processo distribuído",
      description: "Inicial protocolada e processo distribuído para a 10ª Vara do Trabalho.",
      type: "start",
      user: "Dr. João Silva",
    },
  ],
  documents: [
    {
      id: 1,
      name: "Petição Inicial.pdf",
      type: "Petição",
      size: "2.5 MB",
      date: "2024-01-15",
      uploadedBy: "Dr. João Silva",
    },
    {
      id: 2,
      name: "Procuração.pdf",
      type: "Procuração",
      size: "450 KB",
      date: "2024-01-15",
      uploadedBy: "Dr. João Silva",
    },
    {
      id: 3,
      name: "Contracheques 2022-2024.pdf",
      type: "Documento",
      size: "3.2 MB",
      date: "2024-03-10",
      uploadedBy: "Dr. João Silva",
    },
    {
      id: 4,
      name: "Contestação.pdf",
      type: "Contestação",
      size: "1.8 MB",
      date: "2024-03-01",
      uploadedBy: "Sistema",
    },
  ],
  tasks: [
    {
      id: 1,
      title: "Preparar memoriais finais",
      description: "Elaborar memoriais com base nas provas apresentadas",
      dueDate: "2024-03-25",
      status: "pending",
      assignedTo: "Dr. João Silva",
      priority: "high",
    },
    {
      id: 2,
      title: "Revisar depoimentos das testemunhas",
      description: "Analisar contradições nos depoimentos",
      dueDate: "2024-03-20",
      status: "in_progress",
      assignedTo: "Dr. João Silva",
      priority: "medium",
    },
    {
      id: 3,
      title: "Preparar cliente para próxima audiência",
      description: "Reunião preparatória com o cliente",
      dueDate: "2024-03-18",
      status: "completed",
      assignedTo: "Dr. João Silva",
      priority: "high",
    },
  ],
  events: [
    {
      id: 1,
      title: "Prazo para Memoriais",
      date: "2024-03-25",
      time: "23:59",
      type: "deadline",
      location: "Processo eletrônico",
    },
    {
      id: 2,
      title: "Possível data de sentença",
      date: "2024-04-15",
      time: "14:00",
      type: "estimate",
      location: "TRT 2ª Região",
    },
  ],
  notes: [
    {
      id: 1,
      content: "Cliente apresentou novos documentos que podem fortalecer o caso. Verificar possibilidade de juntada aos autos.",
      author: "Dr. João Silva",
      date: "2024-03-14",
      time: "15:30",
    },
    {
      id: 2,
      content: "Testemunhas foram convincentes. Expectativa de decisão favorável.",
      author: "Dr. João Silva",
      date: "2024-03-15",
      time: "16:45",
    },
  ],
})

export default function CaseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const caseData = getCaseDetails(params.id as string)
  const [activeTab, setActiveTab] = useState("timeline")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_progress: { label: "Em Andamento", variant: "default" as const },
      pending: { label: "Aguardando", variant: "secondary" as const },
      completed: { label: "Concluído", variant: "outline" as const },
      archived: { label: "Arquivado", variant: "outline" as const },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.in_progress
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "Alta", variant: "destructive" as const },
      medium: { label: "Média", variant: "default" as const },
      low: { label: "Baixa", variant: "secondary" as const },
    }
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
  }

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "hearing":
        return <Calendar className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "start":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{caseData.title}</h1>
            <p className="text-muted-foreground">{caseData.number}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Exportar dados
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                Upload documento
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Arquivar processo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={getStatusBadge(caseData.status).variant}>
              {getStatusBadge(caseData.status).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prioridade</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={getPriorityBadge(caseData.priority).variant}>
              {getPriorityBadge(caseData.priority).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor da Causa</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(caseData.value)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">{formatDate(caseData.lastUpdate)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Processo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h4>
                <p className="text-sm">{caseData.description}</p>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipo de Processo</h4>
                  <p className="text-sm font-medium">{caseData.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Área do Direito</h4>
                  <p className="text-sm font-medium">{caseData.area}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tribunal</h4>
                  <p className="text-sm font-medium">{caseData.court}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Início</h4>
                  <p className="text-sm font-medium">{formatDate(caseData.startDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                  <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                  <TabsTrigger value="notes">Anotações</TabsTrigger>
                </TabsList>

                {/* Timeline */}
                <TabsContent value="timeline" className="mt-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {caseData.timeline.map((event, index) => (
                        <div key={event.id} className="relative">
                          {index !== caseData.timeline.length - 1 && (
                            <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="rounded-full p-2 bg-primary text-primary-foreground">
                              {getTimelineIcon(event.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{event.title}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(event.date)} às {event.time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {event.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Por {event.user}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Documents */}
                <TabsContent value="documents" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-end mb-4">
                      <Button size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documento
                      </Button>
                    </div>
                    <ScrollArea className="h-[450px]">
                      {caseData.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{formatDate(doc.date)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Visualizar</DropdownMenuItem>
                                <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* Tasks */}
                <TabsContent value="tasks" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-end mb-4">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Tarefa
                      </Button>
                    </div>
                    <ScrollArea className="h-[450px]">
                      {caseData.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-4 border rounded-lg mb-2 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{task.title}</p>
                                <Badge
                                  variant={
                                    task.status === "completed"
                                      ? "outline"
                                      : task.status === "in_progress"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {task.status === "completed"
                                    ? "Concluída"
                                    : task.status === "in_progress"
                                    ? "Em Andamento"
                                    : "Pendente"}
                                </Badge>
                                <Badge variant={getPriorityBadge(task.priority).variant}>
                                  {getPriorityBadge(task.priority).label}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(task.dueDate)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {task.assignedTo}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* Notes */}
                <TabsContent value="notes" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-end mb-4">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Anotação
                      </Button>
                    </div>
                    <ScrollArea className="h-[450px]">
                      {caseData.notes.map((note) => (
                        <div
                          key={note.id}
                          className="p-4 border rounded-lg mb-2 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {note.author.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{note.author}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(note.date)} às {note.time}
                            </span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* Right Column - Client & Lawyer Info */}
        <div className="space-y-4">
          {/* Client Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {caseData.client.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{caseData.client.name}</p>
                  <p className="text-xs text-muted-foreground">{caseData.client.type}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.client.cpf}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{caseData.client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.client.phone}</span>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mensagem
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lawyer Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Advogado Responsável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {caseData.lawyer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{caseData.lawyer.name}</p>
                  <p className="text-xs text-muted-foreground">{caseData.lawyer.oab}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{caseData.lawyer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.lawyer.phone}</span>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mensagem
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {caseData.events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(event.date)} às {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
