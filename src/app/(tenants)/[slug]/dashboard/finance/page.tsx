"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { AddTransactionDialog } from "@/components/finance/add-transaction-dialog"
import { Progress } from "@/components/ui/progress"
import { FinancialCard, StatCard } from "@/components/ui/mobile-card-extended"
import { MobileCardList } from "@/components/ui/mobile-card-list"

// Mock data
const transactions = [
  {
    id: 1,
    type: "income",
    category: "Honorários",
    description: "Processo Trabalhista - Carlos Mendes",
    amount: 5000,
    date: "2024-03-15",
    status: "completed",
    client: "Carlos Mendes",
    case: "0001234-56.2024.8.26.0100",
  },
  {
    id: 2,
    type: "expense",
    category: "Custas Processuais",
    description: "Taxas judiciais - Divórcio",
    amount: 350,
    date: "2024-03-14",
    status: "completed",
    client: "Ana Paula Oliveira",
    case: "0002345-67.2024.8.26.0000",
  },
  {
    id: 3,
    type: "income",
    category: "Consultoria",
    description: "Consultoria jurídica empresarial",
    amount: 3000,
    date: "2024-03-13",
    status: "pending",
    client: "Tech Solutions S/A",
    case: null,
  },
  {
    id: 4,
    type: "expense",
    category: "Infraestrutura",
    description: "Aluguel do escritório",
    amount: 4500,
    date: "2024-03-10",
    status: "completed",
    client: null,
    case: null,
  },
  {
    id: 5,
    type: "income",
    category: "Honorários",
    description: "Ação de Indenização",
    amount: 8000,
    date: "2024-03-08",
    status: "completed",
    client: "Empresa ABC Ltda",
    case: "0003456-78.2024.8.26.0100",
  },
]

const invoices = [
  {
    id: 1,
    number: "FAT-2024-001",
    client: "Carlos Mendes",
    amount: 5000,
    dueDate: "2024-03-20",
    status: "pending",
    issueDate: "2024-03-15",
  },
  {
    id: 2,
    number: "FAT-2024-002",
    client: "Tech Solutions S/A",
    amount: 3000,
    dueDate: "2024-03-25",
    status: "sent",
    issueDate: "2024-03-13",
  },
  {
    id: 3,
    number: "FAT-2024-003",
    client: "Empresa ABC Ltda",
    amount: 8000,
    dueDate: "2024-03-18",
    status: "paid",
    issueDate: "2024-03-08",
  },
]

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = filterType === "all" || transaction.type === filterType

    return matchesSearch && matchesType
  })

  const stats = {
    totalIncome: transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0),
    totalExpense: transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0),
    balance: 0,
    pendingInvoices: invoices.filter(i => i.status !== "paid").reduce((acc, i) => acc + i.amount, 0),
  }
  stats.balance = stats.totalIncome - stats.totalExpense

  const expensesByCategory = [
    { category: "Infraestrutura", amount: 4500, percentage: 70 },
    { category: "Custas Processuais", amount: 350, percentage: 5 },
    { category: "Pessoal", amount: 1000, percentage: 16 },
    { category: "Marketing", amount: 600, percentage: 9 },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "default"
      case "pending":
        return "secondary"
      case "sent":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "pending":
        return "Pendente"
      case "paid":
        return "Pago"
      case "sent":
        return "Enviado"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Gerencie receitas, despesas e faturas
          </p>
        </div>
        <AddTransactionDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <ArrowUpRight className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalIncome)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <ArrowDownRight className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalExpense)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(stats.balance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Receitas - Despesas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.pendingInvoices)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Faturas pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Lançamentos</CardTitle>
            <CardDescription>
              Histórico de receitas e despesas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterType(v as any)}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="income">Receitas</TabsTrigger>
                  <TabsTrigger value="expense">Despesas</TabsTrigger>
                </TabsList>

                <div className="relative flex-1 md:max-w-sm">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar lançamentos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value={filterType} className="space-y-4">
                {/* Desktop Table */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-muted-foreground">
                            Nenhum lançamento encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="text-sm">
                              {formatDate(transaction.date)}
                            </TableCell>
                            <TableCell>
                              {transaction.type === "income" ? (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                                  <ArrowUpRight className="mr-1 size-3" />
                                  Receita
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">
                                  <ArrowDownRight className="mr-1 size-3" />
                                  Despesa
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{transaction.category}</Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              <p className="text-sm truncate">{transaction.description}</p>
                            </TableCell>
                            <TableCell className="text-sm">
                              {transaction.client || "-"}
                            </TableCell>
                            <TableCell className="font-medium">
                              <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                                {formatCurrency(transaction.amount)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(transaction.status)}>
                                {getStatusLabel(transaction.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="size-4" />
                                    <span className="sr-only">Abrir menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 size-4" />
                                    Ver detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 size-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 size-4" />
                                    Remover
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile View */}
                <MobileCardList>
                  {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12">
                      <DollarSign className="size-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum lançamento encontrado</p>
                    </div>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <FinancialCard
                        key={transaction.id}
                        id={transaction.id}
                        type={transaction.type as "income" | "expense"}
                        category={transaction.category}
                        description={transaction.description}
                        amount={transaction.amount}
                        date={formatDate(transaction.date)}
                        status={transaction.status as "completed" | "pending"}
                        client={transaction.client || undefined}
                        actions={
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 size-4" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 size-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 size-4" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        }
                      />
                    ))
                  )}
                </MobileCardList>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Expenses by Category */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
            <CardDescription>Este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expensesByCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{formatCurrency(item.amount)}</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Faturas</CardTitle>
              <CardDescription>Gerencie suas faturas e cobranças</CardDescription>
            </div>
            <Button variant="outline">
              <Plus className="mr-2 size-4" />
              Nova Fatura
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">
                      {invoice.number}
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell className="text-sm">
                      {formatDate(invoice.issueDate)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(invoice.dueDate)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {getStatusLabel(invoice.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="size-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 size-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 size-4" />
                            Baixar PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 size-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <MobileCardList>
            {invoices.map((invoice) => (
              <FinancialCard
                key={invoice.id}
                id={invoice.id}
                type="income"
                category={invoice.number}
                description={`Fatura para ${invoice.client}`}
                amount={invoice.amount}
                date={formatDate(invoice.dueDate)}
                status={invoice.status === "paid" ? "completed" : "pending"}
                client={invoice.client}
                actions={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 size-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 size-4" />
                        Baixar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 size-4" />
                        Cancelar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            ))}
          </MobileCardList>
        </CardContent>
      </Card>
    </div>
  )
}
