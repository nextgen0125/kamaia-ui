"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  Save,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { useCallback, useState } from "react"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { timezones } from "@/utils/timezones"
import { useUpdateCompany } from "@/hooks/queries/use-companies"
import { useParams } from "next/navigation"


// ─── Constants ───────────────────────────────────────────────────────────────

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"] as const
const MAX_FILE_SIZE_MB = 2
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// ─── Schema ──────────────────────────────────────────────────────────────────

const GeneralSettingsSchema = z.object({
  name: z
    .string()
    .min(1, "Nome do Escritório é obrigatório."),

  phone: z
    .string()
    .min(1, "Telemóvel é obrigatório."),

  email: z
    .string()
    .trim()
    .min(1, "Email é obrigatório.")
    .email("Digite um email válido.")
    .optional()
    .or(z.literal("")),

  nif: z
    .string()
    .trim()
    .min(1, "NIF é obrigatório.")
    .max(14, "O NIF deve conter no máximo 14 dígitos.")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .min(1, "Endereço é obrigatório.")
    .optional()
    .or(z.literal("")),

  time_zone: z
    .string()
    .trim()
    .min(1, "Fuso Horário é obrigatório.")
    .optional(),

  /**
   * Validação do ficheiro de logo:
   * - Aceita apenas JPG, JPEG e PNG
   * - Tamanho máximo de 2 MB
   * - Campo opcional (sem logo mantém o atual)
   */
  file: z
    .custom<FileList>()
    .optional()
    .superRefine((fileList, ctx) => {
      // Campo não preenchido — é opcional, passa directo
      if (!fileList || fileList.length === 0) return

      const file = fileList[0]

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Apenas imagens JPG, JPEG ou PNG são permitidas.",
        })
        return
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `O ficheiro não pode exceder ${MAX_FILE_SIZE_MB} MB.`,
        })
      }
    }),
})

type GeneralSettingsFormValues = z.infer<typeof GeneralSettingsSchema>

// ─── Component ───────────────────────────────────────────────────────────────

export default function CompanyGeneralSettingTab() {
  const { company, isLoading } = useCompanyDashboardContext()
  const updateCompany = useUpdateCompany(company?.id as string);

  /** URL de pré-visualização do logo seleccionado pelo utilizador */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(GeneralSettingsSchema),
    defaultValues: {
      name: company?.name ?? "",
      phone: company?.phone ?? "",
      email: company?.email ?? "",
      nif: company?.nif ?? "",
      address: company?.address ?? "",
      time_zone: company?.time_zone ?? "Africa/Luanda",
      file: undefined,
    },
  })

  // ─── Handlers ──────────────────────────────────────────────────────────────

  /**
   * Gera pré-visualização do ficheiro escolhido e passa a FileList ao React Hook Form.
   * Revoga o URL anterior para evitar memory leaks.
   */
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onChange: (...args: unknown[]) => void) => {
      const { files } = e.target

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }

      if (files && files.length > 0) {
        setPreviewUrl(URL.createObjectURL(files[0]))
      }

      // Passa a FileList ao RHF para que o Zod valide correctamente
      onChange(files)
    },
    [previewUrl],
  )

  /** Remove o ficheiro seleccionado e limpa a pré-visualização */
  const handleFileClear = useCallback(
    (onChange: (...args: unknown[]) => void) => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      onChange(undefined)
      form.clearErrors("file")
    },
    [previewUrl, form],
  )

  const handleSave = async (data: GeneralSettingsFormValues) => {
    

    console.log("Payload pronto para envio:", data)
    await updateCompany.mutateAsync(data as any)

    toast.success("Dados Gerais de Configurações Alterados com sucesso!")
  }

  // ─── Derived state ─────────────────────────────────────────────────────────

  const isFormLoading = isLoading || form.formState.isSubmitting
  const currentLogoSrc = previewUrl ?? (company?.logo_url || "/kamaia_logo_preto.svg")
  const watchedFile = form.watch("file")
  const hasNewFile = watchedFile && watchedFile.length > 0

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(handleSave)}
        noValidate
      >
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Escritório</CardTitle>
              <CardDescription>Dados básicos da sua organização</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* ── Logo ─────────────────────────────────────────────────── */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <Avatar className="h-40 w-40">
                    <AvatarImage src={currentLogoSrc} alt="Logo do escritório" />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>

                  {/* Botão de remoção do ficheiro seleccionado */}
                  {hasNewFile && (
                    <button
                      type="button"
                      aria-label="Remover logo seleccionado"
                      onClick={() =>
                        //@ts-ignore
                        handleFileClear(form.setValue.bind(null, "file", undefined as never))
                      }
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-opacity hover:opacity-80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Campo de ficheiro gerido pelo RHF */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value: _value, ref, ...rest } }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <Input
                          id="companyLogo"
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          className="sr-only"
                          disabled={isFormLoading}
                          ref={ref}
                          {...rest}
                          onChange={(e) => handleFileChange(e, onChange)}
                        />
                      </FormControl>

                      <div className="flex flex-col items-center gap-1">
                        <Label
                          htmlFor="companyLogo"
                          className={cn(
                            "flex cursor-pointer items-center rounded-sm bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-opacity",
                            isFormLoading && "pointer-events-none opacity-50",
                          )}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {hasNewFile ? "Alterar ficheiro" : "Alterar Logo"}
                        </Label>

                        <p className="text-xs text-muted-foreground">
                          JPG, JPEG ou PNG · máx. {MAX_FILE_SIZE_MB} MB · recomendado 400×400 px
                        </p>

                        {hasNewFile && (
                          <p className="text-xs font-medium text-green-600">
                            ✓ {(watchedFile as FileList)[0].name}
                          </p>
                        )}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* ── Campos de texto ───────────────────────────────────────── */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  disabled={isFormLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Escritório</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da Empresa / Escritório de Advocacia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nif"
                  disabled={isFormLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIF</FormLabel>
                      <FormControl>
                        <Input placeholder="00000000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  disabled={isFormLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="+244 999 999 999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  disabled={isFormLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Principal</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contato@escritorio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address"
                    disabled={isFormLoading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Completo</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Rua, número, complemento, bairro, cidade"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Fuso Horário ──────────────────────────────────────────── */}
              <FormField
                control={form.control}
                name="time_zone"
                disabled={isFormLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuso Horário</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isFormLoading}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* ── Acções ──────────────────────────────────────────────────── */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isFormLoading} className="cursor-pointer">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>
      </form>
    </Form>
  )
}
