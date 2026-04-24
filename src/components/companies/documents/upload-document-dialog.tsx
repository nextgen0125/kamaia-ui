"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useParams } from "next/navigation"
import { useCreateDocument } from "@/hooks/queries/documents/use-documents"
import { useFolders } from "@/hooks/queries/folders/use-folders"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"
import { useProcesses } from "@/hooks/queries/use-process"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemo, useState } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

const documentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  folder_id: z.string().optional(),
  process_id: z.string().optional(),
  file: z.any()
    .refine((files) => files?.length > 0, "Arquivo é obrigatório"),
})

type DocumentFormData = z.infer<typeof documentSchema>

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDocumentDialog({ open, onOpenChange }: UploadDocumentDialogProps) {

  const { user } = useAuth();

  const params = useParams()
  const companyId = params.company_id as string
  const createDocumentMutation = useCreateDocument()

  const { data: folders } = useFolders(companyId)
  const { data: processesData } = useProcesses(companyId, { page: 1, take: 100 }) // Busca processos básicos

  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  })

  const aclData = useMemo(() => {
    return user?.company_acls?.find(acl => acl.company_id === companyId);
  }, [user, companyId]);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const onSubmit = async (data: DocumentFormData) => {
    if (!aclData?.id) {
      toast.error("Não foi possível identificar seu acesso.")
      return
    }

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("company_acl_id", aclData?.id)
    if (data.folder_id) formData.append("folder_id", data.folder_id)
    if (data.process_id) formData.append("process_id", data.process_id)
    if (tags.length > 0) formData.append("tags", tags.join(","))

    // Pega o primeiro arquivo
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0])
    }

    try {
      await createDocumentMutation.mutateAsync({
        companyId,
        formData
      })
      toast.success("Documento enviado com sucesso")
      reset()
      setTags([])
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao enviar documento")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Fazer Upload de Documento</DialogTitle>
          <DialogDescription>
            Escolha um arquivo e preencha as informações necessárias.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="file">Ficheiro</Label>
            <Input
              id="file"
              type="file"
              {...register("file")}
              className="cursor-pointer"
            />
            {errors.file && (
              <p className="text-xs text-destructive">{errors.file.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome do Documento</Label>
            <Input id="name" {...register("name")} placeholder="Ex: Contrato de Prestação de Serviços" />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pasta (Opcional)</Label>
              <Select onValueChange={(val) => setValue("folder_id", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {folders?.map(f => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Processo (Opcional)</Label>
              <Select onValueChange={(val) => setValue("process_id", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {processesData?.processes?.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.title || p.process_number || 'Processo'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Prescione Enter para adicionar"
              />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => (
                <Badge key={tag} className="gap-1 px-2 py-1">
                  {tag}
                  <X className="size-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Fazer Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
