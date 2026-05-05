"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  File,
  Upload,
  X,
  Tag,
  Plus,
  FolderOpen,
  Link2,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { useAuth } from "@/contexts/auth-context"
import { useProcesses } from "@/hooks/queries/use-process"
import { useCreateDocument } from "@/hooks/queries/documents/use-documents"
import { useFolders } from "@/hooks/queries/folders/use-folders"

// ─── Constantes ───────────────────────────────────────────────────────────────

const MAX_FILE_SIZE_MB = 25
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/zip",
  "application/x-rar-compressed",
  "text/plain",
]

const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.zip,.rar,.txt"

// ─── Schema ───────────────────────────────────────────────────────────────────

const documentSchema = z.object({
  name: z.string().min(1, "Nome do documento é obrigatório."),
  folder_id: z.string().optional(),
  process_id: z.string().optional(),
  file: z
    .custom<FileList>()
    .refine((fl) => fl && fl.length > 0, "Selecione um ficheiro.")
    .refine(
      (fl) => !fl || fl[0]?.size <= MAX_FILE_SIZE_BYTES,
      `O ficheiro não pode exceder ${MAX_FILE_SIZE_MB} MB.`
    )
    .refine(
      (fl) => !fl || ACCEPTED_MIME_TYPES.includes(fl[0]?.type),
      "Formato de ficheiro não suportado."
    ),
})

type DocumentFormData = z.infer<typeof documentSchema>

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Devolve ícone e cor com base no MIME type do ficheiro.
 */
