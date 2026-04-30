"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
  Plus, 
  Save, 
  X, 
  Info, 
  User as UserIcon, 
  Gavel, 
  Clock, 
  Calendar as CalendarIcon,
  AlertTriangle,
  ChevronRight,
  Loader2,
  FileText,
  DollarSign,
  Shield,
  Briefcase
} from "lucide-react"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { useAuth } from "@/contexts/auth-context"
import { useClients } from "@/hooks/queries/clients/use-clients"
import { useAttorneyACL } from "@/hooks/queries/use-company-acl"
import { useCreateProcess } from "@/hooks/queries/use-process"
import { ILegalArea, IProcessPriority, AccessTypeProcecess } from "@/interfaces/IProcess"

const caseSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres"),
  clientId: z.string().min(1, "Selecione um cliente"),
  lawyerId: z.string().min(1, "Selecione um advogado"),
  instance: z.string().min(1, "Informe a instância"),
  legal_area: z.nativeEnum(ILegalArea),
  priority: z.nativeEnum(IProcessPriority),
  object: z.string().min(1, "O objeto do processo é obrigatório"),
  case_value: z.string().min(1, "Ajuste o valor da causa"),
  sentence_value: z.string().min(1, "Ajuste o valor da sentença"),
  access: z.nativeEnum(AccessTypeProcecess),
  distributed_in: z.string().min(1, "Selecione a data de distribuição"),
  status: z.string().min(1, "Selecione o status"),
  action: z.string().optional(), // Adding if needed by backend but not in validator
})

type CaseFormValues = z.infer<typeof caseSchema>

interface AddCaseDialogProps {
  onSuccess?: () => void
}

