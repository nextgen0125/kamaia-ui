"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Package,
  Edit,
  Plus,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react"

const plans = [
  {
    id: "1",
    name: "Starter",
    description: "Ideal para escritórios pequenos começando a digitalizar",
    price: 199,
    billingPeriod: "monthly",
    active: true,
    features: [
      "Até 5 usuários",
      "10 GB de armazenamento",
      "Processos ilimitados",
      "Gestão básica de clientes",
      "Suporte por email",
    ],
    limits: {
      users: 5,
      storage: 10,
      processes: -1,
    },
    stats: {
      subscriptions: 12,
      revenue: 2388,
      churn: 5.2,
    },
  },
  {
    id: "2",
    name: "Professional",
    description: "Para escritórios em crescimento com múltiplos advogados",
    price: 499,
    billingPeriod: "monthly",
    active: true,
    popular: true,
    features: [
      "Até 15 usuários",
      "50 GB de armazenamento",
      "Processos ilimitados",
      "Gestão completa de clientes",
      "Templates personalizados",
      "Integrações avançadas",
      "Suporte prioritário",
    ],
    limits: {
      users: 15,
      storage: 50,
      processes: -1,
    },
    stats: {
      subscriptions: 28,
      revenue: 13972,
      churn: 2.8,
    },
  },
  {
    id: "3",
    name: "Enterprise",
    description: "Para grandes escritórios com necessidades avançadas",
    price: 1299,
    billingPeriod: "monthly",
    active: true,
    features: [
      "Usuários ilimitados",
      "500 GB de armazenamento",
      "Processos ilimitados",
      "Todos os recursos Professional",
      "API dedicada",
      "Servidor dedicado",
      "Suporte 24/7",
      "Treinamento personalizado",
    ],
    limits: {
      users: -1,
      storage: 500,
      processes: -1,
    },
    stats: {
      subscriptions: 5,
      revenue: 6495,
      churn: 0,
    },
  },
]

export default function PlansPage() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

  const totalSubscriptions = plans.reduce((sum, p) => sum + p.stats.subscriptions, 0)
  const totalRevenue = plans.reduce((sum, p) => sum + p.stats.revenue, 0)
  const avgChurn = plans.reduce((sum, p) => sum + p.stats.churn, 0) / plans.length

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Planos</h1>
          <p className="text-muted-foreground">Configure e gerencie os planos da plataforma</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Plano
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Assinaturas</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Assinaturas ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total (MRR)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Receita recorrente mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgChurn.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Taxa de cancelamento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium rounded-t-lg">
                Mais Popular
              </div>
            )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <Switch checked={plan.active} />
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Recursos:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-semibold text-sm">Estatísticas:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assinaturas:</span>
                    <span className="font-medium">{plan.stats.subscriptions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Receita (MRR):</span>
                    <span className="font-medium">{formatCurrency(plan.stats.revenue)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Churn:</span>
                    <span className="font-medium">{plan.stats.churn}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <h4 className="font-semibold text-sm">Limites:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuários:</span>
                    <span>{plan.limits.users === -1 ? "Ilimitado" : plan.limits.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span>{plan.limits.storage} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processos:</span>
                    <span>Ilimitado</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Editar Plano
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
