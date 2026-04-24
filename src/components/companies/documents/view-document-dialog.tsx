"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IDocument } from "@/interfaces/IDocument"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, FileText } from "lucide-react"

interface ViewDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: IDocument | null;
}

export function ViewDocumentDialog({ open, onOpenChange, document }: ViewDocumentDialogProps) {
  if (!document) return null

  const isImage = document.file_mimetype?.startsWith('image/')
  const isPDF = document.file_mimetype === 'application/pdf'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="truncate pr-8">{document.name}</DialogTitle>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" asChild>
                <a href={document.file_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4 mr-2" />
                    Abrir original
                </a>
             </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 w-full bg-muted/20 rounded-md overflow-hidden flex items-center justify-center p-4">
          {isImage ? (
            <img 
              src={document.file_url} 
              alt={document.name} 
              className="max-w-full max-h-full object-contain shadow-lg"
            />
          ) : isPDF ? (
            <iframe 
              src={`${document.file_url}#toolbar=0`} 
              className="w-full h-full border-none"
              title={document.name}
            />
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-muted p-8 rounded-full inline-block">
                <FileText className="size-16 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Visualização não disponível para este tipo de arquivo ({document.file_mimetype}).
              </p>
              <Button asChild>
                <a href={document.file_url} download={document.name}>
                    <Download className="size-4 mr-2" />
                    Baixar para ver
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
