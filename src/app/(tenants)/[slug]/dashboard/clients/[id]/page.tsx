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
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  FileText,
  Calendar,
  DollarSign,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  MessageSquare,
  Eye,
  Download,
  Plus,
} from "lucide-react"
import Link from "next/link"

// Mock data
const getClientDetails = (id: string) => ({
  id,
  name: "Carlos Eduardo Mendes",
  type: "pf",
  cpf: "12323123123123123",
  rg: "12.345.678-9",
  email: "carlos.mendes@email.com",
  phone: "+244 945 923 923",
  birthDate: "1985-05-15",
  profession: "Engenheiro Civil",
  address: {
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zip: "01234-567",
  },
  status: "active",
  registrationDate: "2024-01-15",
  responsibleLawyer: {
    id: "1",
    name: "Dr. João Silva",
    oab: "OAB/SP 123456",
  },
  cases: [
    {
      id: "1",
      number: "0001234-56.2024.8.26.0100",
      title: "Ação Trabalhista - Horas Extras",
      status: "in_progress",
      area: "Direito Trabalhista",
      value: 45000,
      startDate: "2024-01-15",
    },
    {
      id: "2",
      number: "0002345-67.2024.8.26.0000",
      title: "Revisão Contratual",
      status: "completed",
      area: "Direito Civil",
      value: 15000,
      startDate: "2023-11-20",
    },
  ],
  documents: [
    {
      id: 1,
      name: "RG - Frente e Verso.pdf",
      type: "Identificação",
      size: "1.2 MB",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "CPF.pdf",
      type: "Identificação",
      size: "450 KB",
      date: "2024-01-15",
    },
    {
      id: 3,
      name: "Comprovante de Residência.pdf",
      type: "Comprovante",
      size: "850 KB",
      date: "2024-01-16",
    },
    {
      id: 4,
      name: "Procuração.pdf",
      type: "Procuração",
      size: "650 KB",
      date: "2024-01-15",
    },
  ],
  transactions: [
    {
      id: 1,
      type: "income",
      description: "Honorários - Ação Trabalhista",
      amount: 5000,
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 2,
      type: "income",
      description: "Honorários - Revisão Contratual",
      amount: 3000,
      date: "2024-02-10",
      status: "completed",
    },
    {
      id: 3,
      type: "income",
      description: "Consultoria jurídica",
      amount: 1500,
      date: "2024-03-01",
      status: "pending",
    },
  ],
  notes: [
    {
      id: 1,
      content: "Cliente muito pontual e organizado. Sempre traz documentação completa.",
      author: "Dr. João Silva",
      date: "2024-03-10",
      time: "14:30",
    },
    {
      id: 2,
      content: "Preferência por comunicação via e-mail. Responde rapidamente.",
      author: "Dr. João Silva",
      date: "2024-02-20",
      time: "10:15",
    },
  ],
  meetings: [
    {
      id: 1,
      title: "Reunião de acompanhamento",
      date: "2024-03-25",
      time: "15:00",
      duration: 60,
      location: "Escritório",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Assinatura de documentos",
      date: "2024-03-20",
      time: "10:00",
      duration: 30,
      location: "Escritório",
      status: "completed",
    },
  ],
})

export default function ClientDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const client = getClientDetails(params.id as string)
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Ativo", variant: "default" as const },
      inactive: { label: "Inativo", variant: "secondary" as const },
      in_progress: { label: "Em Andamento", variant: "default" as const },
      completed: { label: "Concluído", variant: "outline" as const },
      scheduled: { label: "Agendado", variant: "default" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
    }
    return config[status as keyof typeof config] || config.active
  }

  const totalIncome = client.transactions
    .filter(t => t.type === "income" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingIncome = client.transactions
    .filter(t => t.type === "income" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg">
                {client.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
              <p className="text-muted-foreground">
                {client.type === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
              </p>
            </div>
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
                <Plus className="mr-2 h-4 w-4" />
                Novo processo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar cliente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={getStatusBadge(client.status).variant}>
              {getStatusBadge(client.status).label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {client.cases.filter(c => c.status === "in_progress").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {client.cases.length} no total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Honorários Recebidos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(pendingIncome)} pendente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliente desde</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {formatDate(client.registrationDate)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="cases">Processos</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">NIF</h4>
                      <p className="text-sm font-medium">{client.cpf}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">RG</h4>
                      <p className="text-sm font-medium">{client.rg}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Nascimento</h4>
                      <p className="text-sm font-medium">{formatDate(client.birthDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Profissão</h4>
                      <p className="text-sm font-medium">{client.profession}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Endereço</h4>
                    <div className="space-y-1 text-sm">
                      <p>{client.address.street}</p>
                      <p>{client.address.neighborhood}</p>
                      <p>{client.address.city} - {client.address.state}</p>
                      <p>CEP: {client.address.zip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Anotações</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {client.notes.map((note) => (
                        <div key={note.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-medium">{note.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(note.date)} às {note.time}
                            </span>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cases */}
            <TabsContent value="cases">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Processos do Cliente</CardTitle>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Processo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.cases.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-mono text-xs">
                            {caseItem.number}
                          </TableCell>
                          <TableCell>{caseItem.title}</TableCell>
                          <TableCell>{caseItem.area}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(caseItem.status).variant}>
                              {getStatusBadge(caseItem.status).label}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(caseItem.value)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/cases/${caseItem.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Documentos</CardTitle>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {client.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-muted/50"
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
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className="font-bold text-green-600">
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(transaction.status).variant}>
                              {getStatusBadge(transaction.status).label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{client.address.street}, {client.address.city}</span>
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

          {/* Responsible Lawyer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Advogado Responsável</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {client.responsibleLawyer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{client.responsibleLawyer.name}</p>
                  <p className="text-xs text-muted-foreground">{client.responsibleLawyer.oab}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximas Reuniões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {client.meetings
                  .filter(m => m.status === "scheduled")
                  .map((meeting) => (
                    <div key={meeting.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{meeting.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(meeting.date)} às {meeting.time}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {meeting.location}
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