function getFileVisual(file: File): {
  Icon: React.ElementType
  color: string
  bg: string
} {
  const { type } = file

  if (type === "application/pdf")
    return { Icon: FileText, color: "text-red-500", bg: "bg-red-500/10" }
  if (type.startsWith("image/"))
    return { Icon: FileImage, color: "text-violet-500", bg: "bg-violet-500/10" }
  if (type.includes("spreadsheet") || type.includes("excel"))
    return { Icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-500/10" }
  if (type.includes("zip") || type.includes("rar"))
    return { Icon: FileArchive, color: "text-amber-500", bg: "bg-amber-500/10" }
  if (type.includes("word"))
    return { Icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" }

  return { Icon: File, color: "text-muted-foreground", bg: "bg-muted" }
}

/**
 * Sugere um nome de documento a partir do nome do ficheiro,
 * removendo a extensão e formatando.
 */
function suggestDocumentName(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")          // remove extensão
    .replace(/[-_]/g, " ")             // hífens/underscores → espaços
    .replace(/\b\w/g, (c) => c.toUpperCase()) // Title Case
    .trim()
}

// ─── Dropzone ─────────────────────────────────────────────────────────────────

interface DropzoneProps {
  onFileSelect: (file: File, fileList: FileList) => void
  selectedFile: File | null
  onClear: () => void
  error?: string
  disabled?: boolean
}

function Dropzone({ onFileSelect, selectedFile, onClear, error, disabled }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)

  const processFile = useCallback(
    (file: File, fileList: FileList) => {
      setDragError(null)

      if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
        setDragError("Formato não suportado. Use PDF, Word, Excel, imagem ou ZIP.")
        return
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setDragError(`O ficheiro excede o limite de ${MAX_FILE_SIZE_MB} MB.`)
        return
      }

      onFileSelect(file, fileList)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return

      const file = e.dataTransfer.files?.[0]
      if (file) processFile(file, e.dataTransfer.files)
    },
    [disabled, processFile]
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && e.target.files) processFile(file, e.target.files)
  }

  // ── Estado: ficheiro seleccionado ──────────────────────────────────────────
  if (selectedFile) {
    const { Icon, color, bg } = getFileVisual(selectedFile)

    return (
      <div
        className={cn(
          "relative flex items-center gap-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4",
          "transition-all duration-200"
        )}
      >
        {/* Ícone do tipo de ficheiro */}
        <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-lg", bg)}>
          <Icon className={cn("size-6", color)} />
        </div>

        {/* Info do ficheiro */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{selectedFile.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {formatBytes(selectedFile.size)}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground uppercase">
              {selectedFile.name.split(".").pop()}
            </span>
          </div>
        </div>

        {/* Indicador de OK */}
        <CheckCircle2 className="size-5 shrink-0 text-primary" />

        {/* Botão remover */}
        <button
          type="button"
          aria-label="Remover ficheiro"
          onClick={onClear}
          disabled={disabled}
          className={cn(
            "absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full",
            "bg-destructive text-destructive-foreground shadow-sm",
            "transition-opacity hover:opacity-80",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <X className="size-3" />
        </button>
      </div>
    )
  }

  // ── Estado: zona de drop vazia ─────────────────────────────────────────────
  return (
    <div className="space-y-1.5">
      <div
        role="button"
        tabIndex={0}
        aria-label="Área de upload de ficheiro"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-3",
          "rounded-xl border-2 border-dashed px-6 py-10",
          "transition-all duration-200 outline-none",
          // Idle
          "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5",
          // Dragging
          isDragging && "border-primary bg-primary/10 scale-[1.01]",
          // Error
          (error || dragError) && "border-destructive/50 bg-destructive/5",
          // Disabled
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {/* Ícone animado ao fazer drag */}
        <div
          className={cn(
            "flex size-14 items-center justify-center rounded-full border-2",
            "transition-all duration-200",
            isDragging
              ? "border-primary bg-primary text-primary-foreground scale-110"
              : "border-border bg-background text-muted-foreground"
          )}
        >
          <Upload
            className={cn(
              "size-6 transition-transform duration-200",
              isDragging && "-translate-y-0.5"
            )}
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragging ? "Solte aqui para fazer upload" : "Arraste e solte o ficheiro"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ou{" "}
            <span className="font-medium text-primary underline underline-offset-2">
              clique para seleccionar
            </span>
          </p>
        </div>

        {/* Formatos aceites */}
        <div className="flex flex-wrap justify-center gap-1">
          {["PDF", "Word", "Excel", "Imagem", "ZIP"].map((fmt) => (
            <span
              key={fmt}
              className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {fmt}
            </span>
          ))}
          <span className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
            máx. {MAX_FILE_SIZE_MB} MB
          </span>
        </div>
      </div>

      {/* Mensagem de erro */}
      {(error || dragError) && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {dragError ?? error}
        </p>
      )}

      {/* Input nativo oculto */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        className="sr-only"
        onChange={handleInputChange}
        disabled={disabled}
      />
    </div>
  )
}

// ─── Tag Input ────────────────────────────────────────────────────────────────

interface TagInputProps {
  tags: string[]
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
  disabled?: boolean
}

function TagInput({ tags, onAdd, onRemove, disabled }: TagInputProps) {
  const [value, setValue] = useState("")

  const handleAdd = () => {
    const trimmed = value.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed)
      setValue("")
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAdd()
              }
            }}
            placeholder="Adicionar tag e pressionar Enter"
            className="pl-8 text-sm"
            disabled={disabled}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAdd}
          disabled={disabled || !value.trim()}
          className="shrink-0"
          aria-label="Adicionar tag"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 px-2 py-1 text-xs font-normal"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                disabled={disabled}
                aria-label={`Remover tag ${tag}`}
                className="ml-0.5 opacity-60 hover:opacity-100 disabled:pointer-events-none"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

interface UploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDocumentDialog({ open, onOpenChange }: UploadDocumentDialogProps) {
  const { user } = useAuth()
  const params = useParams()
  const companyId = params.company_id as string

  const createDocumentMutation = useCreateDocument()
  const { data: folders } = useFolders(companyId)
  const { data: processesData } = useProcesses(companyId, { page: 1, take: 100 })

