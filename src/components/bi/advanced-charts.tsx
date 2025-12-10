"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"

// Heatmap Component
export function HeatmapChart({ data }: { data: any[] }) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const hours = ["08h", "10h", "12h", "14h", "16h", "18h"]

  const getIntensity = (value: number) => {
    if (value === 0) return "bg-gray-100 dark:bg-gray-800"
    if (value < 3) return "bg-blue-200 dark:bg-blue-900"
    if (value < 6) return "bg-blue-400 dark:bg-blue-700"
    if (value < 9) return "bg-blue-600 dark:bg-blue-500"
    return "bg-blue-800 dark:bg-blue-300"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapa de Calor - Atividades</CardTitle>
        <CardDescription>Distribuição de tarefas por dia e horário</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-2 mb-2">
            <div className="w-12" />
            {hours.map((hour) => (
              <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
                {hour}
              </div>
            ))}
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex gap-2">
              <div className="w-12 text-xs flex items-center text-muted-foreground">{day}</div>
              {hours.map((_, hourIndex) => {
                const value = Math.floor(Math.random() * 12)
                return (
                  <div
                    key={hourIndex}
                    className={`flex-1 h-10 rounded ${getIntensity(value)} flex items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                    title={`${day} ${hours[hourIndex]}: ${value} tarefas`}
                  >
                    {value > 0 && value}
                  </div>
                )
              })}
            </div>
          ))}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>Menos</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-4 h-4 rounded ${getIntensity(i * 3)}`} />
              ))}
            </div>
            <span>Mais</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Funnel Chart Component
export function FunnelChart() {
  const stages = [
    { name: "Leads", value: 100, percentage: 100 },
    { name: "Consultas", value: 75, percentage: 75 },
    { name: "Propostas", value: 50, percentage: 50 },
    { name: "Negociação", value: 30, percentage: 30 },
    { name: "Fechamento", value: 20, percentage: 20 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Conversão</CardTitle>
        <CardDescription>Taxa de conversão de leads para clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stage.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stage.value}</span>
                  <Badge variant="secondary">{stage.percentage}%</Badge>
                </div>
              </div>
              <div className="relative h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-medium" style={{ width: `${stage.percentage}%` }}>
                {index < stages.length - 1 && (
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    -{stages[index].value - stages[index + 1].value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Gauge Chart Component
export function GaugeChart({ title, value, target, unit = "%" }: { title: string; value: number; target: number; unit?: string }) {
  const percentage = (value / target) * 100
  const rotation = (percentage / 100) * 180 - 90

  const getColor = () => {
    if (percentage >= 90) return "text-green-500"
    if (percentage >= 70) return "text-blue-500"
    if (percentage >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square max-w-[200px] mx-auto">
          <svg viewBox="0 0 200 120" className="w-full">
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-muted/20"
            />
            {/* Progress arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
              className={getColor()}
            />
            {/* Needle */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke="currentColor"
              strokeWidth="3"
              transform={`rotate(${rotation} 100 100)`}
              className={getColor()}
            />
            <circle cx="100" cy="100" r="5" fill="currentColor" className={getColor()} />
          </svg>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className={`text-3xl font-bold ${getColor()}`}>
              {value}{unit}
            </div>
            <div className="text-xs text-muted-foreground">Meta: {target}{unit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Comparison Cards
export function ComparisonCards() {
  const comparisons = [
    {
      title: "Receita vs Meta",
      current: 125000,
      target: 150000,
      previous: 98000,
      unit: "currency",
      icon: TrendingUp,
      status: "warning",
    },
    {
      title: "Processos Concluídos",
      current: 42,
      target: 50,
      previous: 38,
      unit: "number",
      icon: CheckCircle2,
      status: "success",
    },
    {
      title: "Tempo Médio de Resposta",
      current: 2.5,
      target: 2,
      previous: 3.2,
      unit: "hours",
      icon: Clock,
      status: "warning",
    },
  ]

  const formatValue = (value: number, unit: string) => {
    if (unit === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
      }).format(value)
    }
    if (unit === "hours") return `${value}h`
    return value
  }

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {comparisons.map((item) => {
        const Icon = item.icon
        const progress = getProgress(item.current, item.target)
        const growth = ((item.current - item.previous) / item.previous) * 100

        return (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {formatValue(item.current, item.unit)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Meta: {formatValue(item.target, item.unit)}
                  </span>
                  <span className="font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">vs. anterior</span>
                  <span className={growth > 0 ? "text-green-600" : "text-red-600"}>
                    {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Scatter Plot (simplified)
export function ScatterPlot() {
  const data = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 10,
    label: `Cliente ${i + 1}`,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Portfolio</CardTitle>
        <CardDescription>Valor do cliente vs Tempo de relacionamento</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] border rounded-lg p-4">
          {/* Axes */}
          <div className="absolute bottom-4 left-4 right-4 h-px bg-border" />
          <div className="absolute bottom-4 left-4 top-4 w-px bg-border" />
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 text-xs text-muted-foreground">0</div>
          <div className="absolute bottom-0 right-4 text-xs text-muted-foreground">
            Tempo (meses)
          </div>
          <div className="absolute top-0 left-0 text-xs text-muted-foreground -rotate-90 origin-left">
            Valor (R$)
          </div>

          {/* Data points */}
          {data.map((point, i) => (
            <div
              key={i}
              className="absolute bg-blue-500/60 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
              style={{
                left: `${point.x}%`,
                bottom: `${point.y}%`,
                width: `${point.size}px`,
                height: `${point.size}px`,
              }}
              title={point.label}
            />
          ))}

          {/* Quadrants */}
          <div className="absolute top-1/2 left-1/2 w-px h-1/2 bg-border/50" />
          <div className="absolute top-1/2 left-4 w-1/2 h-px bg-border/50" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-2 border rounded">
            <span className="font-medium">Q1:</span> Alto valor, baixo tempo
          </div>
          <div className="p-2 border rounded">
            <span className="font-medium">Q2:</span> Alto valor, alto tempo
          </div>
          <div className="p-2 border rounded">
            <span className="font-medium">Q3:</span> Baixo valor, baixo tempo
          </div>
          <div className="p-2 border rounded">
            <span className="font-medium">Q4:</span> Baixo valor, alto tempo
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
