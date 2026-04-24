"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IDocument } from "@/interfaces/IDocument"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { FileText, FileImage, FileVideo, FileArchive, File as FileIcon } from "lucide-react"
import { DocumentActionsDropdown } from "./document-actions-dropdown"
import { Badge } from "@/components/ui/badge"

interface DocumentsListProps {
  documents: IDocument[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  const formatBytes = (bytes: string) => {
    const b = parseInt(bytes) || 0;
    if (b === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'pdf': return <FileText className="size-8 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'svg': return <FileImage className="size-8 text-blue-500" />;
      case 'mp4':
      case 'mov': return <FileVideo className="size-8 text-purple-500" />;
      case 'zip':
      case 'rar': return <FileArchive className="size-8 text-amber-500" />;
      default: return <FileIcon className="size-8 text-gray-400" />;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Nome</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Desculpe, nenhum documento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center">
                       {getFileIcon(doc.name)}
                    </div>
                    <span className="truncate max-w-[300px]">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {doc.tags?.split(',').filter(Boolean).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {formatBytes(doc.file_size)}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(doc.created_at), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </TableCell>
                <TableCell className="text-right">
                  <DocumentActionsDropdown document={doc} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
