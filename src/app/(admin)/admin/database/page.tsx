"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Database, 
  HardDrive, 
  Download, 
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Activity
} from "lucide-react"

export default function DatabasePage() {
  const stats = [
    { label: "Tamanho Total", value: "45.2 GB", icon: HardDrive, color: "text-blue-500" },
    { label: "Tabelas", value: "87", icon: Database, color: "text-green-500" },
    { label: "Conexões Ativas", value: "23", icon: Activity, color: "text-orange-500" },
    { label: "Último Backup", value: "2h atrás", icon: CheckCircle2, color: "text-violet-500" }
  ]

  const tables = [
    { name: "users", rows: "12,543", size: "856 MB", lastModified: "2 min" },
    { name: "tenants", rows: "487", size: "124 MB", lastModified: "5 min" },
    { name: "cases", rows: "45,678", size: "3.2 GB", lastModified: "1 min" },
    { name: "documents", rows: "234,567", size: "28.4 GB", lastModified: "30 seg" },
    { name: "payments", rows: "8,945", size: "445 MB", lastModified: "10 min" }
  ]

  const backups = [
    { date: "25/01/2025 03:00", size: "44.8 GB", status: "completed", duration: "45 min" },
    { date: "24/01/2025 03:00", size: "44.2 GB", status: "completed", duration: "42 min" },
    { date: "23/01/2025 03:00", size: "43.9 GB", status: "completed", duration: "43 min" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banco de Dados</h1>
          <p className="text-muted-foreground">Monitore e gerencie o banco de dados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="size-4 mr-2" />
            Atualizar
          </Button>
          <Button>
            <Download className="size-4 mr-2" />
            Backup Manual
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`size-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Storage Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Uso de Armazenamento</CardTitle>
          <CardDescription>Distribuição do espaço em disco</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>45.2 GB de 100 GB usados</span>
              <span className="text-muted-foreground">45.2%</span>
            </div>
            <Progress value={45.2} className="h-2" />
          </div>
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-blue-500" />
              <span className="text-sm">Dados: 32.1 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-green-500" />
              <span className="text-sm">Índices: 8.4 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-orange-500" />
              <span className="text-sm">Logs: 4.7 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Tabelas Principais</CardTitle>
          <CardDescription>Estatísticas das principais tabelas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tables.map((table, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{table.name}</p>
                    <p className="text-sm text-muted-foreground">{table.rows} linhas</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{table.size}</p>
                    <p className="text-xs text-muted-foreground">Modificado há {table.lastModified}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Otimizar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Backups Recentes</CardTitle>
          <CardDescription>Histórico de backups automáticos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-green-500" />
                  <div>
                    <p className="font-medium">{backup.date}</p>
                    <p className="text-sm text-muted-foreground">Duração: {backup.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{backup.size}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="size-4 mr-2" />
                    Restaurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
