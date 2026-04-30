"use client"

/**
 * CaseFormBody.tsx
 *
 * Componente partilhado do formulário de criação/edição de processos.
 * Elimina duplicação entre CreateCaseDialog e EditCaseDialog.
 *
 * Campos incluídos:
 * - Dados Básicos: título, número do processo, descrição, área legal, objeto
 * - Tribunal: tipo de justiça, tribunal/fórum, jurisdição
 * - Controle: status, prioridade, instância
 * - Financeiro: valor da causa, valor da sentença
 * - Datas: data de distribuição
 * - Partes: cliente e advogado responsável
 * - Acesso: tipo de acesso ao processo
 */

import { useForm } from "react-hook-form"
import {
  BookOpen,
  Building2,
  Calendar,
  Gavel,
  Scale,
  User,
  Users,
  Lock,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ILegalArea } from "@/interfaces/IProcess"
import { ProcessFormValues } from "@/schemas/process-schema"

// ─── Cabeçalho de secção ──────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: React.ElementType
  title: string
  description?: string
}

function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3 pb-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-none">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────

const TABS = [
  { value: "basic", label: "Dados Básicos", icon: BookOpen, step: 1 },
  { value: "tribunal", label: "Tribunal", icon: Gavel, step: 2 },
  { value: "parties", label: "Partes", icon: Users, step: 3 },
  { value: "control", label: "Controle", icon: Scale, step: 4 },
] as const

type TabValue = (typeof TABS)[number]["value"]

interface StepTabsListProps {
  errorsPerTab: Record<TabValue, boolean>
}

