"use client"

import { useState } from "react"
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
  DialogTrigger,
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
import { Plus, Save, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useCreateTaskList } from "@/hooks/queries/tasks/use-task-list"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"

const taskListSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  company_acl_id: z.string().min(1, "Selecione o responsável pela lista"),
})

type TaskListFormValues = z.infer<typeof taskListSchema>

export function AddTaskListDialog() {
  const [open, setOpen] = useState(false)
  const params = useParams()

  const { isLoading, company } = useCompanyDashboardContext();

  const { mutate: createTaskList, isPending } = useCreateTaskList()
  const { data: companyACLData, isLoading: isLoadingACL } = useCompanyACL(company?.id as string, { take: 100 })

  const form = useForm<TaskListFormValues>({
    resolver: zodResolver(taskListSchema),
    defaultValues: {
      name: "",
      company_acl_id: "",
    },
  })

  function onSubmit(values: TaskListFormValues) {
    createTaskList(
      { companyId: company?.id as string, data: values },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 size-4" />
          Nova Lista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Lista de Tarefas</DialogTitle>
          <DialogDescription>
            Crie uma categoria para organizar suas tarefas.
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
                          {acl.user?.firstName} {acl.user?.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                Criar Lista
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
