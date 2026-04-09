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

export default function CompanyNotificationsSettingTab() {

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
      <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Configure como você quer receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por email</p>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações importantes por email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de prazos</p>
                    <p className="text-sm text-muted-foreground">
                      Alertas para prazos que estão próximos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações de processos</p>
                    <p className="text-sm text-muted-foreground">
                      Notificar sobre mudanças em processos
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atividades da equipe</p>
                    <p className="text-sm text-muted-foreground">
                      Ser notificado sobre ações de outros membros
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resumo diário</p>
                    <p className="text-sm text-muted-foreground">
                      Receber resumo diário de atividades por email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
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