function StepTabsList({ errorsPerTab }: StepTabsListProps) {
  return (
    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 gap-1">
      {TABS.map(({ value, label, icon: Icon, step }) => (
        <TabsTrigger
          key={value}
          value={value}
          className={cn(
            "relative flex flex-col items-center gap-1 py-2.5 px-2 text-xs font-medium transition-all",
            "data-[state=active]:shadow-sm"
          )}
        >
          {/* Indicador de erro por tab */}
          {errorsPerTab[value] && (
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
          )}

          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                "bg-muted text-muted-foreground",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              )}
            >
              {step}
            </span>
            <Icon className="size-3.5" />
          </div>

          <span className="hidden sm:block leading-none">{label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  )
}

// ─── Corpo do Formulário ──────────────────────────────────────────────────

interface CaseFormBodyProps {
  form: ReturnType<typeof useForm<ProcessFormValues>>
  isPending: boolean
  clients: { id: string; name: string }[]
  lawyers: { id: string; name: string }[]
  isLoadingClients?: boolean
  isLoadingLawyers?: boolean
}

export function CaseFormBody({
  form,
  isPending,
  clients,
  lawyers,
  isLoadingClients,
  isLoadingLawyers,
}: CaseFormBodyProps) {
  // Detecta erros por tab para o step indicator
  const errors = form.formState.errors

  const errorsPerTab: Record<TabValue, boolean> = {
    basic: !!(
      errors.title ||
      errors.process_number ||
      errors.description ||
      errors.legal_area ||
      errors.object
    ),
    tribunal: !!(errors.court || errors.court_type || errors.jurisdiction),
    parties: !!(errors.client_id || errors.company_acl_id),
    control: !!(
      errors.status ||
      errors.priority ||
      errors.instance ||
      errors.case_value ||
      errors.sentence_value ||
      errors.access ||
      errors.distributed_in
    ),
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <StepTabsList errorsPerTab={errorsPerTab} />

      {/* ── Tab 1: Dados Básicos ──────────────────────────────────────────── */}
      <TabsContent value="basic" className="mt-5 space-y-5">
        <SectionHeader
          icon={Gavel}
          title="Identificação do Processo"
          description="Número oficial e informações de identificação"
        />

        <div className="grid gap-4 sm:grid-cols-1">
          {/* <FormField
            control={form.control}
            name="process_number"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Processo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0000000-00.0000.0.00.0000"
                    className="font-mono text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Formato CNJ (opcional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="legal_area"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Área Legal <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área legal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(ILegalArea).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Selecione a área do direito
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <SectionHeader
          icon={BookOpen}
          title="Descrição e Objeto"
          description="Título, assunto e detalhes processuais"
        />

        <FormField
          control={form.control}
          name="title"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Título / Assunto
                <span className="ml-1 text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Ação de Indenização por Danos Morais"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="object"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Objeto / Assunto Principal
                <span className="ml-1 text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Homicídio, Rescisão Contratual, etc."
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Assunto ou tipo de causa do processo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os factos, circunstâncias e o pedido principal do processo..."
                  className="min-h-[90px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>

      {/* ── Tab 2: Tribunal ───────────────────────────────────────────────── */}
      <TabsContent value="tribunal" className="mt-5 space-y-5">
        <SectionHeader
          icon={Gavel}
          title="Informações do Tribunal"
          description="Ramo da justiça, tribunal e jurisdição"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="court_type"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ramo da Justiça <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Federal">
                      <span className="flex items-center gap-2">
                        <Building2 className="size-3.5 text-blue-500" />
                        Justiça Federal
                      </span>
                    </SelectItem>
                    <SelectItem value="Estadual">
                      <span className="flex items-center gap-2">
                        <Building2 className="size-3.5 text-emerald-500" />
                        Justiça Estadual
                      </span>
                    </SelectItem>
                    <SelectItem value="Trabalho">
                      <span className="flex items-center gap-2">
                        <Building2 className="size-3.5 text-orange-500" />
                        Justiça do Trabalho
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="court"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fórum / Tribunal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Tribunal Provincial de Luanda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="jurisdiction"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jurisdição / Comarca</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Comarca de Luanda"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Área de jurisdição da corte
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>

      {/* ── Tab 3: Partes ─────────────────────────────────────────────────── */}
      <TabsContent value="parties" className="mt-5 space-y-5">
        <SectionHeader
          icon={Users}
          title="Partes Envolvidas"
          description="Cliente representado e advogado responsável"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="client_id"
            disabled={isPending || isLoadingClients}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5">
                  <User className="size-3.5 text-muted-foreground" />
                  Cliente <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingClients ? "A carregar..." : "Selecione o cliente"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">
                        Nenhum cliente encontrado
                      </div>
                    ) : (
                      clients.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_acl_id"
            disabled={isPending || isLoadingLawyers}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5">
                  <Scale className="size-3.5 text-muted-foreground" />
                  Advogado Responsável <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingLawyers ? "A carregar..." : "Selecione o advogado"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lawyers.length === 0 ? (
                      <div className="py-4 text-center text-xs text-muted-foreground">
                        Nenhum advogado encontrado
                      </div>
                    ) : (
                      lawyers.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg border border-dashed bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Nota:</strong> O cliente
            seleccionado será registado como parte envolvida no processo. O
            advogado responsável terá acesso completo ao processo e receberá
            notificações de actualizações.
          </p>
        </div>
      </TabsContent>

      {/* ── Tab 4: Controle ───────────────────────────────────────────────── */}
      <TabsContent value="control" className="mt-5 space-y-5">
        <SectionHeader
          icon={Scale}
          title="Status, Prioridade e Instância"
          description="Estado actual, urgência e nível de procedimento"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="status"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Status <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-blue-500 shrink-0" />
                        Em Andamento
                      </span>
                    </SelectItem>
                    <SelectItem value="pending">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-amber-500 shrink-0" />
                        Aguardando
                      </span>
                    </SelectItem>
                    <SelectItem value="completed">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
                        Concluído
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Prioridade <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-slate-400 shrink-0" />
                        Baixa
                      </span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-amber-500 shrink-0" />
                        Média
                      </span>
                    </SelectItem>
                    <SelectItem value="high">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-red-500 shrink-0" />
                        Alta
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instance"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Instância <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseInt(e.target.value, 10) : ""
                      )
                    }
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Nível de procedimento (1ª, 2ª, 3ª instância, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <SectionHeader
          icon={Calendar}
          title="Dados Financeiros"
          description="Valores da causa e sentença"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="case_value"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor da Causa <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                      AOA
                    </span>
                    <Input
                      type="number"
                      placeholder="0,00"
                      className="pl-12"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : 0
                        )
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Valor em Kwanzas (AOA)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sentence_value"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Valor da Sentença <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                      AOA
                    </span>
                    <Input
                      type="number"
                      placeholder="0,00"
                      className="pl-12"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseFloat(e.target.value) : 0
                        )
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Valor sentenciado ou estimado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <SectionHeader
          icon={Calendar}
          title="Datas e Acesso"
          description="Data de distribuição e nível de acesso"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="distributed_in"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data de Distribuição <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Data de início ou distribuição do processo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="access"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nível de Acesso <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="private">
                      <span className="flex items-center gap-2">
                        <Lock className="size-3.5 text-red-500" />
                        Privado
                      </span>
                    </SelectItem>
                    <SelectItem value="public">
                      <span className="flex items-center gap-2">
                        <Users className="size-3.5 text-emerald-500" />
                        Público
                      </span>
                    </SelectItem>
                    <SelectItem value="involved">
                      <span className="flex items-center gap-2">
                        <User className="size-3.5 text-blue-500" />
                        Partes Envolvidas
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Quem pode visualizar este processo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
