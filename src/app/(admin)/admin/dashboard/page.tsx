"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Server,
  Database,
  Zap,
  Globe,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const stats = {
    tenants: {
      total: 45,
      active: 42,
      trial: 8,
      growth: 15.3,
    },
    users: {
      total: 234,
      active: 189,
      growth: 12.5,
    },
    revenue: {
      mrr: 45230,
      growth: 18.7,
      churn: 2.3,
    },
    system: {
      uptime: 99.98,
      requests: 1250000,
      avgResponse: 145,
    },
  }

  const recentTenants = [
    {
      id: 1,
      name: "Silva & Associados",
      plan: "Professional",
      users: 12,
      status: "active",
      mrr: 1990,
      createdAt: "2024-03-18",
    },
    {
      id: 2,
      name: "Advocacia Costa",
      plan: "Starter",
      users: 5,
      status: "trial",
      mrr: 0,
      createdAt: "2024-03-17",
    },
    {
      id: 3,
      name: "Escritório Mendes",
      plan: "Enterprise",
      users: 25,
      status: "active",
      mrr: 4990,
      createdAt: "2024-03-15",
    },
  ]

  const systemHealth = [
    { service: "API Gateway", status: "operational", uptime: 99.99 },
    { service: "Database", status: "operational", uptime: 99.98 },
    { service: "Storage", status: "operational", uptime: 99.95 },
    { service: "Email Service", status: "degraded", uptime: 98.50 },
  ]

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "AOA" }).format(value)

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: "Ativo", variant: "default" as const },
      trial: { label: "Trial", variant: "secondary" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const },
      operational: { label: "Operacional", variant: "default" as const },
      degraded: { label: "Degradado", variant: "destructive" as const },
    }
    return config[status as keyof typeof config] || config.active
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SuperAdmin Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da plataforma Kamaia</p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants Ativos</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tenants.active}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{stats.tenants.trial} em trial</Badge>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.tenants.growth}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.tenants.total} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{stats.users.active} ativos</Badge>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.users.growth}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {((stats.users.active / stats.users.total) * 100).toFixed(1)}% taxa de ativação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue.mrr)}</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{stats.revenue.growth}%
              </div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                {stats.revenue.churn}% churn
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Receita recorrente mensal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.system.uptime}%</div>
            <div className="mt-2">
              <Badge variant="default" className="gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Operacional
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.system.avgResponse}ms tempo médio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Tenants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tenants Recentes</CardTitle>
                <CardDescription>Últimas organizações cadastradas</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/tenants">
                  Ver Todos
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{tenant.plan}</span>
                        <span>•</span>
                        <span>{tenant.users} usuários</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusBadge(tenant.status).variant}>
                      {getStatusBadge(tenant.status).label}
                    </Badge>
                    {tenant.mrr > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCurrency(tenant.mrr)}/mês
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
            <CardDescription>Saúde dos serviços principais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service) => (
                <div key={service.service} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{service.service}</span>
                      <Badge variant={getStatusBadge(service.status).variant}>
                        {getStatusBadge(service.status).label}
                      </Badge>
                    </div>
                    <span className="text-sm font-bold">{service.uptime}%</span>
                  </div>
                  <Progress value={service.uptime} />
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Server className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Servidores</p>
                    <p className="text-sm font-bold">12</p>
                  </div>
                  <div>
                    <Database className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Databases</p>
                    <p className="text-sm font-bold">4</p>
                  </div>
                  <div>
                    <Globe className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Regiões</p>
                    <p className="text-sm font-bold">3</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requisições/dia</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.system.requests / 1000).toFixed(0)}k
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              75% da capacidade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.system.avgResponse}ms</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Excelente performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Erro</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.02%</div>
            <Progress value={2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Muito baixa
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
