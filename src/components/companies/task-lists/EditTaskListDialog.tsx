"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useUpdateTaskList } from "@/hooks/queries/tasks/use-task-list"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"
import { ITaskList } from "@/interfaces/ITaskList"

const taskListSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  company_acl_id: z.string().min(1, "Selecione o responsável pela lista"),
})

type TaskListFormValues = z.infer<typeof taskListSchema>

interface EditTaskListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskList: ITaskList
}

export function EditTaskListDialog({ open, onOpenChange, taskList }: EditTaskListDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string

  const { mutate: updateTaskList, isPending } = useUpdateTaskList()
  const { data: companyACLData, isLoading: isLoadingACL } = useCompanyACL(companyId, { take: 100 })

  const form = useForm<TaskListFormValues>({
    resolver: zodResolver(taskListSchema),
    defaultValues: {
      name: taskList.name,
      company_acl_id: taskList.company_acl_id,
    },
  })

  useEffect(() => {
    if (taskList) {
      form.reset({
        name: taskList.name,
        company_acl_id: taskList.company_acl_id,
      })
    }
  }, [taskList, form])

  function onSubmit(values: TaskListFormValues) {
    updateTaskList(
      { companyId, id: taskList.id, data: values },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Lista de Tarefas</DialogTitle>
          <DialogDescription>
            Atualize as informações da sua lista de tarefas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Lista *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cobrança, Prazos..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                          {acl.user?.name || "Usuário sem nome"}
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
