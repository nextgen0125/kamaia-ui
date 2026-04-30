"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Clock, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CasesRowActionsProps {
  companyId: string;
  caseId: string;
}

export function CasesRowActions({ companyId, caseId }: CasesRowActionsProps) {
  return (
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
        <DropdownMenuItem asChild>
          <Link href={`/${companyId}/cases/${caseId}/edit`}>
            <Edit className="mr-2 size-4" />
            Editar
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href={`/${companyId}/cases/${caseId}/timeline`}>
            <Clock className="mr-2 size-4" />
            Timeline
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 size-4" />
          Arquivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
