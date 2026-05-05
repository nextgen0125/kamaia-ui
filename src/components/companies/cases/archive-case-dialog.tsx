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
import { IProcess } from "@/interfaces/IProcess"
import { useArchiveProcess } from "@/hooks/queries/use-process"
import { useParams } from "next/navigation"
import { toast } from "sonner"

interface ArchiveCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  caseData: IProcess
}

export function ArchiveCaseDialog({
  open,
  onOpenChange,
  caseData,
}: ArchiveCaseDialogProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const archiveProcessMutation = useArchiveProcess()

  const handleArchive = async () => {
    if (!caseData) return

    try {
      await archiveProcessMutation.mutateAsync({
        companyId,
        processId: caseData.id,
      })
      toast.success("Processo arquivado com sucesso")
      onOpenChange(false)
    } catch {
      toast.error("Erro ao arquivar processo")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso arquivará permanentemente o processo <strong>{caseData?.title || caseData?.process_number}</strong>.
            O processo será movido para o arquivo e não será mais exibido na lista de processos activos.
            Esta ação não pode ser desfeita imediatamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={archiveProcessMutation.isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleArchive()
            }}
            disabled={archiveProcessMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {archiveProcessMutation.isPending ? "A arquivar..." : "Sim, Arquivar Processo"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
