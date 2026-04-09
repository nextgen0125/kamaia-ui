"use client"

import { Clock, Activity, AlertCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useAuditLogs } from "@/hooks/queries/useAuditLog"
import { IAuditLogAction, IAuditLogEntry } from "@/interfaces/IAuditLog"
import { ActivitySkeleton } from "@/components/ui/skeleton-cards"
import { ACTION_LABEL, resolveEntityLabel } from "@/utils/auditLogsHelpers"
import { formatTimeAgo } from "@/utils/formatDate"
import { useAuth } from "@/contexts/auth-context"
import { getUserAcl } from "@/utils/getUserAcl"


function getFullName(log: IAuditLogEntry): string {
  const user = log.company_acl?.user
  if (!user) return "Sistema"
  return `${user.firstName} ${user.lastName}`.trim()
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getAvatarSrc(log: IAuditLogEntry): string | undefined {
  const user = log.company_acl?.user
  if (user?.avatar_url) return user.avatar_url
  const name = getFullName(log)
  // Fallback para avatar gerado com iniciais (DiceBear — mesmo padrão do código original)
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
}



/**
 * Badge de cor por action — reforça visualmente o tipo de operação.
 */
export function ActionBadge({ action }: { action: IAuditLogAction }) {
  const map: Partial<Record<IAuditLogAction, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }>> = {
    [IAuditLogAction.CREATE]: { label: "Criação",    variant: "default"     },
    [IAuditLogAction.UPDATE]: { label: "Edição",     variant: "secondary"   },
    [IAuditLogAction.DELETE]: { label: "Remoção",    variant: "destructive" },
    [IAuditLogAction.LOGIN]:  { label: "Login",      variant: "outline"     },
    [IAuditLogAction.LOGOUT]: { label: "Logout",     variant: "outline"     },
    [IAuditLogAction.EXPORT]: { label: "Exportação", variant: "secondary"   },
  }

  const config = map[action]
  if (!config) return null

  return (
    <Badge variant={config.variant} className="text-[10px] px-1.5 py-0">
      {config.label}
    </Badge>
  )
}

// ─── Estado vazio ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Activity className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">Nenhuma actividade registada</p>
        <p className="mt-1 text-xs text-muted-foreground">
          As acções realizadas na plataforma aparecerão aqui.
        </p>
      </div>
    </div>
  )
}

// ─── Estado de erro ───────────────────────────────────────────────────────────

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-5 text-destructive" />
      </div>
      <div>
        <p className="text-sm font-medium">Erro ao carregar actividades</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Não foi possível obter os registos. Tente novamente.
        </p>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CardCompanyRecentActivities() {
  const { isLoading: isContextLoading, company } = useCompanyDashboardContext()
  const { user } = useAuth();

  const {
    isLoading: isAuditLogLoading,
    isError,
    data,
  } = useAuditLogs(company?.id as string, { page: 1, take: 5, company_acl_id: (getUserAcl(user?.company_acls, company?.id))?.id ?? '' })

  const isLoading = isContextLoading || isAuditLogLoading
  //@ts-ignore
  const logs: IAuditLogEntry[] = data?.audit_logs ?? []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Actividades Recentes</CardTitle>
            <CardDescription>Últimas acções realizadas na plataforma</CardDescription>
          </div>
          {!isLoading && (data?.total ?? 0) > 0 && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${company?.id}/audit-logs`}>
                Ver todas
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <ActivitySkeleton />
        ) : isError ? (
          <ErrorState />
        ) : logs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-5">
            {logs.map((log) => {
              const fullName = getFullName(log)
              const actionLabel = ACTION_LABEL[log.action] ?? log.action.toLowerCase()
              const entityLabel = resolveEntityLabel(log.entity_type)

              return (
                <div key={log.id} className="flex items-start gap-3">
                  <Avatar className="size-9 shrink-0">
                    <AvatarImage src={getAvatarSrc(log)} alt={fullName} />
                    <AvatarFallback className="text-xs font-semibold">
                      {getInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1 min-w-0">
                    {/* Linha principal: actor + verbo + entidade */}
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{fullName}</span>{" "}
                      <span className="text-muted-foreground">{actionLabel}</span>{" "}
                      <span className="font-medium text-violet-600 dark:text-violet-400">
                        {entityLabel}
                      </span>
                    </p>

                    {/* Detalhes opcionais vindos do campo `details` do backend */}
                    {log.details && (
                      <p className="text-xs text-muted-foreground truncate">
                        {log.details}
                      </p>
                    )}

                    {/* Rodapé: badge de acção + tempo relativo */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <ActionBadge action={log.action} />
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3 shrink-0" />
                        {formatTimeAgo(log.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}