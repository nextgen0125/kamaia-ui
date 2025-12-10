"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Edit, Trash2, CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react"
import { AddTaskDialog } from "@/components/tasks/add-task-dialog"
import { Progress } from "@/components/ui/progress"

// Mock data
const tasks = [
  {
    id: 1,
    title: "Redigir petição inicial",
    description: "Ação trabalhista sobre horas extras",
    priority: "high",
    status: "todo",
    dueDate: "2024-03-18",
    assignee: "Dr. João Silva",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024.8.26.0100",
    completed: false,
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Revisar contrato social",
    description: "Análise jurídica do contrato da Tech Solutions",
    priority: "medium",
    status: "in-progress",
    dueDate: "2024-03-20",
    assignee: "Dra. Maria Santos",
    case: null,
    caseNumber: null,
    completed: false,
    createdAt: "2024-03-14",
  },
  {
    id: 3,
    title: "Agendar audiência",
    description: "Contatar fórum para agendar audiência de conciliação",
    priority: "high",
    status: "todo",
    dueDate: "2024-03-17",
    assignee: "Dr. Pedro Costa",
    case: "Divórcio Consensual",
    caseNumber: "0002345-67.2024.8.26.0000",
    completed: false,
    createdAt: "2024-03-13",
  },
  {
    id: 4,
    title: "Preparar documentação",
    description: "Reunir todos os documentos necessários para o processo",
    priority: "medium",
    status: "done",
    dueDate: "2024-03-15",
    assignee: "Dr. João Silva",
    case: "Cobrança - Inadimplência",
    caseNumber: "0003456-78.2024.8.26.0100",
    completed: true,
    createdAt: "2024-03-10",
  },
]

export default function TaskPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "todo" | "in-progress" | "done">("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || task.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    done: tasks.filter(t => t.status === "done").length,
    overdue: tasks.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length,
  }

  const completionRate = (stats.done / stats.total) * 100

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "default"
      case "in-progress":
        return "secondary"
      case "todo":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "done":
        return "Concluída"
      case "in-progress":
        return "Em Progresso"
      case "todo":
        return "A Fazer"
      default:
        return status
    }
  }

  const isOverdue = (dueDate: string, completed: boolean) => {
    return !completed && new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie suas tarefas e acompanhe o progresso
          </p>
        </div>
        <AddTaskDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <ListTodo className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todas as tarefas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Fazer</CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todo}</div>
            <p className="text-xs text-muted-foreground">Aguardando início</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Progresso</CardTitle>
            <Clock className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle2 className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.done}</div>
            <p className="text-xs text-muted-foreground">Finalizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atrasadas</CardTitle>
            <AlertCircle className="size-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground">Vencidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Progresso Geral</CardTitle>
              <CardDescription>
                {stats.done} de {stats.total} tarefas concluídas
              </CardDescription>
            </div>
            <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionRate} className="h-2" />
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tarefas</CardTitle>
          <CardDescription>
            Gerencie e acompanhe suas tarefas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterStatus(v as any)}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <TabsList>
                <TabsTrigger value="all">Todas ({stats.total})</TabsTrigger>
                <TabsTrigger value="todo">A Fazer ({stats.todo})</TabsTrigger>
                <TabsTrigger value="in-progress">Em Progresso ({stats.inProgress})</TabsTrigger>
                <TabsTrigger value="done">Concluídas ({stats.done})</TabsTrigger>
              </TabsList>

              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar tarefas..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={filterStatus} className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <ListTodo className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                      task.completed ? "opacity-60" : ""
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        </div>
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
                              <Edit className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 size-4" />
                              Marcar como concluída
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 size-4" />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                        </Badge>
                        
                        <Badge variant={getStatusColor(task.status)} className="text-xs">
                          {getStatusLabel(task.status)}
                        </Badge>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          <span className={isOverdue(task.dueDate, task.completed) ? "text-destructive font-medium" : ""}>
                            {formatDate(task.dueDate)}
                            {isOverdue(task.dueDate, task.completed) && " (Atrasada)"}
                          </span>
                        </div>

                        {task.case && (
                          <Badge variant="outline" className="text-xs">
                            {task.case}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignee}`} />
                          <AvatarFallback className="text-xs">
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
