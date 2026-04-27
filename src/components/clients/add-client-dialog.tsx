"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateClient } from "@/hooks/queries/clients/use-clients"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2, User, Plus, Save, Fingerprint, MapPin, Users2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const clientSchema = z.object({
  type: z.enum(["pf", "pj"]),
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  phone: z.string().min(1, "Número do telefone é obrigatório"),
  nif: z.string().min(1, "NIF é obrigatório"),
  Identity_card_number: z.string().optional(),
  Id_validity: z.string().optional(),
  nacionality: z.string().default("Angolana"),
  marital_status: z.string().optional(),
  birth_place: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(), // Província
  country: z.string().default("Angola"),
  profile: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  profession: z.string().optional(),
  company_name: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface AddClientDialogProps {
  onSuccess?: () => void
}

export function AddClientDialog({ onSuccess }: AddClientDialogProps) {
  const [open, setOpen] = useState(false)
  const [clientType, setClientType] = useState<"pf" | "pj">("pf")
  const { company } = useCompanyDashboardContext()
  const { mutate: createClient, isPending } = useCreateClient()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      type: "pf",
      name: "",
      email: "",
      phone: "",
      nif: "",
      Identity_card_number: "",
      Id_validity: "1",
      nacionality: "Angolana",
      marital_status: "Solteiro(a)",
      birth_place: "",
      address: "",
      city: "Luanda",
      country: "Angola",
      profile: "",
      father_name: "",
      mother_name: "",
      profession: "",
      company_name: "",
    },
  })

  function onSubmit(values: ClientFormValues) {
    if (!company?.id) return;

    createClient({
      companyId: company.id,
      data: values
    }, {
      onSuccess: () => {
        toast.success("Cliente cadastrado com sucesso!")
        setOpen(false)
        form.reset()
        onSuccess?.()
      },
      onError: (error: any) => {
        toast.error("Erro ao cadastrar cliente", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  const angolanProvinces = [
    "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte",
    "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda", "Lunda Norte",
    "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire"
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold shadow-lg transition-all hover:scale-105">
          <Plus className="mr-2 size-4" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-5xl max-h-[92vh] overflow-hidden p-0 gap-0 shadow-2xl border-none">
        <DialogHeader className="p-8 pb-4 bg-muted/30">
          <DialogTitle className="text-3xl font-extrabold tracking-tight">Cadastro de Cliente</DialogTitle>
          <DialogDescription className="text-base">
            Registe um novo cliente singular ou colectivo com todos os detalhes jurídicos necessários para o sistema.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <ScrollArea className="flex-1 max-h-[70vh] p-10 pt-4">
              <div className="space-y-8">
                {/* Tipo de Cliente Selection */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-bold">Tipo de Entidade</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value)
                            setClientType(value as any)
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <Label
                            htmlFor="pf"
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 transition-all cursor-pointer hover:bg-accent ${field.value === "pf" ? "border-primary bg-primary/5" : "border-muted"}`}
                          >
                            <RadioGroupItem value="pf" id="pf" className="sr-only" />
                            <User className={`mb-2 size-8 ${field.value === "pf" ? "text-primary" : "text-muted-foreground"}`} />
                            <div className="text-center font-semibold">Pessoa Singular</div>
                          </Label>
                          <Label
                            htmlFor="pj"
                            className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 transition-all cursor-pointer hover:bg-accent ${field.value === "pj" ? "border-primary bg-primary/5" : "border-muted"}`}
                          >
                            <RadioGroupItem value="pj" id="pj" className="sr-only" />
                            <Building2 className={`mb-2 size-8 ${field.value === "pj" ? "text-primary" : "text-muted-foreground"}`} />
                            <div className="text-center font-semibold">Pessoa Colectiva</div>
                          </Label>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Tabs defaultValue="perfil" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1">
                    <TabsTrigger value="perfil" className="gap-2 cursor-pointer">
                      <User className="size-4" /> Perfil & Contacto
                    </TabsTrigger>
                    <TabsTrigger value="identidade" className="gap-2 cursor-pointer">
                      <Fingerprint className="size-4" /> BI & Família
                    </TabsTrigger>
                    <TabsTrigger value="origem" className="gap-2 cursor-pointer">
                      <MapPin className="size-4" /> Residência & Empresa
                    </TabsTrigger>
                  </TabsList>

                  {/* TAB 1: PERFIL & CONTACTO */}
                  <TabsContent value="perfil" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-bold">Nome Completo / Denominação Activa *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Abel João Kiala" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Email Institucional/Pessoal *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="cliente@provedor.ao" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Telemóvel (WhatsApp) *</FormLabel>
                            <FormControl>
                              <Input placeholder="+244 9XX XXX XXX" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="marital_status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Estado Civil</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                                <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                                <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                                <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Profissão / Cargo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Contabilista Sénior" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* TAB 2: BI & FAMÍLIA */}
                  <TabsContent value="identidade" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nif"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">NIF (Número de Identificação Fiscal) *</FormLabel>
                            <FormControl>
                              <Input placeholder="00XXXXXX" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Identity_card_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Nº do Bilhete de Identidade (BI)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 009XXX563LA052" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="Id_validity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Validade do Documento (Anos)</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nacionality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Nacionalidade</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 border-l-2 border-primary/20 pl-4 bg-primary/5 py-4 rounded-r-lg">
                        <div className="flex items-center gap-2 mb-2 md:col-span-2">
                          <Users2 className="size-5 text-primary" />
                          <h3 className="font-bold text-sm uppercase tracking-wide">Filiação</h3>
                        </div>
                        <FormField
                          control={form.control}
                          name="father_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold">Nome do Pai</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome completo do progenitor" {...field} className="h-10 bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mother_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-semibold">Nome da Mãe</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome completo da progenitora" {...field} className="h-10 bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* TAB 3: RESIDÊNCIA & EMPRESA */}
                  <TabsContent value="origem" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="birth_place"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Naturalidade (Local de Nascimento)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Cazenga, Luanda" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city" // Província
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Província de Residência</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue placeholder="Selecione a província" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {angolanProvinces.map((prov) => (
                                  <SelectItem key={prov} value={prov}>
                                    {prov}
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
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-bold">Bairro / Rua / Edifício</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Talatona, Rua do SIAC, Edifício Cristal" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-bold">Empresa / Instituição Vinculada</FormLabel>
                            <FormControl>
                              <Input placeholder="Onde o cliente trabalha ou é sócio" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            <DialogFooter className="p-6 bg-muted/20 border-t">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="h-12 px-8">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="h-12 px-8 min-w-[150px]">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    A processar...
                  </span>
                ) : (
                  <>
                    <Save className="mr-2 size-5" />
                    Registar Cliente
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
