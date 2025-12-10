"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Ban,
  Mail,
  Shield,
  Activity,
  Clock,
  Download,
  Filter,
} from "lucide-react"

const mockUsers = [
  {
    id: "1",
    name: "Dr. João Silva",
    email: "joao.silva@silvaassociados.com",
    tenant: "Silva & Associados",
    role: "admin",
    status: "active",
    lastLogin: "2024-03-20T14:30:00",
    createdAt: "2024-01-15",
    plan: "Professional",
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    email: "maria@silvaassociados.com",
    tenant: "Silva & Associados",
    role: "lawyer",
    status: "active",
    lastLogin: "2024-03-20T10:15:00",
    createdAt: "2024-01-20",
    plan: "Professional",
  },
  {
    id: "3",
    name: "Dr. Pedro Costa",
    email: "pedro@advocaciacosta.com",
    tenant: "Advocacia Costa",
    role: "admin",
    status: "active",
    lastLogin: "2024-03-19T16:45:00",
    createdAt: "2024-03-17",
    plan: "Starter",
  },
  {
    id: "4",
    name: "Ana Carolina",
    email: "ana@silvaassociados.com",
    tenant: "Silva & Associados",
    role: "assistant",
    status: "inactive",
    lastLogin: "2024-03-10T09:20:00",
    createdAt: "2024-02-01",
    plan: "Professional",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tenant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

  const formatLastLogin = (date: string) => {
    const now = new Date()
    const loginDate = new Date(date)
    const diffHours = Math.floor((now.getTime() - loginDate.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return "Agora mesmo"
    if (diffHours < 24) return `${diffHours}h atrás`
    return formatDate(date)
  }

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { label: "Admin", variant: "default" as const },
      lawyer: { label: "Advogado", variant: "secondary" as const },
      assistant: { label: "Assistente", variant: "outline" as const },
    }
    return config[role as keyof typeof config] || config.lawyer
  }

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Ativo", variant: "default" as const },
      inactive: { label: "Inativo", variant: "secondary" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const },
    }
    return config[status as keyof typeof config] || config.active
  }

  const totalActive = users.filter((u) => u.status === "active").length
  const totalInactive = users.filter((u) => u.status === "inactive").length

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h1>
          <p className="text-muted-foreground">Gerencie todos os usuários da plataforma</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Todos os usuários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActive}</div>
            <p className="text-xs text-muted-foreground">
              {((totalActive / users.length) * 100).toFixed(0)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inativos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInactive}</div>
            <p className="text-xs text-muted-foreground">Sem login recente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground">Administradores</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos os Usuários</CardTitle>
              <CardDescription>{filteredUsers.length} usuários encontrados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou tenant..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="suspended">Suspensos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as funções</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="lawyer">Advogados</SelectItem>
                <SelectItem value="assistant">Assistentes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role)
                  const statusBadge = getStatusBadge(user.status)
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{user.tenant}</span>
                          <Badge variant="outline" className="w-fit text-xs mt-1">
                            {user.plan}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={roleBadge.variant}>{roleBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatLastLogin(user.lastLogin)}</span>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Enviar Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspender
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
