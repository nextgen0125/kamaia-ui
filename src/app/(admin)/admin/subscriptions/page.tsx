"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Download
} from "lucide-react"

export default function SubscriptionsPage() {
  const stats = [
    { label: "Receita Mensal Recorrente", value: "R$ 89.450", change: "+12.5%", trend: "up" },
    { label: "Assinaturas Ativas", value: "487", change: "+23", trend: "up" },
    { label: "Taxa de Cancelamento", value: "2.3%", change: "-0.5%", trend: "down" },
    { label: "Ticket Médio", value: "R$ 183", change: "+5.2%", trend: "up" }
  ]

  const subscriptions = [
    {
      id: "SUB-2025-001",
      tenant: "Silva & Advogados",
      plan: "Professional",
      status: "active",
      mrr: "R$ 199,00",
      startDate: "01/01/2025",
      nextBilling: "01/02/2025",
      users: 12
    },
    {
      id: "SUB-2025-002",
      tenant: "Costa Lima Advogados",
      plan: "Enterprise",
      status: "active",
      mrr: "R$ 399,00",
      startDate: "15/12/2024",
      nextBilling: "15/02/2025",
      users: 25
    },
    {
      id: "SUB-2024-789",
      tenant: "Ferreira Jurídico",
      plan: "Starter",
      status: "trial",
      mrr: "R$ 0,00",
      startDate: "20/01/2025",
      nextBilling: "03/02/2025",
      users: 3
    },
    {
      id: "SUB-2024-456",
      tenant: "Mendes Associados",
      plan: "Professional",
      status: "past_due",
      mrr: "R$ 199,00",
      startDate: "10/11/2024",
      nextBilling: "Vencido",
      users: 8
    }
  ]

  const statusConfig = {
    active: { label: "Ativa", color: "bg-green-500/10 text-green-500 border-green-500/20" },
    trial: { label: "Trial", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    past_due: { label: "Vencida", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    canceled: { label: "Cancelada", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assinaturas</h1>
          <p className="text-muted-foreground">Gerencie todas as assinaturas da plataforma</p>
        </div>
        <Button>
          <Download className="size-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <DollarSign className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 mt-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change} vs mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Buscar assinatura..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Assinaturas</CardTitle>
          <CardDescription>Todas as assinaturas da plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col">
                    <span className="font-semibold">{sub.tenant}</span>
                    <span className="text-sm text-muted-foreground">{sub.id}</span>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Plano</p>
                    <p className="font-medium">{sub.plan}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">MRR</p>
                    <p className="font-medium">{sub.mrr}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Usuários</p>
                    <p className="font-medium">{sub.users}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Próx. Cobrança</p>
                    <p className="font-medium">{sub.nextBilling}</p>
                  </div>
                  
                  <Badge className={statusConfig[sub.status as keyof typeof statusConfig].color}>
                    {statusConfig[sub.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                
                <Button variant="outline" size="sm" className="ml-4">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
