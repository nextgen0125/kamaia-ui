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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Plus, Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const caseSchema = z.object({
  number: z.string().min(5, "Número do processo inválido"),
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  clientId: z.string().min(1, "Selecione um cliente"),
  lawyerId: z.string().min(1, "Selecione um advogado"),
  court: z.string().min(3, "Informe o fórum/tribunal"),
  courtType: z.string().min(1, "Selecione o tipo de justiça"),
  area: z.string().min(1, "Selecione a área do direito"),
  phase: z.string().optional(),
  value: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["active", "pending", "completed"]),
  description: z.string().optional(),
  distributionDate: z.string().optional(),
  deadlineDate: z.string().optional(),
})

type CaseFormValues = z.infer<typeof caseSchema>

interface AddCaseDialogProps {
  onSuccess?: () => void
}

export function AddCaseDialog({ onSuccess }: AddCaseDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      number: "",
      title: "",
      clientId: "",
      lawyerId: "",
      court: "",
      courtType: "",
      area: "",
      phase: "",
      value: "",
      priority: "medium",
      status: "active",
      description: "",
      distributionDate: "",
      deadlineDate: "",
    },
  })

  function onSubmit(values: CaseFormValues) {
    console.log(values)
    toast.success("Processo cadastrado com sucesso!")
    setOpen(false)
    form.reset()
    onSuccess?.()
  }

  const clients = [
    { id: "1", name: "Carlos Mendes" },
    { id: "2", name: "Ana Paula Oliveira" },
    { id: "3", name: "Empresa ABC Ltda" },
    { id: "4", name: "Tech Solutions S/A" },
  ]

  const lawyers = [
    { id: "1", name: "Dr. João Silva" },
    { id: "2", name: "Dra. Maria Santos" },
    { id: "3", name: "Dr. Pedro Costa" },
  ]

  const courtTypes = [
    { value: "federal", label: "Justiça Federal" },
    { value: "state", label: "Justiça Estadual" },
    { value: "labor", label: "Justiça do Trabalho" },
    { value: "electoral", label: "Justiça Eleitoral" },
    { value: "military", label: "Justiça Militar" },
  ]

  const legalAreas = [
    { value: "civil", label: "Direito Civil" },
    { value: "criminal", label: "Direito Penal" },
    { value: "labor", label: "Direito Trabalhista" },
    { value: "family", label: "Direito de Família" },
    { value: "business", label: "Direito Empresarial" },
    { value: "tax", label: "Direito Tributário" },
    { value: "consumer", label: "Direito do Consumidor" },
    { value: "administrative", label: "Direito Administrativo" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Novo Processo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Novo Processo</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo processo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                  <TabsTrigger value="parties">Partes</TabsTrigger>
                  <TabsTrigger value="control">Controle</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Processo *</FormLabel>
                          <FormControl>
                            <Input placeholder="0000000-00.0000.0.00.0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="courtType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Justiça *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courtTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
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
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título/Assunto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Ação Trabalhista - Horas Extras" {...field} />
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
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva brevemente o processo..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área do Direito *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {legalAreas.map((area) => (
                                <SelectItem key={area.value} value={area.value}>
                                  {area.label}
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
                      name="court"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fórum/Tribunal *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Foro Central - SP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="parties" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cliente *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o cliente" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                  {client.name}
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
                      name="lawyerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advogado Responsável *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o advogado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lawyers.map((lawyer) => (
                                <SelectItem key={lawyer.id} value={lawyer.id}>
                                  {lawyer.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="control" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
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
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Baixa</SelectItem>
                              <SelectItem value="medium">Média</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fase Processual</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Contestação" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor da Causa</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0,00" {...field} />
                          </FormControl>
                          <FormDescription>Em reais (R$)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="distributionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Distribuição</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deadlineDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Próximo Prazo</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Save className="mr-2 size-4" />
                Salvar Processo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
