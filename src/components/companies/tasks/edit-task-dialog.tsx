"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useParams } from "next/navigation"
import { useUpdateTask } from "@/hooks/queries/tasks/use-task"
import { useTaskLists } from "@/hooks/queries/tasks/use-task-list"
import { useProcesses } from "@/hooks/queries/use-process"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"
import { ITask, ITaskStatus, ITaskPriority } from "@/interfaces/ITask"
import { Loader2, Save } from "lucide-react"
import { getFullName } from "../workspace/card-company-team-members"

const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres."),
  description: z.string().min(5, "A descrição deve ter no mínimo 5 caracteres."),
  priority: z.nativeEnum(ITaskPriority),
  status: z.nativeEnum(ITaskStatus),
  deadline: z.string().min(1, "Selecione a data de vencimento"),
  company_acl_id: z.string().min(1, "Selecione o responsável"),
  task_list_id: z.string().min(1, "Selecione a lista de tarefas"),
  process_id: z.string().min(1, "Selecione o processo"),
})

type TaskFormValues = z.infer<typeof taskSchema>

interface EditTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: ITask
}

export function EditTaskDialog({ open, onOpenChange, task }: EditTaskDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string

  const { mutate: updateTask, isPending } = useUpdateTask()

  const { data: taskListsData, isLoading: isLoadingTaskLists } = useTaskLists(companyId, { take: 100 })
  const { data: processesData, isLoading: isLoadingProcesses } = useProcesses(companyId)
  const { data: companyACLData, isLoading: isLoadingACL } = useCompanyACL(companyId, { take: 100 })

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      // Format 2024-04-10T00:00:00.000Z to 2024-04-10
      deadline: task.deadline ? task.deadline.split('T')[0] : "",
      company_acl_id: task.company_acl_id,
      task_list_id: task.task_list_id,
      process_id: task.process_id,
    },
  })

  // Update form values when task changes
  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        deadline: task.deadline ? task.deadline.split('T')[0] : "",
        company_acl_id: task.company_acl_id,
        task_list_id: task.task_list_id,
        process_id: task.process_id,
      })
    }
  }, [task, form])

  function onSubmit(values: TaskFormValues) {
    updateTask(
      { companyId, taskId: task.id, data: values },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso!")
          onOpenChange(false)
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Erro ao atualizar tarefa")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Atualize as informações da tarefa.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Redigir petição inicial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva os detalhes da tarefa..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ITaskPriority.LOW}>Baixa</SelectItem>
                        <SelectItem value={ITaskPriority.MEDIUM}>Média</SelectItem>
                        <SelectItem value={ITaskPriority.HIGH}>Alta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ITaskStatus.TODO}>A Fazer</SelectItem>
                        <SelectItem value={ITaskStatus.IN_PROGRESS}>Em Progresso</SelectItem>
                        <SelectItem value={ITaskStatus.DONE}>Concluída</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vencimento *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="company_acl_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingACL ? "Carregando..." : "Selecione o responsável"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companyACLData?.company_acls?.map((acl: any) => (
                          <SelectItem key={acl.id} value={acl.id}>
                            {getFullName(acl) || "Usuário sem nome"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="task_list_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lista de Tarefas *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isLoadingTaskLists ? "Carregando..." : "Selecione a lista"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskListsData?.taskLists?.map((list: any) => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="process_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vincular a Processo *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isLoadingProcesses ? "Carregando..." : "Selecione um processo"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {processesData?.processes.map((process: any) => (
                        <SelectItem key={process.id} value={process.id}>
                          {process.process_number} - {process.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

