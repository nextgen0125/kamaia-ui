"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Activity, Key, TrendingUp, AlertTriangle } from "lucide-react"

export default function APIManagementPage() {
  const stats = [
    { label: "Requisições Hoje", value: "145,234", icon: Activity, color: "text-blue-500" },
    { label: "APIs Ativas", value: "23", icon: Globe, color: "text-green-500" },
    { label: "Taxa de Erro", value: "0.12%", icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Tempo Médio", value: "125ms", icon: TrendingUp, color: "text-violet-500" }
  ]

  const apiKeys = [
    {
      name: "Production API Key",
      key: "pk_live_••••••••••••••••",
      created: "01/01/2024",
      lastUsed: "Há 2 min",
      requests: "145K",
      status: "active"
    },
    {
      name: "Development API Key",
      key: "pk_test_••••••••••••••••",
      created: "01/01/2024",
      lastUsed: "Há 1 hora",
      requests: "23K",
      status: "active"
    },
    {
      name: "Legacy API Key",
      key: "pk_old_••••••••••••••••",
      created: "01/06/2023",
      lastUsed: "Há 30 dias",
      requests: "456K",
      status: "deprecated"
    }
  ]

  const endpoints = [
    { path: "/api/v1/tenants", method: "GET", requests: 45234, avgTime: "98ms" },
    { path: "/api/v1/users", method: "GET", requests: 34567, avgTime: "112ms" },
    { path: "/api/v1/cases", method: "POST", requests: 12345, avgTime: "245ms" },
    { path: "/api/v1/documents", method: "POST", requests: 8901, avgTime: "567ms" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Management</h1>
        <p className="text-muted-foreground">Gerencie APIs e chaves de acesso</p>
      </div>

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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>Gerencie as chaves de acesso à API</CardDescription>
            </div>
            <Button>
              <Key className="size-4 mr-2" />
              Nova Chave
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((key, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{key.name}</p>
                    <Badge variant={key.status === "active" ? "default" : "secondary"}>
                      {key.status === "active" ? "Ativa" : "Depreciada"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-mono">{key.key}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Criada em {key.created} • Último uso: {key.lastUsed} • {key.requests} requisições
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Revogar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints Mais Utilizados</CardTitle>
          <CardDescription>Performance dos principais endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{endpoint.method}</Badge>
                  <span className="font-mono text-sm">{endpoint.path}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Requisições: </span>
                    <span className="font-medium">{endpoint.requests.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tempo: </span>
                    <span className="font-medium">{endpoint.avgTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