export function AddCaseDialog({ onSuccess }: AddCaseDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const { user } = useAuth()
  
  const companyId = user?.company_acls?.[0]?.company_id || ""

  const { data: clientsData, isLoading: isLoadingClients } = useClients(companyId, 1, 500)
  const { data: lawyersData, isLoading: isLoadingLawyers } = useAttorneyACL(companyId)
  const createProcess = useCreateProcess()

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      clientId: "",
      lawyerId: "",
      instance: "1",
      legal_area: ILegalArea.OUTRO,
      priority: IProcessPriority.MEDIUM,
      object: "",
      case_value: "0",
      sentence_value: "0",
      access: AccessTypeProcecess.PUBLIC,
      distributed_in: new Date().toISOString().split('T')[0],
      status: "Pendente",
      action: "",
    },
  })

  async function onSubmit(values: CaseFormValues) {
    if (!companyId) {
      toast.error("Empresa não identificada.")
      return
    }

    try {
      await createProcess.mutateAsync({
        companyId,
        processData: {
          title: values.title,
          company_id: companyId,
          company_acl_id: values.lawyerId,
          instance: Number(values.instance),
          legal_area: values.legal_area,
          priority: values.priority,
          object: values.object,
          case_value: Number(values.case_value),
          sentence_value: Number(values.sentence_value),
          access: values.access,
          distributed_in: new Date(values.distributed_in),
          status: values.status,
          action: values.action || values.legal_area, // Fallback to legal_area
          process_number: "", // Backend generates this
        },
      })

      toast.success("Processo cadastrado com sucesso!")
      setOpen(false)
      form.reset()
      onSuccess?.()
    } catch (error: any) {
      toast.error("Erro ao cadastrar processo", {
        description: error.message || "Tente novamente mais tarde."
      })
    }
  }

  const clients = clientsData?.clients || []
  const lawyers = lawyersData?.company_acls || []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold shadow-md active:scale-95 transition-transform">
          <Plus className="mr-2 size-4" />
          Novo Processo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="flex flex-col h-full bg-background">
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">Criar Novo Processo</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  Registre um novo caso jurídico na plataforma.
                </DialogDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-primary/20 bg-primary/10 text-primary">
                Modo de Cadastro
              </Badge>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
              <div className="px-6 flex-1 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-auto">
                    <TabsTrigger value="basic" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Info className="size-4 mr-2" />
                      Informações Gerais
                    </TabsTrigger>
                    <TabsTrigger value="parties" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <UserIcon className="size-4 mr-2" />
                      Partes & Responsáveis
                    </TabsTrigger>
                    <TabsTrigger value="financial" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <DollarSign className="size-4 mr-2" />
                      Financeiro & Status
                    </TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1 mt-6 h-[50vh] pr-4">
                    <TabsContent value="basic" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel className="text-sm font-bold">Título do Processo / Assunto *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: Ação de Cobrança - Divisão de Bens" className="h-11 border-muted-foreground/20 focus-visible:ring-primary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="legal_area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Área do Direito *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Selecione a área" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(ILegalArea).map((area) => (
                                    <SelectItem key={area} value={area}>{area}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="instance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Instância *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1ª Instância</SelectItem>
                                  <SelectItem value="2">2ª Instância</SelectItem>
                                  <SelectItem value="3">3ª Instância</SelectItem>
                                  <SelectItem value="4">Tribunal Superior</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="object"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">Objeto do Processo / Descrição Detalhada *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva o objetivo jurídico principal deste processo..." 
                                className="min-h-[120px] resize-none border-muted-foreground/20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Esta informação aparecerá nos relatórios e na timeline.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="parties" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                      <Card className="border-primary/10 bg-primary/5">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="bg-primary/20 p-2 rounded-full text-primary">
                            <Briefcase className="size-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Configuração de Responsáveis</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Vincule o cliente e o advogado responsável pela condução deste caso.
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="clientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Cliente Principal *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder={isLoadingClients ? "Carregando clientes..." : "Selecione o cliente"} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {clients.map((client: any) => (
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
                              <FormLabel className="text-sm font-bold">Advogado Responsável *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue placeholder={isLoadingLawyers ? "Carregando advogados..." : "Selecione o advogado"} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {lawyers.map((acl: any) => (
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
                      </div>

                      <FormField
                        control={form.control}
                        name="access"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">Privacidade & Acesso *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={AccessTypeProcecess.PUBLIC}>
                                  <div className="flex items-center">
                                    <Shield className="size-4 mr-2 text-green-500" />
                                    <span>Público (Todos do escritório)</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value={AccessTypeProcecess.INVOLVED}>
                                  <div className="flex items-center">
                                    <UserIcon className="size-4 mr-2 text-blue-500" />
                                    <span>Envolvidos (Apenas advogados do caso)</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value={AccessTypeProcecess.PRIVATE}>
                                  <div className="flex items-center">
                                    <Shield className="size-4 mr-2 text-red-500" />
                                    <span>Privado (Apenas você e administradores)</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="financial" className="space-y-6 m-0 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="case_value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Valor da Causa (AOA) *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">Kz</span>
                                  <Input type="number" step="0.01" className="h-11 pl-10 border-muted-foreground/20" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sentence_value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Expectativa / Valor da Sentença (AOA) *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">Kz</span>
                                  <Input type="number" step="0.01" className="h-11 pl-10 border-muted-foreground/20" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Status Atual *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Pendente">Aguardando</SelectItem>
                                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                                  <SelectItem value="Concluído">Concluído</SelectItem>
                                  <SelectItem value="Arquivado">Arquivado</SelectItem>
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
                              <FormLabel className="text-sm font-bold">Prioridade *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-11">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={IProcessPriority.LOW}>
                                    <div className="flex items-center">
                                      <div className="size-2 rounded-full bg-blue-500 mr-2" />
                                      <span>Baixa</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value={IProcessPriority.MEDIUM}>
                                    <div className="flex items-center">
                                      <div className="size-2 rounded-full bg-yellow-500 mr-2" />
                                      <span>Média</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value={IProcessPriority.HIGH}>
                                    <div className="flex items-center">
                                      <div className="size-2 rounded-full bg-red-500 mr-2" />
                                      <span>Alta</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="distributed_in"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold">Data de Distribuição *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                  <Input type="date" className="h-11 pl-10 border-muted-foreground/20" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>

              <div className="p-6 border-t bg-muted/20">
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="px-6 text-muted-foreground hover:text-foreground">
                    Descartar Alterações
                  </Button>
                  
                  {activeTab !== "financial" ? (
                    <Button 
                      type="button" 
                      onClick={() => {
                        const tabs = ["basic", "parties", "financial"];
                        const nextIndex = tabs.indexOf(activeTab) + 1;
                        if (nextIndex < tabs.length) setActiveTab(tabs[nextIndex]);
                      }}
                      className="px-8"
                    >
                      Próximo
                      <ChevronRight className="ml-2 size-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={createProcess.isPending} className="px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all">
                      {createProcess.isPending ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 size-4" />
                          Finalizar Cadastro
                        </>
                      )}
                    </Button>
                  )}
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
