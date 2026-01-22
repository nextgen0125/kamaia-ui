"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone,
  Building2,
  Shield,
  Calendar,
  Activity,
  ArrowLeft,
  Ban,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function UserDetailsPage() {
  const userInfo = {
    id: "USR-2025-001",
    name: "João Silva",
    email: "joao@silvaadvogados.com",
    phone: "+244 987654321",
    role: "Admin",
    tenant: "Silva & Advogados",
    tenantId: "TNT-2025-001",
    status: "active",
    createdAt: "15/03/2024",
    lastLogin: "25/01/2025 14:30",
    twoFactorEnabled: true
  }

  const activity = [
    { action: "Login realizado", time: "Há 5 min", ip: "192.168.1.100" },
    { action: "Processo criado", time: "Há 1 hora", ip: "192.168.1.100" },
    { action: "Documento enviado", time: "Há 2 horas", ip: "192.168.1.100" },
    { action: "Cliente adicionado", time: "Há 3 horas", ip: "192.168.1.100" }
  ]

  const sessions = [
    { device: "Chrome - Windows", location: "São Paulo, Brasil", lastActive: "Ativo agora", ip: "192.168.1.100" },
    { device: "Safari - iPhone", location: "São Paulo, Brasil", lastActive: "Há 2 horas", ip: "192.168.1.101" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{userInfo.name}</h1>
          <p className="text-muted-foreground">{userInfo.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Resetar Senha</Button>
          <Button variant="destructive">
            <Ban className="size-4 mr-2" />
            Suspender
          </Button>
        </div>
      </div>

      {/* User Card */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="size-20 border-4 border-background shadow-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userInfo.name}`} />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                <Badge className={userInfo.status === "active" ? "bg-green-500/10 text-green-500" : ""}>
                  {userInfo.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
                {userInfo.twoFactorEnabled && (
                  <Badge variant="outline" className="gap-1">
                    <Shield className="size-3" />
                    2FA
                  </Badge>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  {userInfo.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  {userInfo.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-4" />
                  <Link href={`/admin/tenants/${userInfo.tenantId}`} className="hover:underline">
                    {userInfo.tenant}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  Função: {userInfo.role}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="sessions">Sessões</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Usuário</CardTitle>
              <CardDescription>Detalhes da conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Nome Completo</p>
                  <p className="text-sm text-muted-foreground">{userInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Telefone</p>
                  <p className="text-sm text-muted-foreground">{userInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Função</p>
                  <Badge>{userInfo.role}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Tenant</p>
                  <Link href={`/admin/tenants/${userInfo.tenantId}`}>
                    <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                      {userInfo.tenant}
                    </Badge>
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Status</p>
                  <Badge className="bg-green-500/10 text-green-500">Ativo</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Criado em</p>
                  <p className="text-sm text-muted-foreground">{userInfo.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Último Login</p>
                  <p className="text-sm text-muted-foreground">{userInfo.lastLogin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas ações do usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activity.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">IP: {item.ip}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
              <CardDescription>Dispositivos conectados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{session.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.location} • IP: {session.ip}
                      </p>
                      <p className="text-sm text-muted-foreground">{session.lastActive}</p>
                    </div>
                    <Button variant="outline" size="sm">Encerrar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>Status e configurações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Autenticação de Dois Fatores</p>
                  <p className="text-sm text-muted-foreground">
                    {userInfo.twoFactorEnabled ? "Ativado" : "Desativado"}
                  </p>
                </div>
                <Badge className={userInfo.twoFactorEnabled ? "bg-green-500/10 text-green-500" : ""}>
                  {userInfo.twoFactorEnabled ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Resetar Senha</Button>
                <Button variant="outline">Desativar 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
