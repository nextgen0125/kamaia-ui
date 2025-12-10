"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileText,
  Search,
  Download,
  Eye,
  Filter,
  File,
  Folder,
} from "lucide-react"

const mockDocuments = [
  {
    id: "1",
    name: "Petição Inicial.pdf",
    type: "Petição",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024",
    size: "2.5 MB",
    date: "2024-01-15",
    category: "peticao",
  },
  {
    id: "2",
    name: "Procuração.pdf",
    type: "Procuração",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024",
    size: "450 KB",
    date: "2024-01-15",
    category: "procuracao",
  },
  {
    id: "3",
    name: "Contracheques 2022-2024.pdf",
    type: "Documento",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024",
    size: "3.2 MB",
    date: "2024-03-10",
    category: "documento",
  },
  {
    id: "4",
    name: "Contestação.pdf",
    type: "Contestação",
    case: "Ação Trabalhista - Horas Extras",
    caseNumber: "0001234-56.2024",
    size: "1.8 MB",
    date: "2024-03-01",
    category: "contestacao",
  },
  {
    id: "5",
    name: "Decisão Judicial.pdf",
    type: "Decisão",
    case: "Revisão Contratual",
    caseNumber: "0002345-67.2024",
    size: "1.5 MB",
    date: "2024-03-01",
    category: "decisao",
  },
]

export default function CustomerDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.case]) {
      acc[doc.case] = []
    }
    acc[doc.case].push(doc)
    return acc
  }, {} as Record<string, typeof mockDocuments>)

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Documentos</h1>
        <p className="text-muted-foreground">Acesse todos os documentos dos seus processos</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDocuments.length}</div>
            <p className="text-xs text-muted-foreground">documentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Petições</CardTitle>
            <File className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.filter((d) => d.category === "peticao").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Decisões</CardTitle>
            <File className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.filter((d) => d.category === "decisao").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(groupedDocuments).length}</div>
            <p className="text-xs text-muted-foreground">com documentos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todos os Documentos</CardTitle>
              <CardDescription>{filteredDocuments.length} documentos encontrados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="peticao">Petições</SelectItem>
                <SelectItem value="procuracao">Procurações</SelectItem>
                <SelectItem value="contestacao">Contestações</SelectItem>
                <SelectItem value="decisao">Decisões</SelectItem>
                <SelectItem value="documento">Outros Documentos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedDocuments).map(([caseName, docs]) => (
              <div key={caseName}>
                <div className="flex items-center gap-2 mb-3">
                  <Folder className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{caseName}</h3>
                  <Badge variant="secondary">{docs.length}</Badge>
                </div>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{formatDate(doc.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
