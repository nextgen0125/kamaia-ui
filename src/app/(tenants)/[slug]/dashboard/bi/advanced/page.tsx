"use client"

import { HeatmapChart, FunnelChart, GaugeChart, ComparisonCards, ScatterPlot } from "@/components/bi/advanced-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Share2, BarChart3 } from "lucide-react"

export default function AdvancedBIPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análises Avançadas</h1>
          <p className="text-muted-foreground">
            Visualizações e insights detalhados do escritório
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ComparisonCards />
          
          <div className="grid gap-4 md:grid-cols-3">
            <GaugeChart title="Taxa de Conclusão" value={87} target={90} />
            <GaugeChart title="Satisfação do Cliente" value={4.5} target={5} unit="/5" />
            <GaugeChart title="Eficiência Operacional" value={82} target={85} />
          </div>

          <HeatmapChart data={[]} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Individual</CardTitle>
                <CardDescription>Métricas por advogado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dr. João Silva", score: 92 },
                    { name: "Dra. Maria Santos", score: 88 },
                    { name: "Dr. Pedro Costa", score: 85 },
                  ].map((lawyer) => (
                    <div key={lawyer.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{lawyer.name}</span>
                        <span className="font-bold">{lawyer.score}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                          style={{ width: `${lawyer.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produtividade Mensal</CardTitle>
                <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end justify-between gap-2">
                  {["Out", "Nov", "Dez", "Jan", "Fev", "Mar"].map((month, i) => {
                    const heights = [60, 70, 80, 85, 90, 95]
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-primary rounded-t relative group cursor-pointer"
                          style={{ height: `${heights[i]}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                            {heights[i]}% de eficiência
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{month}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FunnelChart />
            
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão por Canal</CardTitle>
                <CardDescription>Performance de aquisição</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { channel: "Indicação", rate: 45, leads: 120 },
                    { channel: "Site", rate: 28, leads: 85 },
                    { channel: "Redes Sociais", rate: 18, leads: 65 },
                    { channel: "Eventos", rate: 35, leads: 40 },
                  ].map((item) => (
                    <div key={item.channel} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.channel}</span>
                        <span className="text-muted-foreground">{item.leads} leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${item.rate}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{item.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <ScatterPlot />
          
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Risco</CardTitle>
              <CardDescription>Análise de processos por impacto e probabilidade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 h-[300px]">
                {/* High Impact */}
                <div className="row-span-1 border-2 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">5</span>
                  <span className="text-xs text-center">Alto Impacto</span>
                  <span className="text-xs text-center">Baixa Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">8</span>
                  <span className="text-xs text-center">Alto Impacto</span>
                  <span className="text-xs text-center">Média Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-red-600 bg-red-100 dark:bg-red-950/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-xs text-center">Alto Impacto</span>
                  <span className="text-xs text-center">Alta Prob.</span>
                </div>

                {/* Medium Impact */}
                <div className="row-span-1 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">7</span>
                  <span className="text-xs text-center">Médio Impacto</span>
                  <span className="text-xs text-center">Baixa Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-yellow-600 bg-yellow-100 dark:bg-yellow-950/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-xs text-center">Médio Impacto</span>
                  <span className="text-xs text-center">Média Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-orange-600 bg-orange-100 dark:bg-orange-950/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">6</span>
                  <span className="text-xs text-center">Médio Impacto</span>
                  <span className="text-xs text-center">Alta Prob.</span>
                </div>

                {/* Low Impact */}
                <div className="row-span-1 border-2 border-green-500 bg-green-50 dark:bg-green-950/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">10</span>
                  <span className="text-xs text-center">Baixo Impacto</span>
                  <span className="text-xs text-center">Baixa Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-green-600 bg-green-100 dark:bg-green-950/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">15</span>
                  <span className="text-xs text-center">Baixo Impacto</span>
                  <span className="text-xs text-center">Média Prob.</span>
                </div>
                <div className="row-span-1 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">9</span>
                  <span className="text-xs text-center">Baixo Impacto</span>
                  <span className="text-xs text-center">Alta Prob.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
