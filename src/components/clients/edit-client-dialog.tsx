"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useUpdateClient } from "@/hooks/queries/clients/use-clients"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { IClient } from "@/services/clients.service"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, User, Fingerprint, MapPin, Activity } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const clientSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(1, "O telemóvel é obrigatório."),
  nif: z.string().min(1, "O NIF é obrigatório."),
  Identity_card_number: z.string().optional(),
  Id_validity: z.string().optional(),
  type: z.enum(["pf", "pj"]),
  is_active: z.boolean().default(true),
  profession: z.string().optional(),
  nacionality: z.string().optional(),
  marital_status: z.string().optional(),
  birth_place: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  company_name: z.string().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface EditClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: IClient
}

export function EditClientDialog({ open, onOpenChange, client }: EditClientDialogProps) {
  const { company } = useCompanyDashboardContext()
  const { mutate: updateClient, isPending } = useUpdateClient()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      nif: client.nif || "",
      Identity_card_number: client.Identity_card_number || "",
      Id_validity: client.Id_validity || "1",
      type: client.type as any,
      is_active: client.is_active,
      profession: client.profession || "",
      nacionality: client.nacionality || "Angolana",
      marital_status: client.marital_status || "Solteiro(a)",
      birth_place: client.birth_place || "",
      address: client.address || "",
      city: client.city || "Luanda",
      country: client.country || "Angola",
      father_name: client.father_name || "",
      mother_name: client.mother_name || "",
      company_name: client.company_name || "",
    },
  })

  function onSubmit(values: ClientFormValues) {
    if (!company?.id) return;

    updateClient({
      companyId: company.id,
      clientId: client.id,
      data: values
    }, {
      onSuccess: () => {
        toast.success("Actualização concluída!")
        onOpenChange(false)
      },
      onError: (error: any) => {
        toast.error("Erro ao actualizar cliente", {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-5xl max-h-[92vh] overflow-hidden p-0 gap-0 shadow-2xl border-none">
        <DialogHeader className="p-8 pb-4 bg-muted/30">
          <DialogTitle className="text-3xl font-extrabold tracking-tight">Actualizar Cadastro</DialogTitle>
          <DialogDescription className="text-base">
            Modifique os dados cadastrais e as informações de contacto do cliente seleccionado.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <ScrollArea className="flex-1 max-h-[70vh] p-10 pt-4">
              <div className="space-y-8">
                <Tabs defaultValue="perfil" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1">
                    <TabsTrigger value="perfil" className="gap-2">
                      <User className="size-4" /> Perfil
                    </TabsTrigger>
                    <TabsTrigger value="identidade" className="gap-2">
                      <Fingerprint className="size-4" /> BI/NIF
                    </TabsTrigger>
                    <TabsTrigger value="origem" className="gap-2">
                      <MapPin className="size-4" /> Localização
                    </TabsTrigger>
                    <TabsTrigger value="estado" className="gap-2">
                      <Activity className="size-4" /> Estado
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="perfil" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel className="font-bold">Nome / Denominação *</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
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
                            <FormLabel className="font-bold">Email *</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="h-11" />
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
                            <FormLabel className="font-bold">Telemóvel *</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Profissão</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
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
                                  <SelectValue />
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
                    </div>
                  </TabsContent>

                  <TabsContent value="identidade" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nif"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">NIF (Número de Identificação Fiscal) *</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
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
                              <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="father_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Nome do Pai</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
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
                            <FormLabel className="font-bold">Nome da Mãe</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="origem" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Província</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue />
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
                          <FormItem>
                            <FormLabel className="font-bold">Morada Completa</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="estado" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Tipo de Entidade *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pf">Pessoa Singular</SelectItem>
                                <SelectItem value="pj">Pessoa Colectiva</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">Estado do Cadastro</FormLabel>
                            <Select
                              onValueChange={(val) => field.onChange(val === "active")}
                              defaultValue={field.value ? "active" : "inactive"}
                            >
                              <FormControl>
                                <SelectTrigger className="h-11">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                              </SelectContent>
                            </Select>
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-11 px-6">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="h-11 px-8 min-w-[150px]">
                {isPending ? "A processar..." : "Guardar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
