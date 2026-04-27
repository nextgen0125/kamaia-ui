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
import { useDeleteClient } from "@/hooks/queries/clients/use-clients"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"

interface DeleteClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
}

export function DeleteClientDialog({ open, onOpenChange, clientId }: DeleteClientDialogProps) {
  const { company } = useCompanyDashboardContext()
  const { mutate: deleteClient, isPending } = useDeleteClient()

  const handleDelete = () => {
    if (!company?.id) return;

    deleteClient({
      companyId: company.id,
      clientId
    }, {
      onSuccess: () => {
        toast.success("Cliente desativado com sucesso!")
        onOpenChange(false)
      },
      onError: (error: any) => {
        toast.error("Erro ao desativar cliente", {
          description: error.response?.data?.message || error.message
        })
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação irá desativar o cliente no sistema. Ele deixará de aparecer nas listagens principais, mas seus dados permanecerão arquivados por segurança.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
                e.preventDefault();
                handleDelete();
            }} 
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isPending ? "Desativando..." : "Desativar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
