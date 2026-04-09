"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { TabsContent } from "@/components/ui/tabs"
import {
    CreditCard,
  Download,
  Save,
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"

import { Badge } from "@/components/ui/badge"

export default function CompanyBillingSettingsTab() {

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
     <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plano e Faturamento</CardTitle>
              <CardDescription>
                Gerencie sua assinatura e pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Plano Atual</p>
                  <Badge>Professional</Badge>
                </div>
                <p className="text-2xl font-bold">199.000 AOA/mês</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Próxima cobrança em 15 de abril de 2024
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Método de pagamento</Label>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">
                        Expira em 12/2025
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Button variant="outline">
                    Ver histórico de faturas
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Baixar recibo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="default" className="w-full">
                  Fazer upgrade do plano
                </Button>
                <Button variant="outline" className="w-full text-destructive">
                  Cancelar assinatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
  )
}
