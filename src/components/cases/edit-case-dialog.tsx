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

const caseSchema = z.object({
  number: z.string().min(10, "Por favor, insira um número de processo válido."),
  title: z.string().min(5, "O título deve ter no mínimo 5 caracteres."),
  client: z.string().min(2, "Por favor, selecione um cliente."),
  lawyer: z.string().min(2, "Por favor, selecione um advogado."),
  court: z.string().min(3, "Por favor, insira o tribunal."),
  status: z.enum(["active", "pending", "completed"]),
  priority: z.enum(["high", "medium", "low"]),
  phase: z.string(),
  value: z.string(),
})

type CaseFormValues = z.infer<typeof caseSchema>

interface EditCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  case_: {
    id: number
    number: string
    title: string
    client: string
    lawyer: string
    court: string
    status: string
    priority: string
    phase: string
    value: number
  }
}

export function EditCaseDialog({ open, onOpenChange, case_ }: EditCaseDialogProps) {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      number: case_.number,
      title: case_.title,
      client: case_.client,
      lawyer: case_.lawyer,
      court: case_.court,
      status: case_.status as any,
      priority: case_.priority as any,
      phase: case_.phase,
      value: case_.value.toString(),
    },
  })

  function onSubmit(values: CaseFormValues) {
    toast.success("Processo atualizado com sucesso!", {
      description: `${values.title} foi atualizado.`,
    })
    console.log(values)
    onOpenChange(false)
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
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lawyer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advogado Responsável *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. João Silva" {...field} />
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
                name="phase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fase Processual *</FormLabel>
                    <FormControl>
                      <Input placeholder="Contestação" {...field} />
                    </FormControl>
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
                        <SelectItem value="active">Em Andamento</SelectItem>
                        <SelectItem value="pending">Aguardando</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
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
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="low">Baixa</SelectItem>
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
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
