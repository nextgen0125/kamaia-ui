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
import { useCreateFolder } from "@/hooks/queries/folders/use-folders"
import { useCompanyACL } from "@/hooks/queries/use-company-acl"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { useMemo } from "react"

const folderSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type FolderFormData = z.infer<typeof folderSchema>

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFolderDialog({ open, onOpenChange }: CreateFolderDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const createFolderMutation = useCreateFolder()

  const { user } = useAuth();

  const aclData = useMemo(() => {
    return user?.company_acls?.find(acl => acl.company_id === companyId);
  }, [user, companyId]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FolderFormData>({
    resolver: zodResolver(folderSchema),
  })

  const onSubmit = async (data: FolderFormData) => {
    if (!aclData?.id) {
      toast.error("Não foi possível identificar seu acesso à empresa.")
      return
    }

    try {
      await createFolderMutation.mutateAsync({
        companyId,
        data: {
          ...data,
          company_acl_id: aclData?.id
        }
      })
      toast.success("Pasta criada com sucesso")
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao criar pasta")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Pasta</DialogTitle>
          <DialogDescription>
            Crie uma nova pasta para organizar seus documentos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Pasta</Label>
            <Input id="name" {...register("name")} placeholder="Ex: Contratos 2024" />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar Pasta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
