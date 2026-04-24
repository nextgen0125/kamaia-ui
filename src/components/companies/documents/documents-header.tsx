"use client"

import { Button } from "@/components/ui/button"
import { FolderPlus, Upload } from "lucide-react"
import { useState } from "react"
import { CreateFolderDialog } from "./create-folder-dialog"
import { UploadDocumentDialog } from "./upload-document-dialog"

export function DocumentsHeader() {
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Documentos</h1>
        <p className="text-muted-foreground">
          Organize e visualize todos os documentos da sua empresa.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => setFolderDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <FolderPlus className="size-4" />
          Nova Pasta
        </Button>
        <Button 
          onClick={() => setUploadDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Upload className="size-4" />
          Fazer Upload
        </Button>
      </div>

      <CreateFolderDialog 
        open={folderDialogOpen} 
        onOpenChange={setFolderDialogOpen} 
      />
      <UploadDocumentDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </div>
  )
}
