"use client"

import { useParams } from "next/navigation"
import { useFolders, useDeleteFolder } from "@/hooks/queries/folders/use-folders"
import { Button } from "@/components/ui/button"
import { Folder, MoreHorizontal, Trash, FolderOpen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface DocumentsFolderListProps {
  selectedFolderId: string | null;
  onSelectFolder: (id: string | null) => void;
}

export function DocumentsFolderList({ selectedFolderId, onSelectFolder }: DocumentsFolderListProps) {
  const params = useParams()
  const companyId = params.company_id as string
  const { data: folders, isLoading } = useFolders(companyId)
  const deleteFolderMutation = useDeleteFolder()

  const handleDeleteFolder = async (folderId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta pasta? Documentos nesta pasta não serão excluídos, mas ficarão sem pasta.")) return;

    try {
      await deleteFolderMutation.mutateAsync({ companyId, folderId })
      toast.success("Pasta excluída com sucesso")
      if (selectedFolderId === folderId) {
        onSelectFolder(null)
      }
    } catch (error) {
      toast.error("Erro ao excluir pasta")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <Button
        variant={selectedFolderId === null ? "secondary" : "ghost"}
        className="w-full justify-start gap-2"
        onClick={() => onSelectFolder(null)}
      >
        <FolderOpen className={cn("size-4", selectedFolderId === null ? "text-primary" : "text-muted-foreground")} />
        Todos os Documentos
      </Button>

      {folders?.map((folder) => (
        <div key={folder.id} className="group flex items-center gap-1">
          <Button
            variant={selectedFolderId === folder.id ? "secondary" : "ghost"}
            className="flex-1 justify-start gap-2 overflow-hidden"
            onClick={() => onSelectFolder(folder.id)}
          >
            <Folder className={cn("size-4", selectedFolderId === folder.id ? "text-primary" : "text-muted-foreground")} />
            <span className="truncate">{folder.name}</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 p-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleDeleteFolder(folder.id)}
                className="text-destructive"
              >
                <Trash className="mr-2 size-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
