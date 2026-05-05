"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProcess } from "@/hooks/queries/use-process";
import { EditCaseDialog } from "./edit-case-dialog";
import { ArchiveCaseDialog } from "./archive-case-dialog";

interface CasesRowActionsProps {
  companyId: string;
  caseId: string;
}

export function CasesRowActions({ companyId, caseId }: CasesRowActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  
  // Carregar dados do processo para o dialog de edição
  const { data: caseData } = useProcess(companyId, caseId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${companyId}/cases/${caseId}`}>
              <Eye className="mr-2 size-4" />
              Ver detalhes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-destructive"
            onClick={() => setIsArchiveDialogOpen(true)}
          >
            <Trash2 className="mr-2 size-4" />
            Arquivar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de edição do processo */}
      {caseData && (
        <EditCaseDialog
          caseData={caseData}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}

      {/* Dialog de arquivamento do processo */}
      {caseData && (
        <ArchiveCaseDialog
          caseData={caseData}
          open={isArchiveDialogOpen}
          onOpenChange={setIsArchiveDialogOpen}
        />
      )}
    </>
  );
}
