"use client";

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
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard";
import { useDeleteACLEntry } from "@/hooks/queries/use-company-acl";
import { ICompanyACL } from "@/interfaces/ICompanyACL";
import { useState } from "react";
import { toast } from "sonner";

// ─── Dialog: Confirmar remoção ────────────────────────────────────────────────

interface AlertRemoveMemberProps {
  member: ICompanyACL | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function AlertRemoveMember({ member, open, onOpenChange }: AlertRemoveMemberProps) {
  const { company, isLoading: isLoadingCompany } = useCompanyDashboardContext();
  const removeACL = useDeleteACLEntry();

  const handleConfirm = async () => {
    if (!member && !company) return
    
    try {
      await removeACL.mutateAsync({
        aclId: member?.id as string,
        companyId: company?.id as string
      })
      toast.success("Membro removido com sucesso!")
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      toast.error((error as any).message);
    }

  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover membro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem a certeza que pretende remover{" "}
            <strong>{member?.user?.full_name}</strong> da equipe? Esta acção não pode
            ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={removeACL.isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={removeACL.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {removeACL.isPending ? "A remover..." : "Remover"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
