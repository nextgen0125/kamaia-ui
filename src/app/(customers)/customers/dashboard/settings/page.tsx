"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Globe,
  Eye,
  Shield,
  Smartphone,
  Download
} from "lucide-react"

export default function CustomerSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">
            <User className="size-4 mr-2" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="size-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Eye className="size-4 mr-2" />
            Privacidade
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Atualize as informações básicas da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Carlos Mendes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="carlos@email.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" defaultValue="123.456.789-00" disabled />
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Idioma</p>
                  <p className="text-sm text-muted-foreground">Selecione seu idioma preferido</p>
                </div>
                <select className="w-40 h-10 px-3 rounded-md border bg-background">
                  <option>Português</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>
                Ações irreversíveis relacionadas à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Desativar Conta</p>
                  <p className="text-sm text-muted-foreground">
                    Temporariamente desabilitar sua conta
                  </p>
                </div>
                <Button variant="outline">Desativar</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Excluir Conta</p>
                  <p className="text-sm text-muted-foreground">
                    Permanentemente excluir sua conta e todos os dados
                  </p>
                </div>
                <Button variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Senha</CardTitle>
              <CardDescription>
                Altere sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Atualizar Senha</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Smartphone className="size-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium">Autenticação via SMS</p>
                    <p className="text-sm text-muted-foreground">
                      Receba códigos via SMS
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Shield className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">App Autenticador</p>
                    <p className="text-sm text-muted-foreground">
                      Use Google Authenticator ou similar
                    </p>
                  </div>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessões Ativas</CardTitle>
              <CardDescription>
                Gerencie dispositivos conectados à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Chrome - Windows</p>
                  <p className="text-sm text-muted-foreground">
                    São Paulo, Brasil • Ativo agora
                  </p>
                </div>
                <Button variant="outline" size="sm">Encerrar</Button>
              </div>
              <Button variant="outline" className="w-full">
                Encerrar Todas as Outras Sessões
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Email</CardTitle>
              <CardDescription>
                Configure quais emails você deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-updates" className="cursor-pointer">
                  Atualizações de processos
                </Label>
                <Switch id="email-updates" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="email-messages" className="cursor-pointer">
                  Novas mensagens
                </Label>
                <Switch id="email-messages" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="email-documents" className="cursor-pointer">
                  Novos documentos
                </Label>
                <Switch id="email-documents" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="email-payments" className="cursor-pointer">
                  Lembretes de pagamento
                </Label>
                <Switch id="email-payments" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="email-marketing" className="cursor-pointer">
                  Novidades e promoções
                </Label>
                <Switch id="email-marketing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações Push</CardTitle>
              <CardDescription>
                Receba notificações no navegador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-enabled" className="cursor-pointer">
                  Ativar notificações push
                </Label>
                <Switch id="push-enabled" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacidade e Dados</CardTitle>
              <CardDescription>
                Controle como seus dados são usados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Perfil Público</p>
                  <p className="text-sm text-muted-foreground">
                    Tornar perfil visível para outros usuários
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Análise de Uso</p>
                  <p className="text-sm text-muted-foreground">
                    Ajude a melhorar a plataforma compartilhando dados de uso
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seus Dados</CardTitle>
              <CardDescription>
                Baixe ou exclua seus dados pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Exportar Dados</p>
                  <p className="text-sm text-muted-foreground">
                    Baixe uma cópia de todos os seus dados
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="size-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
