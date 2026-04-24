"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { IDocument } from "@/interfaces/IDocument"
import { FileText, FileImage, FileVideo, FileArchive, File as FileIcon } from "lucide-react"
import { DocumentActionsDropdown } from "./document-actions-dropdown"
import { Badge } from "@/components/ui/badge"

interface DocumentsGridProps {
  documents: IDocument[];
}

export function DocumentsGrid({ documents }: DocumentsGridProps) {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'pdf': return <FileText className="size-16 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'svg': return <FileImage className="size-16 text-blue-500" />;
      case 'mp4':
      case 'mov': return <FileVideo className="size-16 text-purple-500" />;
      case 'zip':
      case 'rar': return <FileArchive className="size-16 text-amber-500" />;
      default: return <FileIcon className="size-16 text-gray-400" />;
    }
  };

  if (documents.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-muted-foreground">
        Nenhum documento encontrado.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="group relative overflow-hidden flex flex-col justify-between">
          <CardContent className="p-6 flex flex-col items-center justify-center">
             <div className="mb-4 transition-transform group-hover:scale-110">
                {getFileIcon(doc.name)}
             </div>
             <p className="text-sm font-medium text-center truncate w-full" title={doc.name}>
               {doc.name}
             </p>
          </CardContent>
          <CardFooter className="p-2 border-t flex items-center justify-between bg-muted/30">
            <div className="flex flex-wrap gap-0.5">
               {doc.tags?.split(',').slice(0, 1).map((tag) => (
                 <Badge key={tag} variant="secondary" className="px-1 py-0 text-[8px]">
                   {tag}
                 </Badge>
               ))}
               {doc.tags?.split(',').length > 1 && (
                  <Badge variant="outline" className="px-1 py-0 text-[8px]">
                    +{doc.tags.split(',').length - 1}
                  </Badge>
               )}
            </div>
            <DocumentActionsDropdown document={doc} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
