"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  MoreVertical,
  Search,
  Star,
  Clock,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

interface Template {
  id: string
  name: string
  description: string
  category: string
  content: string
  variables: string[]
  createdAt: string
  updatedAt: string
  usageCount: number
  favorite: boolean
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Petição Inicial Trabalhista",
    description: "Template para ações trabalhistas relacionadas a horas extras",
    category: "trabalhista",
    content: "Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a) de Direito...",
    variables: ["{{cliente_nome}}", "{{cliente_cpf}}", "{{valor_causa}}"],
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    usageCount: 45,
    favorite: true,
  },
  {
    id: "2",
    name: "Contestação Cível",
    description: "Modelo de contestação para processos cíveis",
    category: "civil",
    content: "Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a) de Direito...",
    variables: ["{{reu_nome}}", "{{processo_numero}}", "{{autor_nome}}"],
    createdAt: "2024-02-01",
    updatedAt: "2024-03-15",
    usageCount: 32,
    favorite: false,
  },
  {
    id: "3",
    name: "Procuração Ad Judicia",
    description: "Procuração para representação judicial",
    category: "procuracao",
    content: "PROCURAÇÃO AD JUDICIA...",
    variables: ["{{outorgante_nome}}", "{{outorgante_cpf}}", "{{advogado_nome}}", "{{advogado_oab}}"],
    createdAt: "2023-11-10",
    updatedAt: "2024-02-20",
    usageCount: 128,
    favorite: true,
  },
  {
    id: "4",
    name: "Recurso Ordinário",
    description: "Template de recurso ordinário trabalhista",
    category: "trabalhista",
    content: "RECURSO ORDINÁRIO...",
    variables: ["{{recorrente_nome}}", "{{processo_numero}}", "{{decisao_data}}"],
    createdAt: "2024-01-20",
    updatedAt: "2024-03-12",
    usageCount: 18,
    favorite: false,
  },
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const categories = [
    { value: "all", label: "Todas as categorias" },
    { value: "trabalhista", label: "Trabalhista" },
    { value: "civil", label: "Cível" },
    { value: "criminal", label: "Criminal" },
    { value: "familia", label: "Família" },
    { value: "empresarial", label: "Empresarial" },
    { value: "procuracao", label: "Procuração" },
    { value: "outros", label: "Outros" },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || template.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const favoriteTemplates = templates.filter((t) => t.favorite)
  const recentTemplates = [...templates].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5)

  const handleToggleFavorite = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t))
    )
    toast.success("Template atualizado!")
  }

  const handleDuplicate = (template: Template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Cópia)`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      usageCount: 0,
    }
    setTemplates((prev) => [newTemplate, ...prev])
    toast.success("Template duplicado com sucesso!")
  }

  const handleDelete = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id))
    toast.success("Template excluído com sucesso!")
  }

  const handleUseTemplate = (template: Template) => {
    toast.success(`Usando template: ${template.name}`)
    // Aqui você implementaria a lógica para usar o template
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie modelos de documentos jurídicos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Template</DialogTitle>
              <DialogDescription>
                Crie um modelo de documento reutilizável
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Template</Label>
                <Input id="name" placeholder="Ex: Petição Inicial Trabalhista" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.value !== "all").map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o propósito deste template"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  placeholder="Digite o conteúdo do template. Use {{variavel}} para campos dinâmicos."
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label>Variáveis Disponíveis</Label>
                <p className="text-xs text-muted-foreground">
                  Use as seguintes variáveis no conteúdo: &#123;&#123;cliente_nome&#125;&#125;, &#123;&#123;processo_numero&#125;&#125;, &#123;&#123;data_hoje&#125;&#125;
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast.success("Template criado com sucesso!")
                setIsCreateDialogOpen(false)
              }}>
                Criar Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favoriteTemplates.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Usado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...templates.map(t => t.usageCount))}
            </div>
            <p className="text-xs text-muted-foreground">usos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Copy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(templates.map(t => t.category)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">
              Todos ({filteredTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              Favoritos ({favoriteTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="recent">
              Recentes ({recentTemplates.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar templates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedTemplate(template)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {categories.find(c => c.value === template.category)?.label}
                      </Badge>
                      <Badge variant="outline">
                        {template.usageCount} usos
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Atualizado em {formatDate(template.updatedAt)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {template.variables.length} variáveis disponíveis
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Usar Template
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleToggleFavorite(template.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            template.favorite ? "fill-yellow-500 text-yellow-500" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoriteTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                {/* Same card content as above */}
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{selectedTemplate.name}</DialogTitle>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Categoria</Label>
                <p className="text-sm">
                  {categories.find(c => c.value === selectedTemplate.category)?.label}
                </p>
              </div>
              <div>
                <Label>Variáveis</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTemplate.variables.map((v) => (
                    <Badge key={v} variant="secondary">{v}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Conteúdo</Label>
                <div className="mt-2 p-4 border rounded-lg bg-muted/50 max-h-[300px] overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    {selectedTemplate.content}
                  </pre>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Fechar
              </Button>
              <Button onClick={() => {
                handleUseTemplate(selectedTemplate)
                setSelectedTemplate(null)
              }}>
                Usar Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
