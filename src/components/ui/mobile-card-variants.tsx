"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ============================================
// Variant 1: Profile Card (Lawyers, Clients)
// ============================================
interface ProfileCardProps {
  id: string | number
  name: string
  subtitle: string
  avatar?: string | null
  badges?: Array<{ label: string; variant?: "default" | "secondary" | "outline" | "destructive" }>
  stats?: Array<{ label: string; value: string | number }>
  actions?: ReactNode
  onClick?: () => void
  className?: string
}

export function ProfileCard({
  id,
  name,
  subtitle,
  avatar,
  badges,
  stats,
  actions,
  onClick,
  className,
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

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
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={avatar || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-base">{name}</div>
                <div className="text-sm text-muted-foreground">{subtitle}</div>
              </div>
            </div>
            {actions}
          </div>

          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge, idx) => (
                <Badge key={idx} variant={badge.variant || "secondary"} className="text-xs">
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-3 pt-2 border-t">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 2: Task Card (Tasks, Todos)
// ============================================
interface TaskCardProps {
  id: string | number
  title: string
  description?: string
  priority: "high" | "medium" | "low"
  status: string
  dueDate?: string
  assignee?: {
    name: string
    avatar?: string
  }
  tags?: string[]
  completed?: boolean
  actions?: ReactNode
  onToggle?: () => void
  onClick?: () => void
  className?: string
}

export function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  dueDate,
  assignee,
  tags,
  completed,
  actions,
  onToggle,
  onClick,
  className,
}: TaskCardProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        completed && "opacity-60",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start gap-3">
            {onToggle && (
              <input
                type="checkbox"
                checked={completed}
                onChange={onToggle}
                onClick={(e) => e.stopPropagation()}
                className="mt-1 size-4 rounded border-gray-300"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className={cn("font-medium text-sm", completed && "line-through")}>
                {title}
              </h3>
              {description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            {actions}
          </div>

          {/* Tags & Metadata */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={priorityColors[priority]} variant="secondary">
              {priority === "high" ? "Alta" : priority === "medium" ? "Média" : "Baixa"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {status}
            </Badge>
            {dueDate && (
              <span className="text-xs text-muted-foreground">
                📅 {dueDate}
              </span>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Assignee */}
          {assignee && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <Avatar className="size-6">
                <AvatarImage src={assignee.avatar} />
                <AvatarFallback className="text-xs">
                  {assignee.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{assignee.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 3: Case Card (Legal Cases, Projects)
// ============================================
interface CaseCardProps {
  id: string | number
  number: string
  title: string
  client: string
  status: string
  priority: "high" | "medium" | "low"
  phase?: string
  value?: number | string
  lastUpdate?: string
  actions?: ReactNode
  onClick?: () => void
  className?: string
}

export function CaseCard({
  id,
  number,
  title,
  client,
  status,
  priority,
  phase,
  value,
  lastUpdate,
  actions,
  onClick,
  className,
}: CaseCardProps) {
  const statusColors = {
    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  }

  const priorityIcons = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">{number}</span>
                <span>{priorityIcons[priority]}</span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Cliente: {client}</p>
            </div>
            {actions}
          </div>

          {/* Status & Phase */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge 
              className={statusColors[status as keyof typeof statusColors] || statusColors.pending} 
              variant="secondary"
            >
              {status === "active" ? "Em Andamento" : status === "pending" ? "Aguardando" : "Concluído"}
            </Badge>
            {phase && (
              <Badge variant="outline" className="text-xs">
                {phase}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
            <span>{lastUpdate ? `Atualizado ${lastUpdate}` : "—"}</span>
            {value && (
              <span className="font-semibold text-foreground">
                {typeof value === "number" ? `${value.toLocaleString()} AOA` : value}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// Variant 4: Compact List Item (Minimal)
// ============================================
interface CompactListItemProps {
  title: string
  subtitle?: string
  leftIcon?: ReactNode
  rightContent?: ReactNode
  badge?: { label: string; variant?: "default" | "secondary" | "outline" }
  onClick?: () => void
  className?: string
}

export function CompactListItem({
  title,
  subtitle,
  leftIcon,
  rightContent,
  badge,
  onClick,
  className,
}: CompactListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      {leftIcon && (
        <div className="flex-shrink-0 text-muted-foreground">
          {leftIcon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{title}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground truncate">{subtitle}</div>
        )}
      </div>
      {badge && (
        <Badge variant={badge.variant || "secondary"} className="text-xs flex-shrink-0">
          {badge.label}
        </Badge>
      )}
      {rightContent}
    </div>
  )
}