  const [tags, setTags] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: { name: "", folder_id: undefined, process_id: undefined },
  })

  const { formState: { errors, isSubmitting } } = form

  // ACL do utilizador para a empresa actual
  const aclData = useMemo(
    () => user?.company_acls?.find((acl) => acl.company_id === companyId),
    [user, companyId]
  )

  // ── Handlers do Dropzone ───────────────────────────────────────────────────

  const handleFileSelect = useCallback(
    (file: File, fileList: FileList) => {
      setSelectedFile(file)
      form.setValue("file", fileList, { shouldValidate: true })

      // Preenche o nome automaticamente se ainda estiver vazio
      if (!form.getValues("name")) {
        form.setValue("name", suggestDocumentName(file.name), { shouldValidate: false })
      }
    },
    [form]
  )

  const handleFileClear = useCallback(() => {
    setSelectedFile(null)
    form.setValue("file", undefined as any)
    form.clearErrors("file")
  }, [form])

  // ── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = async (data: DocumentFormData) => {
    if (!aclData?.id) {
      toast.error("Não foi possível identificar o seu acesso.")
      return
    }

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("company_acl_id", aclData.id)
    if (data.folder_id && data.folder_id !== "none") formData.append("folder_id", data.folder_id)
    if (data.process_id && data.process_id !== "none") formData.append("process_id", data.process_id)
    if (tags.length > 0) formData.append("tags", tags.join(","))
    if (data.file?.[0]) formData.append("file", data.file[0])

    try {
      await createDocumentMutation.mutateAsync({ companyId, formData })
      toast.success("Documento enviado com sucesso!")
      handleReset()
      onOpenChange(false)
    } catch {
      toast.error("Erro ao enviar documento. Tente novamente.")
    }
  }

  const handleReset = () => {
    form.reset()
    setTags([])
    setSelectedFile(null)
  }

  const handleClose = (value: boolean) => {
    if (!value) handleReset()
    onOpenChange(value)
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col gap-0 p-0 max-w-lg w-[95vw] max-h-[92vh]">

        {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
        <div className="flex items-start gap-4 border-b bg-muted/30 px-6 py-5 rounded-t-xl">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Upload className="size-5" />
          </div>
          <div>
            <DialogTitle className="text-base font-semibold">
              Fazer Upload de Documento
            </DialogTitle>
            <DialogDescription className="text-xs mt-0.5">
              Arraste o ficheiro ou clique para seleccionar. Máx. {MAX_FILE_SIZE_MB} MB.
            </DialogDescription>
          </div>
        </div>

        {/* ── Corpo com scroll ───────────────────────────────────────────── */}
        <Form {...form}>
          <form
            id="upload-document-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {/* Dropzone */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  Ficheiro <span className="text-destructive">*</span>
                </Label>
                <Dropzone
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onClear={handleFileClear}
                  error={errors.file?.message as string}
                  disabled={isSubmitting}
                />
              </div>

              <Separator />

              {/* Nome do documento */}
              <FormField
                control={form.control}
                name="name"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nome do Documento <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Contrato de Prestação de Serviços"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pasta e Processo lado a lado */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="folder_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm">
                        <FolderOpen className="size-3.5 text-muted-foreground" />
                        Pasta
                        <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nenhuma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          {folders?.map((f) => (
                            <SelectItem key={f.id} value={f.id}>
                              {f.name}
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
                  name="process_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 text-sm">
                        <Link2 className="size-3.5 text-muted-foreground" />
                        Processo
                        <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nenhum" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">Nenhum</SelectItem>
                          {processesData?.processes?.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.title || p.process_number || "Processo"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  Tags
                  <span className="ml-1.5 text-muted-foreground font-normal text-xs">(opcional)</span>
                </Label>
                <TagInput
                  tags={tags}
                  onAdd={(tag) => setTags((prev) => [...prev, tag])}
                  onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* ── Footer fixo ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-3 border-t bg-muted/20 px-6 py-4 rounded-b-xl">
              <p className="text-xs text-muted-foreground">
                Campos com <span className="text-destructive">*</span> são obrigatórios
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleClose(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  form="upload-document-form"
                  size="sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-3.5 animate-spin" />
                      A enviar...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 size-3.5" />
                      Fazer Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}