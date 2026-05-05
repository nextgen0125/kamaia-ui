"use client";

import { useState } from "react";
import { useInfiniteTasks } from "@/hooks/queries/tasks/use-task";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Edit2, Trash2, CheckCircle2, Clock } from "lucide-react";
import { AddTaskDialog } from "@/components/companies/tasks/add-task-dialog";
import { EditTaskDialog } from "@/components/companies/tasks/edit-task-dialog";
import { DeleteTaskDialog } from "@/components/companies/tasks/delete-task-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ITask, ITaskStatus, ITaskPriority } from "@/interfaces/ITask";

interface CaseTasksTabProps {
  companyId?: string;
  caseId?: string;
}

export function CaseTasksTab({
  companyId: propCompanyId,
  caseId: propCaseId,
}: CaseTasksTabProps) {
  const params = useParams();
  const companyId = propCompanyId || (params.company_id as string);
  const caseId = propCaseId || (params.id as string);

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Carregar tarefas do processo (infinite scroll)
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteTasks(companyId, {
    process_id: caseId,
  });

  // Filtrar tarefas deste processo
  const tasks = data?.pages.flatMap((page) => page.tasks || []) || [];

  const getStatusColor = (status: ITaskStatus) => {
    switch (status) {
      case ITaskStatus.TODO:
        return "secondary";
      case ITaskStatus.IN_PROGRESS:
        return "default";
      case ITaskStatus.DONE:
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: ITaskStatus) => {
    switch (status) {
      case ITaskStatus.TODO:
        return "A Fazer";
      case ITaskStatus.IN_PROGRESS:
        return "Em Progresso";
      case ITaskStatus.DONE:
        return "Concluída";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: ITaskPriority) => {
    switch (priority) {
      case ITaskPriority.HIGH:
        return "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400";
      case ITaskPriority.MEDIUM:
        return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case ITaskPriority.LOW:
        return "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "";
    }
  };

  const getPriorityLabel = (priority: ITaskPriority) => {
    switch (priority) {
      case ITaskPriority.HIGH:
        return "Alta";
      case ITaskPriority.MEDIUM:
        return "Média";
      case ITaskPriority.LOW:
        return "Baixa";
      default:
        return priority;
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && new Date().toDateString() !== new Date(deadline).toDateString();
  };

  const handleEditClick = (task: ITask) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (task: ITask) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Carregando tarefas...
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Tarefas do Processo
            </CardTitle>
            <AddTaskDialog />
          </div>
        </CardHeader>

        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhuma tarefa encontrada para este processo.</p>
              <p className="text-sm mt-1">
                Comece criando uma nova tarefa usando o botão acima.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task: ITask) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium max-w-xs truncate">
                          {task.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(task.status) as "default" | "secondary" | "destructive" | "outline"}>
                            {getStatusLabel(task.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(task.priority)}
                          >
                            {getPriorityLabel(task.priority)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {task.company_acl?.user
                            ? `${task.company_acl.user.firstName} ${task.company_acl.user.lastName}`
                            : "Sem responsável"}
                        </TableCell>
                        <TableCell className="text-sm">
                          <span
                            className={
                              isOverdue(task.deadline)
                                ? "text-red-600 dark:text-red-400 font-medium"
                                : ""
                            }
                          >
                            {task.deadline
                              ? format(new Date(task.deadline), "dd/MM/yyyy", {
                                locale: ptBR,
                              })
                              : "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditClick(task)}>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteClick(task)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Load more button */}
              {hasNextPage && (
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Carregando..." : "Carregar mais tarefas"}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog de edição */}
      {selectedTask && (
        <EditTaskDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          task={selectedTask}
        />
      )}

      {/* Dialog de exclusão */}
      {selectedTask && (
        <DeleteTaskDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          task={selectedTask}
        />
      )}
    </>
  );
}
