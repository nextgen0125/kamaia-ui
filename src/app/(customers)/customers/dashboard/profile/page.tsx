"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Camera,
  FileText,
  Scale,
  CreditCard,
  Shield,
  CheckCircle2
} from "lucide-react"

export default function CustomerProfilePage() {
  const profileStats = [
    { label: "Processos Ativos", value: "3", icon: Scale },
    { label: "Documentos", value: "24", icon: FileText },
    { label: "Mensagens", value: "15", icon: Mail },
    { label: "Pagamentos", value: "8", icon: CreditCard }
  ]

  const recentActivity = [
    {
      type: "document",
      title: "Documento enviado",
      description: "Contrato de Prestação de Serviços.pdf",
      date: "Há 2 horas"
    },
    {
      type: "message",
      title: "Mensagem enviada",
      description: "Para Dr. João Silva",
      date: "Ontem"
    },
    {
      type: "payment",
      title: "Pagamento realizado",
      description: "Fatura INV-2025-001 - 450.000 AOA",
      date: "2 dias atrás"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e visualize sua atividade
        </p>
      </div>

      {/* Profile Header Card */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="size-32 border-4 border-background shadow-xl">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Carlos Mendes" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full size-10 shadow-lg"
              >
                <Camera className="size-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Carlos Mendes</h2>
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="size-3" />
                  Verificado
                </Badge>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="size-4" />
                  <span>carlos.mendes@email.com</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="size-4" />
                  <span>(11) 98765-4321</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="size-4" />
                  <span>Cliente desde Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button>
                <Edit className="size-4 mr-2" />
                Editar Perfil
              </Button>
              <Button variant="outline">
                <Shield className="size-4 mr-2" />
                Segurança
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {profileStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="size-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-3">
                    <Icon className="size-6 text-violet-600" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">
            <User className="size-4 mr-2" />
            Informações
          </TabsTrigger>
          <TabsTrigger value="activity">
            <FileText className="size-4 mr-2" />
            Atividade Recente
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Suas informações básicas de cadastro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" defaultValue="Carlos Mendes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="carlos.mendes@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" defaultValue="1985-05-15" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" defaultValue="123.456.789-00" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rg">RG</Label>
                  <Input id="rg" defaultValue="12.345.678-9" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Informações de endereço residencial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" defaultValue="Rua das Flores" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" defaultValue="123" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" defaultValue="Apto 45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" defaultValue="Centro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input id="zipcode" defaultValue="01234-567" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" defaultValue="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <select id="state" className="w-full h-10 px-3 rounded-md border bg-background">
                    <option>São Paulo</option>
                    <option>Rio de Janeiro</option>
                    <option>Minas Gerais</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>
                Outras informações relevantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">Profissão</Label>
                <Input id="occupation" defaultValue="Empresário" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  rows={4}
                  placeholder="Informações adicionais que possam ser relevantes..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </div>
        </TabsContent>

        {/* Recent Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Histórico das suas ações na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="size-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                      {activity.type === "document" && <FileText className="size-5 text-violet-600" />}
                      {activity.type === "message" && <Mail className="size-5 text-blue-600" />}
                      {activity.type === "payment" && <CreditCard className="size-5 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                Ver Histórico Completo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
