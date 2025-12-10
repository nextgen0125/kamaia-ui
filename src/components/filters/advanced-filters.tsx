"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Filter, X, Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface FilterField {
  id: string
  label: string
  type: "text" | "select" | "multiselect" | "date" | "daterange" | "number"
  options?: { label: string; value: string }[]
}

interface AdvancedFiltersProps {
  fields: FilterField[]
  onApplyFilters: (filters: Record<string, any>) => void
  defaultValues?: Record<string, any>
}

export function AdvancedFilters({
  fields,
  onApplyFilters,
  defaultValues = {},
}: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<Record<string, any>>(defaultValues)
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const activeFiltersCount = Object.keys(filters).filter(
    (key) => filters[key] !== undefined && filters[key] !== ""
  ).length

  const handleFilterChange = (id: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    setOpen(false)
  }

  const handleClear = () => {
    setFilters({})
    setDateFrom(undefined)
    setDateTo(undefined)
    onApplyFilters({})
  }

  const removeFilter = (id: string) => {
    const newFilters = { ...filters }
    delete newFilters[id]
    setFilters(newFilters)
    onApplyFilters(newFilters)
  }

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            placeholder={`Digite ${field.label.toLowerCase()}`}
            value={filters[field.id] || ""}
            onChange={(e) => handleFilterChange(field.id, e.target.value)}
          />
        )

      case "select":
        return (
          <Select
            value={filters[field.id]}
            onValueChange={(value) => handleFilterChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Selecione ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "multiselect":
        const selectedValues = filters[field.id] || []
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter((v: string) => v !== option.value)
                    handleFilterChange(field.id, newValues)
                  }}
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters[field.id] && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters[field.id] ? (
                  format(new Date(filters[field.id]), "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters[field.id] ? new Date(filters[field.id]) : undefined}
                onSelect={(date) =>
                  handleFilterChange(field.id, date?.toISOString())
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )

      case "daterange":
        return (
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateFrom && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? (
                    format(dateFrom, "PPP", { locale: ptBR })
                  ) : (
                    <span>Data inicial</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={(date) => {
                    setDateFrom(date)
                    handleFilterChange(field.id, {
                      from: date?.toISOString(),
                      to: dateTo?.toISOString(),
                    })
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateTo && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? (
                    format(dateTo, "PPP", { locale: ptBR })
                  ) : (
                    <span>Data final</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={(date) => {
                    setDateTo(date)
                    handleFilterChange(field.id, {
                      from: dateFrom?.toISOString(),
                      to: date?.toISOString(),
                    })
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )

      case "number":
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Mínimo"
              value={filters[field.id]?.min || ""}
              onChange={(e) =>
                handleFilterChange(field.id, {
                  ...filters[field.id],
                  min: e.target.value,
                })
              }
            />
            <Input
              type="number"
              placeholder="Máximo"
              value={filters[field.id]?.max || ""}
              onChange={(e) =>
                handleFilterChange(field.id, {
                  ...filters[field.id],
                  max: e.target.value,
                })
              }
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null
            
            const field = fields.find((f) => f.id === key)
            if (!field) return null

            let displayValue = value
            if (Array.isArray(value)) {
              displayValue = `${value.length} selecionado(s)`
            } else if (typeof value === "object" && value.from) {
              displayValue = "Range"
            }

            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {field.label}: {displayValue.toString()}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter(key)}
                />
              </Badge>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-6 px-2 text-xs"
          >
            Limpar todos
          </Button>
        </div>
      )}

      {/* Filter Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filtros Avançados</SheetTitle>
            <SheetDescription>
              Refine sua busca usando os filtros abaixo
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                {renderField(field)}
              </div>
            ))}
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={handleClear}>
              Limpar
            </Button>
            <Button onClick={handleApply}>Aplicar Filtros</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
