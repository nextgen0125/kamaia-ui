"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

import { DocumentsHeader } from "@/components/companies/documents/documents-header"
import { DocumentsStats } from "@/components/companies/documents/documents-stats"
import { DocumentsFolderList } from "@/components/companies/documents/documents-folder-list"
import { DocumentsList } from "@/components/companies/documents/documents-list"
import { DocumentsGrid } from "@/components/companies/documents/documents-grid"
import { DocumentsSearch } from "@/components/companies/documents/documents-search"
import { useDocuments } from "@/hooks/queries/documents/use-documents"

export default function DocumentPage() {
  const params = useParams()
  const companyId = params.company_id as string

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

  const { data: documents, isLoading } = useDocuments(companyId, {
    search: searchQuery,
    folder_id: selectedFolderId || undefined,
  })

  return (
    <div className="space-y-6 container mx-auto py-6">
      {/* Header */}
      <DocumentsHeader />

      {/* Stats Cards */}
      <DocumentsStats />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Sidebar - Folders */}
        <aside className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Pastas</CardTitle>
              <CardDescription>Gerencie seus diretórios</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentsFolderList
                selectedFolderId={selectedFolderId}
                onSelectFolder={setSelectedFolderId}
              />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content - Documents */}
        <main className="md:col-span-3 space-y-4">
          <Card className="min-h-[500px]">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>
                    {selectedFolderId ? "Documentos da Pasta" : "Todos os Documentos"}
                  </CardTitle>
                  <CardDescription>
                    {documents?.length || 0} documento{documents?.length !== 1 ? "s" : ""} encontrado{documents?.length !== 1 ? "s" : ""}
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  <DocumentsSearch
                    searchValue={searchQuery}
                    onSearch={setSearchQuery}
                  />

                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none border-none h-9 w-9"
                    >
                      <Grid className="size-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="rounded-none border-none h-9 w-9"
                    >
                      <List className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-muted-foreground animate-pulse font-medium">Carregando documentos...</p>
                </div>
              ) : (
                <>
                  {viewMode === "list" ? (
                    <DocumentsList documents={documents || []} />
                  ) : (
                    <DocumentsGrid documents={documents || []} />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
