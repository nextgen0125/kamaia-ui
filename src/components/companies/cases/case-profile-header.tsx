import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IProcess } from "@/interfaces/IProcess";
import { EditCaseDialog } from "./edit-case-dialog";
import { ArchiveCaseDialog } from "./archive-case-dialog";
import { useState } from "react";

interface CaseProfileHeaderProps {
  companyId: string;
  caseData: IProcess;
}

export function CaseProfileHeader({ companyId, caseData }: CaseProfileHeaderProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex items-start gap-4">
        <Button variant="outline" size="icon" asChild className="shrink-0 mt-1">
          <Link href={`/${companyId}/cases`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {caseData.title || "Detalhes do Processo"}
            </h1>
            <Badge variant="outline">{caseData.status || "Ativo"}</Badge>
          </div>
          <p className="text-muted-foreground font-mono flex items-center gap-2">
            <FileText className="size-4" />
            {caseData.process_number || "Sem número"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
          <Edit className="mr-2 size-4" />
          Editar Processo
        </Button>
        <Button variant="destructive" onClick={() => setIsArchiveDialogOpen(true)}>
          <Trash2 className="mr-2 size-4" />
          Arquivar
        </Button>
      </div>

      <EditCaseDialog 
        caseData={caseData} 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
      />
      
      <ArchiveCaseDialog
        caseData={caseData}
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
      />
    </div>
  );
}
