"use client"

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
import { useUpdateProcess } from "@/hooks/queries/use-process"
import { useAuth } from "@/contexts/auth-context"
import { IProcessPriority, AccessTypeProcecess, ILegalArea } from "@/interfaces/IProcess"
import { Loader2 } from "lucide-react"

const caseSchema = z.object({
  number: z.string().min(5, "Por favor, insira um número de processo válido."),
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres."),
  court: z.string().min(3, "Por favor, insira o tribunal."),
  status: z.string().min(1, "Selecione o status"),
  priority: z.nativeEnum(IProcessPriority),
  phase: z.string().optional(),
  value: z.string(),
  instance: z.string().min(1, "Informe a instância"),
})

type CaseFormValues = z.infer<typeof caseSchema>

interface EditCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  case_: any // Using any for flexibility during transition
}

export function EditCaseDialog({ open, onOpenChange, case_ }: EditCaseDialogProps) {
  const { user } = useAuth()
  const companyId = user?.company_acls?.[0]?.company_id || ""
  const updateProcess = useUpdateProcess()

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      number: case_.process_number || case_.number || "",
      title: case_.title || "",
      court: case_.action || case_.court || "",
      status: case_.status || "Pendente",
      priority: (case_.priority as IProcessPriority) || IProcessPriority.MEDIUM,
      phase: case_.phase || "",
      value: (case_.case_value || case_.value || 0).toString(),
      instance: (case_.instance || 1).toString(),
    },
  })

  async function onSubmit(values: CaseFormValues) {
    if (!companyId) {
      toast.error("Empresa não identificada.")
      return
    }

    try {
      await updateProcess.mutateAsync({
        companyId,
        processId: case_.id,
        processData: {
          id: case_.id,
          company_id: companyId,
          company_acl_id: case_.company_acl_id, // Keep existing lawyer
          title: values.title,
          process_number: values.number,
          instance: Number(values.instance),
          legal_area: case_.legal_area || ILegalArea.OUTRO,
          action: values.court,
          object: case_.object || "",
          case_value: Number(values.value),
          sentence_value: case_.sentence_value || 0,
          access: case_.access || AccessTypeProcecess.PUBLIC,
          distributed_in: case_.distributed_in || new Date(),
          status: values.status,
          priority: values.priority,
        },
      })

      toast.success("Processo atualizado com sucesso!")
      onOpenChange(false)
    } catch (error: any) {
      toast.error("Erro ao atualizar processo", {
        description: error.message || "Tente novamente mais tarde."
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>Editar Processo</DialogTitle>
          <DialogDescription>
            Atualize as informações do processo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Processo *</FormLabel>
                    <FormControl>
                      <Input placeholder="0001234-56.2024.8.26.0100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ação Trabalhista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="court"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tribunal/Fórum *</FormLabel>
                    <FormControl>
                      <Input placeholder="TRT 2ª Região" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instância *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1ª Instância</SelectItem>
                        <SelectItem value="2">2ª Instância</SelectItem>
                        <SelectItem value="3">3ª Instância</SelectItem>
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
                        <SelectItem value="Pendente">Aguardando</SelectItem>
                        <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value={IProcessPriority.HIGH}>Alta</SelectItem>
                        <SelectItem value={IProcessPriority.MEDIUM}>Média</SelectItem>
                        <SelectItem value={IProcessPriority.LOW}>Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Valor da Causa (AOA)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={updateProcess.isPending}>
                {updateProcess.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
