"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Settings, Globe, Mail, Shield, Zap } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
        <p className="text-muted-foreground">Configure as preferências globais da plataforma</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="size-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="size-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="size-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Zap className="size-4 mr-2" />
            Integrações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Plataforma</CardTitle>
              <CardDescription>Configurações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Plataforma</Label>
                <Input defaultValue="Kamaia SaaS" />
              </div>
              <div className="space-y-2">
                <Label>URL Principal</Label>
                <Input defaultValue="https://kamaia.com" />
              </div>
              <div className="space-y-2">
                <Label>Email de Suporte</Label>
                <Input defaultValue="suporte@kamaia.com" type="email" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Manutenção Programada</p>
                  <p className="text-sm text-muted-foreground">Ativar modo de manutenção</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos Cadastros</p>
                  <p className="text-sm text-muted-foreground">Permitir novos registros</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure o serviço SMTP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input defaultValue="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label>Porta</Label>
                  <Input defaultValue="587" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Remetente</Label>
                <Input defaultValue="noreply@kamaia.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Nome Remetente</Label>
                <Input defaultValue="Kamaia Platform" />
              </div>
              <Separator />
              <Button>Testar Configuração</Button>
              <Button variant="outline" className="ml-2">Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Plataforma</CardTitle>
              <CardDescription>Configure políticas de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação de Dois Fatores Obrigatória</p>
                  <p className="text-sm text-muted-foreground">Forçar 2FA para todos os usuários</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Tempo Máximo de Sessão (minutos)</Label>
                <Input defaultValue="120" type="number" />
              </div>
              <div className="space-y-2">
                <Label>Tentativas de Login Permitidas</Label>
                <Input defaultValue="5" type="number" />
              </div>
              <Separator />
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>Gerencie as chaves de API de integrações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Stripe Secret Key</Label>
                <Input type="password" defaultValue="sk_test_••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>SendGrid API Key</Label>
                <Input type="password" defaultValue="SG.••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>AWS Access Key</Label>
                <Input type="password" defaultValue="AKIA••••••••••••••••" />
              </div>
              <Separator />
              <Button>Salvar Chaves</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
