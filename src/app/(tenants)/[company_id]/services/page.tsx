"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, DollarSign, Briefcase, TrendingUp, Package } from "lucide-react"
import { AddServiceDialog } from "@/components/services/add-service-dialog"

// Mock data
const services = [
  {
    id: 1,
    name: "Consultoria Jurídica Empresarial",
    category: "Consultoria",
    description: "Assessoria jurídica completa para empresas",
    price: 500,
    billingType: "hourly",
    active: true,
    timesUsed: 45,
  },
  {
    id: 2,
    name: "Elaboração de Contratos",
    category: "Contratos",
    description: "Redação e revisão de contratos diversos",
    price: 800,
    billingType: "fixed",
    active: true,
    timesUsed: 32,
  },
  {
    id: 3,
    name: "Defesa Trabalhista",
    category: "Trabalhista",
    description: "Acompanhamento completo de processos trabalhistas",
    price: 3000,
    billingType: "fixed",
    active: true,
    timesUsed: 28,
  },
  {
    id: 4,
    name: "Consultoria Tributária",
    category: "Tributário",
    description: "Planejamento e consultoria em questões tributárias",
    price: 600,
    billingType: "hourly",
    active: true,
    timesUsed: 18,
  },
  {
    id: 5,
    name: "Assessoria em Divórcios",
    category: "Família",
    description: "Acompanhamento completo em processos de divórcio",
    price: 2500,
    billingType: "fixed",
    active: false,
    timesUsed: 12,
  },
]

export default function ServicePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: services.length,
    active: services.filter(s => s.active).length,
    totalRevenue: services.reduce((acc, s) => acc + (s.price * s.timesUsed), 0),
    mostUsed: services.sort((a, b) => b.timesUsed - a.timesUsed)[0],
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
    }).format(value)
  }

  const servicesByCategory = services.reduce((acc, service) => {
    acc[service.category] = (acc[service.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie o catálogo de serviços do escritório
          </p>
        </div>
        <AddServiceDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
            <Package className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{stats.active} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Utilizado</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold truncate">{stats.mostUsed?.name}</div>
            <p className="text-xs text-muted-foreground">{stats.mostUsed?.timesUsed} vezes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(servicesByCategory).length}</div>
            <p className="text-xs text-muted-foreground">Diferentes áreas</p>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Catálogo de Serviços</CardTitle>
              <CardDescription>
                Lista completa de serviços oferecidos
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar serviços..."
                className="pl-10 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Package className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum serviço encontrado</p>
              </div>
            ) : (
              filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          {service.active ? (
                            <Badge variant="default" className="text-xs">Ativo</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Inativo</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="mb-2">
                          {service.category}
                        </Badge>
                        <CardDescription className="text-sm">
                          {service.description}
                        </CardDescription>
                      </div>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 size-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Remover
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{formatCurrency(service.price)}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.billingType === "hourly" ? "Por hora" : "Valor fixo"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{service.timesUsed}</p>
                        <p className="text-xs text-muted-foreground">Utilizações</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Serviços por Categoria</CardTitle>
          <CardDescription>Distribuição dos serviços</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(servicesByCategory).map(([category, count]) => (
              <Card key={category}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{category}</CardTitle>
                  <Briefcase className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <p className="text-xs text-muted-foreground">
                    {count === 1 ? "serviço" : "serviços"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
