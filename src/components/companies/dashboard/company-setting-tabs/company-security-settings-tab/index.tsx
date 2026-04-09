"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { TabsContent } from "@/components/ui/tabs"
import {
  Save,
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { Badge } from "@/components/ui/badge"

export default function CompanySecuritySettingsTab() {

  const [loading, setLoading] = useState(false)
  const {  } = useCompanyDashboardContext();

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success("Configurações salvas com sucesso!")
      setLoading(false)
    }, 1000)
  }



  return (
      <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança e Privacidade</CardTitle>
              <CardDescription>
                Configurações de segurança da conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticação de dois fatores (2FA)</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login com biometria</p>
                  <p className="text-sm text-muted-foreground">
                    Permitir login com impressão digital ou Face ID
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Sessões ativas</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Chrome - Windows</p>
                      <p className="text-xs text-muted-foreground">
                        São Paulo, Brasil • Ativo agora
                      </p>
                    </div>
                    <Badge variant="outline">Atual</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full">
                  Encerrar todas as sessões
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>
  )
}
