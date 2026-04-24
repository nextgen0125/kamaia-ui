"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Folder, FileUp, Database } from "lucide-react"
import { useParams } from "next/navigation"
import { useCompanyKPIs } from "@/hooks/queries/use-companies"
import { Skeleton } from "@/components/ui/skeleton"

export function DocumentsStats() {
  const params = useParams()
  const companyId = params.company_id as string
  const { data: stats, isLoading } = useCompanyKPIs(companyId, "dashboard")

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-2" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Formata bytes para humano
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const items = [
    {
      title: "Total de Documentos",
      value: (stats as any)?.totalDocuments || 0,
      description: "Todos os arquivos salvos",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Pastas",
      value: (stats as any)?.totalFolders || 0,
      description: "Organização do diretório",
      icon: Folder,
      color: "text-amber-500",
    },
    {
      title: "Este Mês",
      value: (stats as any)?.documentsThisMonth || 0,
      description: "Novos uploads",
      icon: FileUp,
      color: "text-green-500",
    },
    {
      title: "Armazenamento",
      value: formatBytes((stats as any)?.totalStorageUsed || 0),
      description: "Espaço total utilizado",
      icon: Database,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`size-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
