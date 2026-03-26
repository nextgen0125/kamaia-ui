"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, MoreVertical, Download, Eye, Trash2, File, FileText, Image, Video, Upload, Folder, FolderOpen, Grid, List } from "lucide-react"
import { UploadDocumentDialog } from "@/components/documents/upload-document-dialog"
import { CreateFolderDialog } from "@/components/documents/create-folder-dialog"

// Mock data
const documents = [
  {
    id: 1,
    name: "Petição Inicial - Ação Trabalhista.pdf",
    type: "pdf",
    size: "2.5 MB",
    folder: "Processos",
    case: "0001234-56.2024.8.26.0100",
    uploadedBy: "Dr. João Silva",
    uploadDate: "2024-03-15",
    tags: ["Petição", "Trabalhista"],
  },
  {
    id: 2,
    name: "Contrato Social - Tech Solutions.pdf",
    type: "pdf",
    size: "1.8 MB",
    folder: "Contratos",
    case: null,
    uploadedBy: "Dra. Maria Santos",
    uploadDate: "2024-03-14",
    tags: ["Contrato", "Empresarial"],
  },
  {
    id: 3,
    name: "Decisão Judicial.pdf",
    type: "pdf",
    size: "850 KB",
    folder: "Processos",
    case: "0002345-67.2024.8.26.0000",
    uploadedBy: "Dr. Pedro Costa",
    uploadDate: "2024-03-13",
    tags: ["Decisão", "Sentença"],
  },
  {
    id: 4,
    name: "Procuração - Carlos Mendes.pdf",
    type: "pdf",
    size: "450 KB",
    folder: "Clientes",
    case: null,
    uploadedBy: "Dr. João Silva",
    uploadDate: "2024-03-12",
    tags: ["Procuração"],
  },
]

const folders = [
  { id: 1, name: "Processos", count: 25, color: "blue" },
  { id: 2, name: "Contratos", count: 12, color: "green" },
  { id: 3, name: "Clientes", count: 18, color: "purple" },
  { id: 4, name: "Modelos", count: 8, color: "orange" },
]

export default function DocumentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFolder = !selectedFolder || doc.folder === selectedFolder

    return matchesSearch && matchesFolder
  })

  const stats = {
    total: documents.length,
    folders: folders.length,
    size: "25.8 GB",
    thisMonth: 8,
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="size-5 text-red-500" />
      case "image":
        return <Image className="size-5 text-blue-500" />
      case "video":
        return <Video className="size-5 text-purple-500" />
      default:
        return <File className="size-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os documentos do escritório
          </p>
        </div>
        <div className="flex gap-2">
          <CreateFolderDialog />
          <UploadDocumentDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
            <File className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Em {stats.folders} pastas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pastas</CardTitle>
            <Folder className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.folders}</div>
            <p className="text-xs text-muted-foreground">Organizadas por categoria</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espaço Usado</CardTitle>
            <Upload className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.size}</div>
            <p className="text-xs text-muted-foreground">De 100 GB disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
            <p className="text-xs text-muted-foreground">Novos documentos</p>
          </CardContent>
        </Card>
      </div>

      {/* Folders */}
      <Card>
        <CardHeader>
          <CardTitle>Pastas</CardTitle>
          <CardDescription>Organize seus documentos por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedFolder === folder.name ? "ring-2 ring-violet-500" : ""
                }`}
                onClick={() => setSelectedFolder(selectedFolder === folder.name ? null : folder.name)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    {selectedFolder === folder.name ? (
                      <FolderOpen className={`size-8 text-${folder.color}-500`} />
                    ) : (
                      <Folder className={`size-8 text-${folder.color}-500`} />
                    )}
                    <div>
                      <CardTitle className="text-base">{folder.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{folder.count} arquivos</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedFolder ? `Documentos - ${selectedFolder}` : "Todos os Documentos"}
              </CardTitle>
              <CardDescription>
                {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  className="pl-10 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="size-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <div className="space-y-2">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <File className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum documento encontrado</p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.folder}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 size-4" />
                          Baixar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredDocuments.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <File className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum documento encontrado</p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-all cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="size-16 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
                        {getFileIcon(doc.type)}
                      </div>
                      <CardTitle className="text-sm truncate" title={doc.name}>
                        {doc.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{doc.size}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-center gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
