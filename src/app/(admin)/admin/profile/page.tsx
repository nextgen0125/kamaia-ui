"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Lock, Activity, Camera } from "lucide-react"

export default function AdminProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações de Super Admin</p>
      </div>

      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="size-24 border-4 border-background shadow-xl">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  SA
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full size-8 shadow-lg"
              >
                <Camera className="size-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">Super Admin</h2>
                <Badge className="gap-1">
                  <Shield className="size-3" />
                  Admin Total
                </Badge>
              </div>
              <p className="text-muted-foreground">admin@kamaia.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">
            <User className="size-4 mr-2" />
            Informações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="size-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="size-4 mr-2" />
            Atividade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Suas informações de administrador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input defaultValue="Super Admin" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@kamaia.com" type="email" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="+55 (11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label>Função</Label>
                  <Input defaultValue="Super Administrator" disabled />
                </div>
              </div>
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>Mantenha sua conta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Senha Atual</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Nova Senha</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Nova Senha</Label>
                <Input type="password" />
              </div>
              <Button>Atualizar Senha</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>Status: Ativa</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-500/10 text-green-500">2FA Ativado</Badge>
              <Button variant="outline" className="mt-4">Reconfigurar 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Suas últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Login realizado", time: "Há 5 min", ip: "192.168.1.1" },
                  { action: "Tenant criado", time: "Há 1 hora", ip: "192.168.1.1" },
                  { action: "Configuração alterada", time: "Há 2 horas", ip: "192.168.1.1" },
                  { action: "Backup executado", time: "Há 3 horas", ip: "192.168.1.1" }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">IP: {activity.ip}</p>
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
