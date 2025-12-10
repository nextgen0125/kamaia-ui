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
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Mail, Phone, Building2, Users } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddClientDialog } from "@/components/clients/add-client-dialog"

// Mock data
const clients = [
  {
    id: 1,
    name: "Empresa ABC Ltda",
    type: "legal",
    email: "contato@empresaabc.com",
    phone: "(11) 3456-7890",
    cpfCnpj: "12.345.678/0001-90",
    cases: 8,
    status: "active",
    avatar: null,
    responsible: "Dr. João Silva",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    type: "individual",
    email: "carlos.mendes@email.com",
    phone: "(11) 91234-5678",
    cpfCnpj: "123.456.789-00",
    cases: 2,
    status: "active",
    avatar: null,
    responsible: "Dra. Maria Santos",
  },
  {
    id: 3,
    name: "Tech Solutions S/A",
    type: "legal",
    email: "juridico@techsolutions.com",
    phone: "(11) 3789-0123",
    cpfCnpj: "98.765.432/0001-10",
    cases: 15,
    status: "active",
    avatar: null,
    responsible: "Dr. Pedro Costa",
  },
  {
    id: 4,
    name: "Ana Paula Oliveira",
    type: "individual",
    email: "ana.oliveira@email.com",
    phone: "(11) 98765-4321",
    cpfCnpj: "987.654.321-00",
    cases: 1,
    status: "inactive",
    avatar: null,
    responsible: "Dr. João Silva",
  },
]

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "individual" | "legal">("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cpfCnpj.includes(searchQuery)

    const matchesType = filterType === "all" || client.type === filterType

    return matchesSearch && matchesType
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const stats = {
    total: clients.length,
    individual: clients.filter((c) => c.type === "individual").length,
    legal: clients.filter((c) => c.type === "legal").length,
    active: clients.filter((c) => c.status === "active").length,
    totalCases: clients.reduce((acc, c) => acc + c.cases, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e seus processos
          </p>
        </div>
        <AddClientDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+3 desde o último mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pessoa Física</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.individual}</div>
            <p className="text-xs text-muted-foreground">Clientes individuais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pessoa Jurídica</CardTitle>
            <Building2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.legal}</div>
            <p className="text-xs text-muted-foreground">Empresas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Com processos em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Processos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <p className="text-xs text-muted-foreground">Distribuídos entre clientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os seus clientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterType(v as any)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <TabsList>
                <TabsTrigger value="all">Todos ({stats.total})</TabsTrigger>
                <TabsTrigger value="individual">Pessoa Física ({stats.individual})</TabsTrigger>
                <TabsTrigger value="legal">Pessoa Jurídica ({stats.legal})</TabsTrigger>
              </TabsList>

              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou CPF/CNPJ..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={filterType} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>CPF/CNPJ</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Processos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={client.avatar || undefined} />
                                <AvatarFallback>
                                  {client.type === "legal" ? (
                                    <Building2 className="size-4" />
                                  ) : (
                                    getInitials(client.name)
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{client.name}</div>
                                <div className="text-sm text-muted-foreground">{client.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {client.type === "individual" ? "Pessoa Física" : "Pessoa Jurídica"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm">{client.cpfCnpj}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="size-3.5 text-muted-foreground" />
                                {client.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{client.responsible}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{client.cases} processo{client.cases !== 1 ? "s" : ""}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={client.status === "active" ? "default" : "secondary"}>
                              {client.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
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
                                  <Link href={`/dashboard/clients/${client.id}`}>
                                    <Eye className="mr-2 size-4" />
                                    Ver detalhes
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/clients/${client.id}/edit`}>
                                    <Edit className="mr-2 size-4" />
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 size-4" />
                                  Remover
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
