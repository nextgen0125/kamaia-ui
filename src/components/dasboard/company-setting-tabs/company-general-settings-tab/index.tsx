"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  Save,
} from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"

export default function CompanyGeneralSettingTab() {

  const [loading, setLoading] = useState(false)
  const { company, isLoading, isError } = useCompanyDashboardContext();

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success("Configurações salvas com sucesso!")
      setLoading(false)
    }, 1000)
  }



  return (
     <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Escritório</CardTitle>
              <CardDescription>
                Dados básicos da sua organização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/kamaia_logo_preto.svg" />
                  <AvatarFallback>KM</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Alterar Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recomendado: 400x400px, PNG ou JPG
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome do Escritório</Label>
                  <Input
                    id="companyName"
                    placeholder="Silva & Associados"
                    defaultValue="Silva & Associados Advogados"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF</Label>
                  <Input
                    id="nif"
                    placeholder="00000000000000"
                    defaultValue="12.345.678/0001-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone Principal</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 0000-0000"
                    defaultValue="(11) 3456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Principal</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contato@escritorio.com"
                    defaultValue="contato@silvaassociados.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    placeholder="Rua, número, complemento, bairro, cidade - UF, CEP"
                    defaultValue="Av. Paulista, 1000 - Sala 1501, Bela Vista, São Paulo - SP, 01310-100"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="america-sao_paulo">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-sao_paulo">
                      (UTC-03:00) Brasília
                    </SelectItem>
                    <SelectItem value="america-manaus">
                      (UTC-04:00) Manaus
                    </SelectItem>
                    <SelectItem value="america-rio_branco">
                      (UTC-05:00) Rio Branco
                    </SelectItem>
                  </SelectContent>
                </Select>
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
