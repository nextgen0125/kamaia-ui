"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Users, 
  CreditCard, 
  Activity,
  Settings,
  ArrowLeft,
  Ban,
  CheckCircle2,
  Calendar,
  Mail,
  Phone
} from "lucide-react"
import Link from "next/link"

export default function TenantDetailsPage() {
  const tenantInfo = {
    id: "TNT-2025-001",
    name: "Silva & Advogados",
    email: "contato@silvaadvogados.com",
    phone: "(11) 98765-4321",
    plan: "Professional",
    status: "active",
    createdAt: "01/01/2024",
    users: 12,
    cases: 145,
    documents: 1234,
    storage: "45.2 GB"
  }

  const users = [
    { name: "João Silva", email: "joao@silvaadvogados.com", role: "Admin", status: "active", lastLogin: "Há 5 min" },
    { name: "Maria Costa", email: "maria@silvaadvogados.com", role: "Advogado", status: "active", lastLogin: "Há 1 hora" },
    { name: "Pedro Santos", email: "pedro@silvaadvogados.com", role: "Advogado", status: "active", lastLogin: "Ontem" }
  ]

  const billing = [
    { date: "01/01/2025", amount: "R$ 199,00", status: "paid", invoice: "INV-2025-001" },
    { date: "01/12/2024", amount: "R$ 199,00", status: "paid", invoice: "INV-2024-012" },
    { date: "01/11/2024", amount: "R$ 199,00", status: "paid", invoice: "INV-2024-011" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/tenants">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{tenantInfo.name}</h1>
          <p className="text-muted-foreground">{tenantInfo.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="size-4 mr-2" />
            Configurar
          </Button>
          <Button variant="destructive">
            <Ban className="size-4 mr-2" />
            Suspender
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantInfo.users}</div>
            <p className="text-xs text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processos</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantInfo.cases}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <Building2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantInfo.documents}</div>
            <p className="text-xs text-muted-foreground">{tenantInfo.storage} usados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 199</div>
            <p className="text-xs text-muted-foreground">Mensal</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="billing">Faturamento</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Tenant</CardTitle>
              <CardDescription>Detalhes e configurações</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Nome:</span>
                  <span className="text-sm">{tenantInfo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{tenantInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Telefone:</span>
                  <span className="text-sm">{tenantInfo.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Plano:</span>
                  <Badge>{tenantInfo.plan}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Status:</span>
                  <Badge className="bg-green-500/10 text-green-500">Ativo</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Criado em:</span>
                  <span className="text-sm">{tenantInfo.createdAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Tenant</CardTitle>
              <CardDescription>{tenantInfo.users} usuários cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{user.role}</Badge>
                      <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Faturamento</CardTitle>
              <CardDescription>Últimas faturas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billing.map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{bill.invoice}</p>
                      <p className="text-sm text-muted-foreground">{bill.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{bill.amount}</span>
                      <Badge className="bg-green-500/10 text-green-500">Pago</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas ações do tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Novo usuário adicionado", time: "Há 1 hora", user: "João Silva" },
                  { action: "Processo criado", time: "Há 2 horas", user: "Maria Costa" },
                  { action: "Documento enviado", time: "Há 3 horas", user: "Pedro Santos" }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">Por {activity.user}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
