"use client"

import { useState, useMemo } from "react"
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
import { Search, MoreVertical, Edit, Trash2, CheckCircle2, Clock, ListTodo, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useInfiniteTasks, useUpdateTask, useDeleteTask, useTaskKPIs } from "@/hooks/queries/tasks/use-task"
import { useDebounce } from "@/utils/use-debounce"
import { InfiniteScroll } from "@/components/ui/infinite-scroll"
import { EditTaskDialog } from "./edit-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { ITask, ITaskStatus, ITaskPriority } from "@/interfaces/ITask"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TaskCard } from "@/components/ui/mobile-card-variants"
import { MobileCardList } from "@/components/ui/mobile-card-list"
import { Skeleton } from "@/components/ui/skeleton"

export function TasksListCard() {
  const params = useParams()
  const companyId = params.company_id as string
  
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const [editTask, setEditTask] = useState<ITask | null>(null)
  const [deleteTaskItem, setDeleteTaskItem] = useState<ITask | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTasks(companyId, {
    search: debouncedSearch,
    status: statusFilter === "all" ? undefined : statusFilter,
  })

  const { data: stats } = useTaskKPIs(companyId)
  const { mutate: updateTask } = useUpdateTask()

  const allTasks = useMemo(() => {
    return data?.pages.flatMap((page) => page.tasks) || []
  }, [data])

  const handleToggleDone = (task: ITask) => {
    const newStatus = task.status === ITaskStatus.DONE ? ITaskStatus.TODO : ITaskStatus.DONE
    updateTask({
      companyId,
      taskId: task.id,
      data: { status: newStatus }
    })
  }

  const getPriorityColor = (priority: ITaskPriority) => {
    switch (priority) {
      case ITaskPriority.HIGH:
        return "destructive"
      case ITaskPriority.MEDIUM:
        return "default"
      case ITaskPriority.LOW:
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: ITaskStatus) => {
    switch (status) {
      case ITaskStatus.DONE:
        return "default"
      case ITaskStatus.IN_PROGRESS:
        return "secondary"
      case ITaskStatus.TODO:
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusLabel = (status: ITaskStatus) => {
    switch (status) {
      case ITaskStatus.DONE:
        return "Concluída"
      case ITaskStatus.IN_PROGRESS:
        return "Em Progresso"
      case ITaskStatus.TODO:
        return "A Fazer"
      default:
        return status
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd 'de' MMM", { locale: ptBR })
    } catch (e) {
      return dateStr
    }
  }

  const isOverdue = (deadline: string, status: ITaskStatus) => {
    return status !== ITaskStatus.DONE && new Date(deadline) < new Date()
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle>Lista de Tarefas</CardTitle>
        <CardDescription>
          Gerencie e acompanhe suas tarefas de forma detalhada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4" onValueChange={setStatusFilter}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all">Todas ({stats?.total || 0})</TabsTrigger>
              <TabsTrigger value={ITaskStatus.TODO}>A Fazer ({stats?.todo || 0})</TabsTrigger>
              <TabsTrigger value={ITaskStatus.IN_PROGRESS}>Em Progresso ({stats?.inProgress || 0})</TabsTrigger>
              <TabsTrigger value={ITaskStatus.DONE}>Concluídas ({stats?.done || 0})</TabsTrigger>
            </TabsList>

            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar tarefas..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value={statusFilter} className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            ) : allTasks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <ListTodo className="size-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
              </div>
            ) : (
              <InfiniteScroll
                hasMore={!!hasNextPage}
                onLoadMore={async () => {
                  await fetchNextPage()
                }}
                disabled={isFetchingNextPage}
              >
                {/* Desktop View */}
                <div className="hidden md:block space-y-3">
                  {allTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`group flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-all ${
                        task.status === ITaskStatus.DONE ? "opacity-60 bg-muted/20" : "bg-card"
                      }`}
                    >
                      <Checkbox
                        checked={task.status === ITaskStatus.DONE}
                        onCheckedChange={() => handleToggleDone(task)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className={`font-semibold text-base transition-all ${task.status === ITaskStatus.DONE ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setEditTask(task)}>
                                <Edit className="mr-2 size-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleDone(task)}>
                                <CheckCircle2 className="mr-2 size-4" />
                                {task.status === ITaskStatus.DONE ? "Marcar como pendente" : "Marcar como concluída"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTaskItem(task)}>
                                <Trash2 className="mr-2 size-4" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant={getPriorityColor(task.priority)} className="capitalize text-[10px] px-2 py-0">
                            {task.priority === ITaskPriority.HIGH ? "Alta" : task.priority === ITaskPriority.MEDIUM ? "Média" : "Baixa"}
                          </Badge>
                          
                          <Badge variant={getStatusColor(task.status)} className="text-[10px] px-2 py-0">
                            {getStatusLabel(task.status)}
                          </Badge>

                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-l pl-3">
                            <Clock className={`size-3 ${isOverdue(task.deadline, task.status) ? "text-destructive" : ""}`} />
                            <span className={isOverdue(task.deadline, task.status) ? "text-destructive font-semibold" : ""}>
                              {formatDate(task.deadline)}
                              {isOverdue(task.deadline, task.status) && " (Atrasada)"}
                            </span>
                          </div>

                          {task.process?.process_number && (
                            <Badge variant="outline" className="text-[10px] bg-blue-50/50 text-blue-700 border-blue-200">
                              {task.process.process_number}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-1 border-t mt-2">
                          <Avatar className="size-5">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.company_acl?.user?.name || "User"}`} />
                            <AvatarFallback className="text-[10px]">
                              {task.company_acl?.user?.name?.substring(0, 2).toUpperCase() || "US"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[11px] text-muted-foreground font-medium">
                            Responsável: <span className="text-foreground">{task.company_acl?.user?.name || "Não atribuído"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                  <MobileCardList>
                    {allTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        priority={task.priority as any}
                        status={getStatusLabel(task.status)}
                        dueDate={formatDate(task.deadline)}
                        assignee={{
                          name: task.company_acl?.user?.name || "N/A",
                          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${task.company_acl?.user?.name || "User"}`
                        }}
                        tags={task.process?.process_number ? [task.process.process_number] : undefined}
                        completed={task.status === ITaskStatus.DONE}
                        onToggle={() => handleToggleDone(task)}
                        actions={
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="size-8">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditTask(task)}>
                                <Edit className="mr-2 size-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTaskItem(task)}>
                                <Trash2 className="mr-2 size-4" />
                                Remover
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        }
                      />
                    ))}
                  </MobileCardList>
                </div>
              </InfiniteScroll>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Dialogs */}
      {editTask && (
        <EditTaskDialog
          open={!!editTask}
          onOpenChange={(open) => !open && setEditTask(null)}
          task={editTask}
        />
      )}

      {deleteTaskItem && (
        <DeleteTaskDialog
          open={!!deleteTaskItem}
          onOpenChange={(open) => !open && setDeleteTaskItem(null)}
          task={{
            id: deleteTaskItem.id,
            title: deleteTaskItem.title,
          }}
        />
      )}
    </Card>
  )
}
