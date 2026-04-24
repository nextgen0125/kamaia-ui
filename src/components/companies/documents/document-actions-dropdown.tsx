"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Download, Eye, Trash, FileEdit } from "lucide-react"
import { IDocument } from "@/interfaces/IDocument"
import { useState } from "react"
import { DeleteDocumentDialog } from "./delete-document-dialog"
import { ViewDocumentDialog } from "./view-document-dialog"
import { useParams } from "next/navigation"
import { useDownloadDocument } from "@/hooks/queries/documents/use-documents"
import { toast } from "sonner"

interface DocumentActionsDropdownProps {
  document: IDocument;
}

export function DocumentActionsDropdown({ document }: DocumentActionsDropdownProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  
  const downloadMutation = useDownloadDocument()

  const handleDownload = async () => {
    try {
      const data = await downloadMutation.mutateAsync({ 
        companyId, 
        id: document.id 
      })
      
      // Abre em nova aba para download/viz
      window.open(data.url, '_blank')
    } catch (error) {
      toast.error("Erro ao preparar download")
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <Eye className="mr-2 size-4" />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload}>
            <Download className="mr-2 size-4" />
            Baixar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setDeleteOpen(true)}
            className="text-destructive"
          >
            <Trash className="mr-2 size-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDocumentDialog 
        open={deleteOpen} 
        onOpenChange={setDeleteOpen} 
        document={document} 
      />
      
      <ViewDocumentDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        document={document}
      />
    </>
  )
}
