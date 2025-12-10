"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, FileText, FileSpreadsheet, File } from "lucide-react"
import { toast } from "sonner"

interface ExportDialogProps {
  title?: string
  description?: string
  dataType: "cases" | "clients" | "lawyers" | "transactions" | "documents"
  children?: React.ReactNode
}

export function ExportDialog({
  title = "Exportar Dados",
  description = "Escolha o formato e as opções de exportação",
  dataType,
  children,
}: ExportDialogProps) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState("pdf")
  const [dateRange, setDateRange] = useState("all")
  const [includeFields, setIncludeFields] = useState<string[]>([])

  const formats = [
    {
      id: "pdf",
      name: "PDF",
      description: "Documento formatado para impressão",
      icon: FileText,
    },
    {
      id: "excel",
      name: "Excel",
      description: "Planilha editável (XLSX)",
      icon: FileSpreadsheet,
    },
    {
      id: "csv",
      name: "CSV",
      description: "Valores separados por vírgula",
      icon: File,
    },
  ]

  const getAvailableFields = () => {
    const fieldsMap: Record<string, { label: string; value: string }[]> = {
      cases: [
        { label: "Número do processo", value: "number" },
        { label: "Cliente", value: "client" },
        { label: "Advogado responsável", value: "lawyer" },
        { label: "Status", value: "status" },
        { label: "Valor da causa", value: "value" },
        { label: "Data de início", value: "startDate" },
        { label: "Última atualização", value: "lastUpdate" },
        { label: "Área do direito", value: "area" },
      ],
      clients: [
        { label: "Nome", value: "name" },
        { label: "CPF/CNPJ", value: "document" },
        { label: "Email", value: "email" },
        { label: "Telefone", value: "phone" },
        { label: "Endereço", value: "address" },
        { label: "Processos ativos", value: "activeCases" },
        { label: "Data de cadastro", value: "registrationDate" },
      ],
      lawyers: [
        { label: "Nome", value: "name" },
        { label: "OAB", value: "oab" },
        { label: "Email", value: "email" },
        { label: "Telefone", value: "phone" },
        { label: "Especialidades", value: "specialties" },
        { label: "Casos ativos", value: "activeCases" },
        { label: "Taxa de sucesso", value: "successRate" },
      ],
      transactions: [
        { label: "Data", value: "date" },
        { label: "Tipo", value: "type" },
        { label: "Descrição", value: "description" },
        { label: "Valor", value: "amount" },
        { label: "Status", value: "status" },
        { label: "Cliente", value: "client" },
      ],
      documents: [
        { label: "Nome do arquivo", value: "name" },
        { label: "Tipo", value: "type" },
        { label: "Tamanho", value: "size" },
        { label: "Data de upload", value: "uploadDate" },
        { label: "Proprietário", value: "owner" },
        { label: "Processo relacionado", value: "case" },
      ],
    }

    return fieldsMap[dataType] || []
  }

  const handleExport = () => {
    // Aqui você implementaria a lógica real de exportação
    toast.success("Exportação iniciada!", {
      description: `Seu arquivo ${format.toUpperCase()} será baixado em instantes.`,
    })
    
    // Simulação de download
    setTimeout(() => {
      toast.success("Download concluído!", {
        description: `Arquivo exportado com sucesso.`,
      })
      setOpen(false)
    }, 2000)
  }

  const toggleField = (field: string) => {
    setIncludeFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    )
  }

  const selectAllFields = () => {
    const allFields = getAvailableFields().map((f) => f.value)
    setIncludeFields(allFields)
  }

  const deselectAllFields = () => {
    setIncludeFields([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label>Formato do arquivo</Label>
            <RadioGroup value={format} onValueChange={setFormat}>
              {formats.map((fmt) => {
                const Icon = fmt.icon
                return (
                  <div
                    key={fmt.id}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <RadioGroupItem value={fmt.id} id={fmt.id} />
                    <Label
                      htmlFor={fmt.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{fmt.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {fmt.description}
                        </div>
                      </div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <Label>Período</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os dados</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fields Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Campos a incluir</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAllFields}
                  className="text-xs"
                >
                  Selecionar todos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={deselectAllFields}
                  className="text-xs"
                >
                  Limpar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto p-2 border rounded-lg">
              {getAvailableFields().map((field) => (
                <div
                  key={field.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={field.value}
                    checked={includeFields.includes(field.value)}
                    onCheckedChange={() => toggleField(field.value)}
                  />
                  <label
                    htmlFor={field.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <Label>Opções adicionais</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="includeArchived" />
                <label
                  htmlFor="includeArchived"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Incluir registros arquivados
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="includeNotes" defaultChecked />
                <label
                  htmlFor="includeNotes"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Incluir anotações e observações
                </label>
              </div>
              {format === "pdf" && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeLogo" defaultChecked />
                  <label
                    htmlFor="includeLogo"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Incluir logotipo do escritório
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={includeFields.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Exportar {format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
