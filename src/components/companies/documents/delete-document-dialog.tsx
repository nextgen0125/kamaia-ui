"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IDocument } from "@/interfaces/IDocument"
import { useParams } from "next/navigation"
import { useDeleteDocument } from "@/hooks/queries/documents/use-documents"
import { toast } from "sonner"

interface DeleteDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: IDocument | null;
}

export function DeleteDocumentDialog({ open, onOpenChange, document }: DeleteDocumentDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const deleteDocumentMutation = useDeleteDocument()

  const handleDelete = async () => {
    if (!document) return

    try {
      await deleteDocumentMutation.mutateAsync({
        companyId,
        id: document.id
      })
      toast.success("Documento excluído com sucesso")
      onOpenChange(false)
    } catch (error) {
      toast.error("Erro ao excluir documento")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso excluirá permanentemente o arquivo <strong>{document?.name}</strong> do servidor.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteDocumentMutation.isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={deleteDocumentMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteDocumentMutation.isPending ? "Excluindo..." : "Sim, Excluir Documento"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
