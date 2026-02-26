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
import { AddLawyerDialog } from "@/components/lawyers/add-lawyer-dialog"
import { ProfileCard } from "@/components/ui/mobile-card-variants"
import { MobileCardList } from "@/components/ui/mobile-card-list"

// Mock data - substituir por dados reais da API
const lawyers = [
  {
    id: 1,
    name: "Dr. João Silva",
    oab: "SP 123456",
    email: "joao.silva@example.com",
    phone: "+244 945 965 459",
    specialties: ["Civil", "Trabalhista"],
    cases: 45,
    status: "active",
    avatar: null,
  },
  {
    id: 2,
    name: "Dra. Maria Santos",
    oab: "SP 789012",
    email: "maria.santos@example.com",
    phone: "+244 945 965 459",
    specialties: ["Penal", "Criminal"],
    cases: 32,
    status: "active",
    avatar: null,
  },
  {
    id: 3,
    name: "Dr. Pedro Costa",
    oab: "RJ 345678",
    email: "pedro.costa@example.com",
    phone: "(21) 99876-5432",
    specialties: ["Tributário", "Empresarial"],
    cases: 28,
    status: "inactive",
    avatar: null,
  },
]

export default function LawyersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.oab.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advogados</h1>
          <p className="text-muted-foreground">
            Gerencie os advogados do escritório
          </p>
        </div>
        <AddLawyerDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Advogados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lawyers.length}</div>
            <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advogados Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lawyers.filter((l) => l.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Atuando em casos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lawyers.reduce((acc, l) => acc + l.cases, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Distribuídos entre advogados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(lawyers.reduce((acc, l) => acc + l.cases, 0) / lawyers.length)}
            </div>
            <p className="text-xs text-muted-foreground">Por advogado</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Advogados</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os advogados do escritório
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, OAB ou email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advogado</TableHead>
                  <TableHead>OAB</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Casos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLawyers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      Nenhum advogado encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLawyers.map((lawyer) => (
                    <TableRow key={lawyer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={lawyer.avatar || undefined} />
                            <AvatarFallback>{getInitials(lawyer.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lawyer.name}</div>
                            <div className="text-sm text-muted-foreground">{lawyer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lawyer.oab}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="size-3.5 text-muted-foreground" />
                            {lawyer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="size-3.5 text-muted-foreground" />
                            {lawyer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {lawyer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lawyer.cases} casos</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={lawyer.status === "active" ? "default" : "secondary"}
                        >
                          {lawyer.status === "active" ? "Ativo" : "Inativo"}
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
                              <Link href={`/dashboard/lawyers/${lawyer.id}`}>
                                <Eye className="mr-2 size-4" />
                                Ver detalhes
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/lawyers/${lawyer.id}/edit`}>
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

          {/* Mobile View */}
          <MobileCardList>
            {filteredLawyers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum advogado encontrado</p>
              </div>
            ) : (
              filteredLawyers.map((lawyer) => (
                <ProfileCard
                  key={lawyer.id}
                  id={lawyer.id}
                  name={lawyer.name}
                  subtitle={lawyer.oab}
                  avatar={lawyer.avatar}
                  badges={[
                    ...lawyer.specialties.map((s) => ({ label: s, variant: "secondary" as const })),
                    { 
                      label: lawyer.status === "active" ? "Ativo" : "Inativo",
                      variant: lawyer.status === "active" ? "default" as const : "outline" as const
                    }
                  ]}
                  stats={[
                    { label: "Casos", value: lawyer.cases },
                    { label: "Email", value: "📧" },
                    { label: "Tel", value: "📞" }
                  ]}
                  actions={
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/lawyers/${lawyer.id}`}>
                            <Eye className="mr-2 size-4" />
                            Ver detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/lawyers/${lawyer.id}/edit`}>
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
                  }
                />
              ))
            )}
          </MobileCardList>
        </CardContent>
      </Card>
    </div>
  )
}
