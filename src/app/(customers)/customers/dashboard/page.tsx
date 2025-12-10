"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  FileText,
  Calendar,
  MessageSquare,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Mock data
const clientData = {
  name: "Carlos Eduardo Mendes",
  email: "carlos.mendes@email.com",
  phone: "(11) 98765-4321",
  lawyer: {
    name: "Dr. João Silva",
    oab: "OAB/SP 123456",
    phone: "(11) 91234-5678",
    email: "joao.silva@escritorio.com",
  },
}

const cases = [
  {
    id: "1",
    number: "0001234-56.2024.8.26.0100",
    title: "Ação Trabalhista - Horas Extras",
    status: "in_progress",
    progress: 65,
    court: "TRT 2ª Região",
    value: 45000,
    nextEvent: { title: "Audiência de Instrução", date: "2024-03-25", time: "09:30" },
  },
  {
    id: "2",
    number: "0002345-67.2024.8.26.0000",
    title: "Revisão Contratual",
    status: "completed",
    progress: 100,
    court: "TJSP",
    value: 15000,
    nextEvent: null,
  },
]

const documents = [
  { id: "1", name: "Petição Inicial.pdf", type: "Petição", size: "2.5 MB", date: "2024-01-15" },
  { id: "2", name: "Procuração.pdf", type: "Procuração", size: "450 KB", date: "2024-01-15" },
  { id: "3", name: "Decisão Judicial.pdf", type: "Decisão", size: "1.8 MB", date: "2024-03-01" },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Audiência de Instrução",
    caseTitle: "Ação Trabalhista",
    date: "2024-03-25",
    time: "09:30",
    location: "TRT 2ª Região - Sala 105",
  },
  {
    id: "2",
    title: "Reunião de acompanhamento",
    caseTitle: null,
    date: "2024-03-28",
    time: "15:00",
    location: "Online",
  },
]

const messages = [
  {
    id: "1",
    from: "Dr. João Silva",
    subject: "Atualização sobre o processo",
    preview: "Olá Carlos, gostaria de informar que houve uma movimentação importante...",
    date: "2024-03-18",
    unread: true,
  },
  {
    id: "2",
    from: "Escritório Silva & Associados",
    subject: "Documentos para assinatura",
    preview: "Prezado cliente, enviamos em anexo os documentos que necessitam...",
    date: "2024-03-15",
    unread: false,
  },
]

export default function CustomerDashboardPage() {
  const activeCases = cases.filter((c) => c.status === "in_progress")
  const completedCases = cases.filter((c) => c.status === "completed")

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })

  const getStatusBadge = (status: string) => {
    const config = {
      in_progress: { label: "Em Andamento", variant: "default" as const, icon: Clock },
      completed: { label: "Concluído", variant: "outline" as const, icon: CheckCircle2 },
    }
    return config[status as keyof typeof config] || config.in_progress
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Olá, {clientData.name.split(" ")[0]}! 👋</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu portal.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases.length}</div>
            <p className="text-xs text-muted-foreground">{completedCases.length} concluídos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">agendados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.unread).length}</div>
            <p className="text-xs text-muted-foreground">não lidas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Processos</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active">Em Andamento ({activeCases.length})</TabsTrigger>
                  <TabsTrigger value="completed">Concluídos ({completedCases.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4 mt-4">
                  {activeCases.map((caseItem) => {
                    const statusInfo = getStatusBadge(caseItem.status)
                    const StatusIcon = statusInfo.icon
                    return (
                      <div key={caseItem.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{caseItem.title}</h4>
                            <p className="text-xs text-muted-foreground font-mono">{caseItem.number}</p>
                          </div>
                          <Badge variant={statusInfo.variant}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">{caseItem.progress}%</span>
                          </div>
                          <Progress value={caseItem.progress} />
                        </div>
                        {caseItem.nextEvent && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{caseItem.nextEvent.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(caseItem.nextEvent.date)} às {caseItem.nextEvent.time}
                            </p>
                          </div>
                        )}
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </Button>
                      </div>
                    )
                  })}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4 mt-4">
                  {completedCases.map((caseItem) => (
                    <div key={caseItem.id} className="p-4 border rounded-lg opacity-75">
                      <h4 className="font-semibold">{caseItem.title}</h4>
                      <p className="text-xs text-muted-foreground font-mono">{caseItem.number}</p>
                      <Badge variant="outline" className="mt-2">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Concluído
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Seu Advogado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {clientData.lawyer.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{clientData.lawyer.name}</p>
                  <p className="text-sm text-muted-foreground">{clientData.lawyer.oab}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{clientData.lawyer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{clientData.lawyer.phone}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensagem
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Ligar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(event.date)} às {event.time}
                        </p>
                      </div>
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
