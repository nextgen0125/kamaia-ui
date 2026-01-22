"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Users, Plus } from "lucide-react"

export default function PermissionsPage() {
  const roles = [
    {
      name: "Super Admin",
      users: 2,
      description: "Acesso total ao sistema",
      permissions: ["all"]
    },
    {
      name: "Admin",
      users: 5,
      description: "Gerenciamento de tenants e usuários",
      permissions: ["manage_tenants", "manage_users", "view_analytics"]
    },
    {
      name: "Support",
      users: 8,
      description: "Suporte ao cliente",
      permissions: ["view_tenants", "view_users", "manage_tickets"]
    },
    {
      name: "Viewer",
      users: 3,
      description: "Apenas visualização",
      permissions: ["view_dashboard", "view_reports"]
    }
  ]

  const permissions = [
    { id: "manage_tenants", name: "Gerenciar Tenants", category: "Gestão" },
    { id: "manage_users", name: "Gerenciar Usuários", category: "Gestão" },
    { id: "manage_plans", name: "Gerenciar Planos", category: "Gestão" },
    { id: "view_analytics", name: "Ver Analytics", category: "Relatórios" },
    { id: "view_reports", name: "Ver Relatórios", category: "Relatórios" },
    { id: "manage_settings", name: "Gerenciar Configurações", category: "Sistema" },
    { id: "manage_database", name: "Gerenciar Banco de Dados", category: "Sistema" },
    { id: "view_logs", name: "Ver Logs", category: "Sistema" }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Permissões</h1>
          <p className="text-muted-foreground">Gerencie funções e permissões</p>
        </div>
        <Button>
          <Plus className="size-4 mr-2" />
          Nova Função
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="size-5" />
                    {role.name}
                  </CardTitle>
                  <CardDescription className="mt-2">{role.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Users className="size-3" />
                  {role.users}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Permissões:</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm, i) => (
                    <Badge key={i} variant="outline">{perm}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="outline" size="sm">Ver Usuários</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configurar Permissões</CardTitle>
          <CardDescription>Edite as permissões da função &quot;Admin&quot;</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Gestão", "Relatórios", "Sistema"].map((category) => (
              <div key={category}>
                <h3 className="font-semibold mb-3">{category}</h3>
                <div className="space-y-2 pl-4 border-l-2">
                  {permissions
                    .filter((p) => p.category === category)
                    .map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between py-2">
                        <label htmlFor={permission.id} className="text-sm cursor-pointer">
                          {permission.name}
                        </label>
                        <Switch id={permission.id} defaultChecked={category !== "Sistema"} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
