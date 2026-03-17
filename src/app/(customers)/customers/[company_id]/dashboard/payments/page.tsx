"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Receipt,
  FileText
} from "lucide-react"

export default function CustomerPaymentsPage() {
  const invoices = [
    {
      id: "INV-2025-001",
      date: "15 Jan 2025",
      amount: "450.000 AOA",
      status: "paid",
      description: "Honorários Advocatícios - Caso Civil",
      method: "Cartão de Crédito"
    },
    {
      id: "INV-2024-012",
      date: "20 Dez 2024",
      amount: "350.000 AOA",
      status: "paid",
      description: "Consulta Jurídica",
      method: "PIX"
    },
    {
      id: "INV-2024-011",
      date: "10 Dez 2024",
      amount: "500.000 AOA",
      status: "pending",
      description: "Honorários Advocatícios - Caso Trabalhista",
      method: "Boleto"
    },
    {
      id: "INV-2024-010",
      date: "25 Nov 2024",
      amount: "400.000 AOA",
      status: "paid",
      description: "Análise de Contrato",
      method: "Transferência"
    }
  ]

  const paymentMethods = [
    {
      type: "Cartão de Crédito",
      number: "**** **** **** 4532",
      expiry: "12/2026",
      default: true
    }
  ]

  const upcomingPayments = [
    {
      description: "Honorários Mensais",
      amount: "450.000 AOA",
      dueDate: "20 Fev 2025"
    }
  ]

  const statusConfig = {
    paid: { label: "Pago", color: "bg-green-500/10 text-green-500 border-green-500/20" },
    pending: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    overdue: { label: "Vencido", color: "bg-red-500/10 text-red-500 border-red-500/20" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Pagamentos</h1>
        <p className="text-muted-foreground">
          Gerencie suas faturas e métodos de pagamento
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
            <CheckCircle2 className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.700.000 AOA</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 12 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <Clock className="size-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500.000 AOA</div>
            <p className="text-xs text-muted-foreground mt-1">
              1 fatura aguardando pagamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
            <Calendar className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 Fev</div>
            <p className="text-xs text-muted-foreground mt-1">
              450.000 AOA
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">
            <Receipt className="size-4 mr-2" />
            Faturas
          </TabsTrigger>
          <TabsTrigger value="methods">
            <CreditCard className="size-4 mr-2" />
            Métodos de Pagamento
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <Calendar className="size-4 mr-2" />
            Próximos Pagamentos
          </TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Faturas</CardTitle>
              <CardDescription>
                Visualize e baixe suas faturas anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                        <FileText className="size-5 text-violet-600" />
                      </div>
                      <div>
                        <div className="font-medium">{invoice.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.id} • {invoice.date} • {invoice.method}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">{invoice.amount}</div>
                        <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                          {statusConfig[invoice.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <Button variant="outline" size="icon">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Gerencie seus cartões e formas de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                      <CreditCard className="size-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{method.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {method.number} • Validade: {method.expiry}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.default && (
                      <Badge variant="secondary">Padrão</Badge>
                    )}
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <CreditCard className="size-4 mr-2" />
                Adicionar Método de Pagamento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Payments Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Pagamentos</CardTitle>
              <CardDescription>
                Pagamentos programados e vencimentos futuros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{payment.description}</div>
                        <div className="text-sm text-muted-foreground">
                          Vencimento: {payment.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">{payment.amount}</div>
                      </div>
                      <Button>Pagar Agora</Button>
                    </div>
                  </div>
                ))}

                {upcomingPayments.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhum pagamento programado
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
