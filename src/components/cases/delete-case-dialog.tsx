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
import { toast } from "sonner"

interface DeleteCaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  case_: {
    id: number
    title: string
    number: string
  }
}

export function DeleteCaseDialog({ open, onOpenChange, case_ }: DeleteCaseDialogProps) {
  const handleDelete = () => {
    toast.success("Processo arquivado com sucesso!", {
      description: `${case_.title} foi arquivado.`,
    })
    console.log("Archiving case:", case_.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Arquivar Processo?</AlertDialogTitle>
          <AlertDialogDescription>
            O processo <strong>{case_.title}</strong> (Nº {case_.number}) será arquivado. 
            Você poderá restaurá-lo posteriormente se necessário.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-amber-600 hover:bg-amber-700">
            Arquivar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
