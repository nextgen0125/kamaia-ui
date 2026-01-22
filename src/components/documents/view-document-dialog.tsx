"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, FileText, Folder, Calendar, User, Download, File } from "lucide-react"

interface ViewDocumentDialogProps {
  document: {
    id: number
    name: string
    type: string
    size: string
    folder: string
    case?: string | null
    uploadedBy: string
    uploadDate: string
    tags: string[]
  }
  trigger?: React.ReactNode
}

export function ViewDocumentDialog({ document, trigger }: ViewDocumentDialogProps) {
  const [open, setOpen] = useState(false)

  const getFileIcon = () => {
    switch (document.type) {
      case "pdf":
        return <FileText className="size-12 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="size-12 text-blue-500" />
      default:
        return <File className="size-12 text-gray-500" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Eye className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-lg bg-muted flex items-center justify-center">
              {getFileIcon()}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{document.name}</DialogTitle>
              <DialogDescription>
                {document.size} • {document.type.toUpperCase()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Informações do Documento */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3">
              <Folder className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Pasta</p>
                <p className="text-sm text-muted-foreground">{document.folder}</p>
              </div>
            </div>

            {document.case && (
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Processo Vinculado</p>
                  <p className="text-sm text-muted-foreground">{document.case}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <User className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Enviado por</p>
                <p className="text-sm text-muted-foreground">{document.uploadedBy}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data de Upload</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(document.uploadDate).toLocaleDateString("pt-AO", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Ações */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <Eye className="size-4 mr-2" />
              Visualizar
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="size-4 mr-2" />
              Baixar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
