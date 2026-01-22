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
import { Progress } from "@/components/ui/progress"
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
  Briefcase,
  Calendar,
  DollarSign,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  Eye,
  Download,
  Plus,
  MessageSquare,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"

// Mock data
const getLawyerDetails = (id: string) => ({
  id,
  name: "Dr. João Silva",
  oab: "OAB/SP 123456",
  email: "joao.silva@escritorio.com",
  phone: "+244 987654324",
  cpf: "123.456.789-00",
  birthDate: "1980-03-20",
  specialties: ["Direito Trabalhista", "Direito Civil", "Direito Empresarial"],
  status: "active",
  registrationDate: "2020-01-15",
  address: {
    street: "Av. Gabriel Pereira, 1000 - Sala 1501",
    neighborhood: "Bela Vista",
    city: "Luanda",
    state: "LD",
    zip: "01310-100",
  },
  stats: {
    activeCases: 12,
    completedCases: 45,
    totalClients: 28,
    successRate: 87,
    totalRevenue: 250000,
  },
  cases: [
    {
      id: "1",
      number: "0001234-56.2024.8.26.0100",
      title: "Ação Trabalhista - Horas Extras",
      client: "Carlos Eduardo Mendes",
      status: "in_progress",
      area: "Direito Trabalhista",
      value: 45000,
      startDate: "2024-01-15",
      priority: "high",
    },
    {
      id: "2",
      number: "0003456-78.2024.8.26.0100",
      title: "Ação de Indenização",
      client: "Empresa ABC Ltda",
      status: "in_progress",
      area: "Direito Civil",
      value: 80000,
      startDate: "2024-02-01",
      priority: "high",
    },
    {
      id: "3",
      number: "0004567-89.2024.8.26.0000",
      title: "Revisão Contratual",
      client: "Tech Solutions S/A",
      status: "in_progress",
      area: "Direito Empresarial",
      value: 25000,
      startDate: "2024-03-01",
      priority: "medium",
    },
  ],
  clients: [
    {
      id: "1",
      name: "Carlos Eduardo Mendes",
      type: "pf",
      activeCases: 1,
      totalValue: 45000,
    },
    {
      id: "2",
      name: "Empresa ABC Ltda",
      type: "pj",
      activeCases: 1,
      totalValue: 80000,
    },
    {
      id: "3",
      name: "Tech Solutions S/A",
      type: "pj",
      activeCases: 1,
      totalValue: 25000,
    },
  ],
  schedule: [
    {
      id: 1,
      title: "Audiência de Instrução",
      type: "hearing",
      date: "2024-03-22",
      time: "09:30",
      location: "TRT 2ª Região - Sala 105",
      case: "Ação Trabalhista - Horas Extras",
    },
    {
      id: 2,
      title: "Reunião com Cliente",
      type: "meeting",
      date: "2024-03-25",
      time: "15:00",
      location: "Escritório",
      case: null,
    },
    {
      id: 3,
      title: "Prazo: Apresentar Memoriais",
      type: "deadline",
      date: "2024-03-28",
      time: "23:59",
      location: "Processo eletrônico",
      case: "Ação Trabalhista - Horas Extras",
    },
  ],
  performance: {
    thisMonth: {
      casesStarted: 3,
      casesCompleted: 2,
      revenue: 15000,
      hours: 120,
    },
    lastMonth: {
      casesStarted: 2,
      casesCompleted: 3,
      revenue: 18000,
      hours: 135,
    },
  },
  achievements: [
    {
      id: 1,
      title: "Expert em Direito Trabalhista",
      description: "Mais de 100 casos trabalhistas concluídos com sucesso",
      date: "2023-12-15",
      icon: Award,
    },
    {
      id: 2,
      title: "Cliente Satisfeito",
      description: "Avaliação média de 4.8/5 nos últimos 12 meses",
      date: "2024-01-20",
      icon: Award,
    },
  ],
})

