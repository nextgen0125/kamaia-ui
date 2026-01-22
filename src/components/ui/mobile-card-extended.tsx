"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  FileText,
  Download,
  Eye,
  MoreVertical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ============================================
// Variant 5: FinancialCard (Transactions, Invoices)
// ============================================
interface FinancialCardProps {
  id: string | number
  type: "income" | "expense"
  category: string
  description: string
  amount: number
  date: string
  status?: "completed" | "pending" | "cancelled"
  client?: string
  actions?: ReactNode
  onClick?: () => void
  className?: string
}

export function FinancialCard({
  id,
  type,
  category,
  description,
  amount,
  date,
  status = "completed",
  client,
  actions,
  onClick,
  className,
}: FinancialCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const statusColors = {
    completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1">
              <div className={cn(
                "size-10 rounded-full flex items-center justify-center flex-shrink-0",
                type === "income" 
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {type === "income" ? (
                  <TrendingUp className="size-5" />
                ) : (
                  <TrendingDown className="size-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{description}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {category}
                  {client && ` • ${client}`}
                </div>
              </div>
            </div>
            {actions}
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {date}
              </Badge>
              <Badge className={statusColors[status]} variant="secondary">
                {status === "completed" ? "Pago" : status === "pending" ? "Pendente" : "Cancelado"}
              </Badge>
            </div>
            <div className={cn(
              "text-lg font-bold",
              type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {type === "income" ? "+" : "-"} {formatCurrency(amount)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 6: DocumentCard (Files, Folders)
// ============================================
interface DocumentCardProps {
  id: string | number
  name: string
  type: "folder" | "pdf" | "doc" | "image" | "other"
  size?: string
  modifiedDate: string
  owner?: string
  shared?: boolean
  favorite?: boolean
  actions?: ReactNode
  onClick?: () => void
  onDownload?: () => void
  className?: string
}

export function DocumentCard({
  id,
  name,
  type,
  size,
  modifiedDate,
  owner,
  shared,
  favorite,
  actions,
  onClick,
  onDownload,
  className,
}: DocumentCardProps) {
  const getIcon = () => {
    switch (type) {
      case "folder":
        return "📁"
      case "pdf":
        return "📄"
      case "doc":
        return "📝"
      case "image":
        return "🖼️"
      default:
        return "📎"
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "folder":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "pdf":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "doc":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "image":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="text-4xl">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeColor()} variant="secondary" className="text-xs">
                      {type.toUpperCase()}
                    </Badge>
                    {shared && (
                      <Badge variant="outline" className="text-xs">
                        🔗 Compartilhado
                      </Badge>
                    )}
                    {favorite && <span className="text-yellow-500">⭐</span>}
                  </div>
                </div>
                {actions}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {size && <span>{size}</span>}
              {size && <span>•</span>}
              <span>{modifiedDate}</span>
            </div>
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onDownload()
                }}
              >
                <Download className="size-3.5" />
              </Button>
            )}
          </div>
          {owner && (
            <div className="text-xs text-muted-foreground">
              Por: {owner}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 7: StatCard (Statistics, Metrics)
// ============================================
interface StatCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
    period?: string
  }
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  color?: "default" | "success" | "warning" | "danger"
  footer?: ReactNode
  onClick?: () => void
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend,
  color = "default",
  footer,
  onClick,
  className,
}: StatCardProps) {
  const colorClasses = {
    default: "from-violet-500 to-blue-500",
    success: "from-green-500 to-emerald-500",
    warning: "from-yellow-500 to-orange-500",
    danger: "from-red-500 to-pink-500",
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            {icon && (
              <div className={cn(
                "size-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white",
                colorClasses[color]
              )}>
                {icon}
              </div>
            )}
          </div>

          {/* Change Indicator */}
          {change && (
            <div className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded",
                change.type === "increase"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {change.type === "increase" ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
                <span>{Math.abs(change.value)}%</span>
              </div>
              {change.period && (
                <span className="text-xs text-muted-foreground">
                  vs {change.period}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="pt-2 border-t">
              {footer}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 8: ServiceCard (Services, Products)
// ============================================
interface ServiceCardProps {
  id: string | number
  name: string
  description?: string
  price: number
  duration?: string
  category?: string
  status: "active" | "inactive" | "draft"
  clients?: number
  revenue?: number
  actions?: ReactNode
  onClick?: () => void
  className?: string
}

export function ServiceCard({
  id,
  name,
  description,
  price,
  duration,
  category,
  status,
  clients,
  revenue,
  actions,
  onClick,
  className,
}: ServiceCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const statusColors = {
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base">{name}</div>
              {description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            {actions}
          </div>

          {/* Price & Duration */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-green-600" />
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatCurrency(price)}
              </span>
              {duration && (
                <span className="text-xs text-muted-foreground">/ {duration}</span>
              )}
            </div>
            <Badge className={statusColors[status]} variant="secondary">
              {status === "active" ? "Ativo" : status === "inactive" ? "Inativo" : "Rascunho"}
            </Badge>
          </div>

          {/* Category */}
          {category && (
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          )}

          {/* Stats */}
          {(clients !== undefined || revenue !== undefined) && (
            <div className="grid grid-cols-2 gap-3 pt-2 border-t">
              {clients !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold">{clients}</div>
                  <div className="text-xs text-muted-foreground">Clientes</div>
                </div>
              )}
              {revenue !== undefined && (
                <div className="text-center">
                  <div className="text-lg font-bold">{formatCurrency(revenue)}</div>
                  <div className="text-xs text-muted-foreground">Receita</div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