export default function LawyerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const lawyer = getLawyerDetails(params.id as string)
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
    }
    return config[status as keyof typeof config] || config.active
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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {lawyer.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{lawyer.name}</h1>
              <p className="text-muted-foreground">{lawyer.oab}</p>
              <div className="flex gap-2 mt-1">
                {lawyer.specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
                {lawyer.specialties.length > 2 && (
                  <Badge variant="secondary">+{lawyer.specialties.length - 2}</Badge>
                )}
              </div>
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
                Exportar relatório
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                Atribuir caso
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Desativar advogado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Ativos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyer.stats.activeCases}</div>
            <p className="text-xs text-muted-foreground">
              {lawyer.stats.completedCases} concluídos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyer.stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {lawyer.clients.length} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyer.stats.successRate}%</div>
            <Progress value={lawyer.stats.successRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(lawyer.stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este ano
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={getStatusBadge(lawyer.status).variant}>
              {getStatusBadge(lawyer.status).label}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Desde {formatDate(lawyer.registrationDate)}
            </p>
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
              <TabsTrigger value="cases">Casos</TabsTrigger>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Profissionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">OAB</h4>
                      <p className="text-sm font-medium">{lawyer.oab}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">NIF</h4>
                      <p className="text-sm font-medium">{lawyer.cpf}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Nascimento</h4>
                      <p className="text-sm font-medium">{formatDate(lawyer.birthDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Cadastro</h4>
                      <p className="text-sm font-medium">{formatDate(lawyer.registrationDate)}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Especialidades</h4>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Endereço</h4>
                    <div className="space-y-1 text-sm">
                      <p>{lawyer.address.street}</p>
                      <p>{lawyer.address.neighborhood}</p>
                      <p>{lawyer.address.city} - {lawyer.address.state}</p>
                      <p>CEP: {lawyer.address.zip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conquistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lawyer.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <achievement.icon className="h-6 w-6 text-yellow-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(achievement.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cases */}
            <TabsContent value="cases">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Casos do Advogado</CardTitle>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Caso
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prioridade</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lawyer.cases.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-mono text-xs">
                            {caseItem.number}
                          </TableCell>
                          <TableCell>{caseItem.title}</TableCell>
                          <TableCell>{caseItem.client}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(caseItem.status).variant}>
                              {getStatusBadge(caseItem.status).label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPriorityBadge(caseItem.priority).variant}>
                              {getPriorityBadge(caseItem.priority).label}
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

            {/* Clients */}
            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle>Clientes Atribuídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Casos Ativos</TableHead>
                        <TableHead>Valor Total</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lawyer.clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {client.type === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}
                            </Badge>
                          </TableCell>
                          <TableCell>{client.activeCases}</TableCell>
                          <TableCell>{formatCurrency(client.totalValue)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/clients/${client.id}`}>
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

            {/* Performance */}
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Este Mês</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Casos Iniciados</p>
                          <p className="text-2xl font-bold">{lawyer.performance.thisMonth.casesStarted}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Casos Concluídos</p>
                          <p className="text-2xl font-bold">{lawyer.performance.thisMonth.casesCompleted}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Receita</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(lawyer.performance.thisMonth.revenue)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Horas Trabalhadas</p>
                          <p className="text-2xl font-bold">{lawyer.performance.thisMonth.hours}h</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-4">Mês Anterior</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Casos Iniciados</p>
                          <p className="text-2xl font-bold">{lawyer.performance.lastMonth.casesStarted}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Casos Concluídos</p>
                          <p className="text-2xl font-bold">{lawyer.performance.lastMonth.casesCompleted}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Receita</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(lawyer.performance.lastMonth.revenue)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Horas Trabalhadas</p>
                          <p className="text-2xl font-bold">{lawyer.performance.lastMonth.hours}h</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  <span className="truncate">{lawyer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lawyer.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{lawyer.address.street}, {lawyer.address.city}</span>
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

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agenda Próximos Dias</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {lawyer.schedule.map((event) => (
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
                        {event.case && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {event.case}
                          </p>
                        )}
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
