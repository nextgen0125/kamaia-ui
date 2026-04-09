"use client"

import { useState } from "react"
import {
  FileText,
  AlertCircle,
  Activity,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { useAuditLogs } from "@/hooks/queries/useAuditLog"
import { IAuditLog } from "@/interfaces/IAuditLog"
import { ACTION_CONFIG, resolveEntityLabel } from "@/utils/auditLogsHelpers"
import { getAvatarSrc, getFullName } from "@/components/companies/dashboard/card-company-recent-activities"
import { formatTimeAgo } from "@/utils/formatDate"
import { getInitials } from "@/utils/getInitials"
import { ActivityFeedSkeleton } from "@/components/ui/skeleton-cards"

// ─── Constantes ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 8


// ─── Sub-componentes ──────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Activity className="size-6 text-muted-foreground" />
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

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" />
      </div>
      <div>
        <p className="text-sm font-medium">Erro ao carregar actividades</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Não foi possível obter os registos. Tente novamente mais tarde.
        </p>
      </div>
    </div>
  )
}

// ─── Item de actividade ───────────────────────────────────────────────────────

function ActivityItem({ log }: { log: IAuditLog }) {
  const config = ACTION_CONFIG[log.action] ?? {
    icon: FileText,
    color: "text-muted-foreground",
    bg: "bg-muted",
    label: log.action.toLowerCase(),
  }

  const Icon = config.icon
  const fullName = getFullName(log as any)
  const entityLabel = resolveEntityLabel(log.entity_type)

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
      {/* Ícone de acção */}
      <div className={`shrink-0 rounded-full p-2 ${config.bg}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 items-start justify-between gap-3 min-w-0">
        <div className="space-y-1 min-w-0">
          {/* Frase principal */}
          <p className="text-sm leading-snug">
            <span className="font-medium">{fullName}</span>{" "}
            <span className="text-muted-foreground">{config.label}</span>{" "}
            <span className="font-medium">{entityLabel}</span>
          </p>

          {/* Detalhes opcionais (campo `details` do backend) */}
          {log.details && (
            <p className="text-xs text-muted-foreground truncate max-w-xs">
              {log.details}
            </p>
          )}

          {/* Tempo relativo */}
          <p className="text-xs text-muted-foreground">
            {formatTimeAgo(log.created_at as any)}
          </p>
        </div>

        {/* Avatar do actor à direita + badge de acção */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <Avatar className="size-7">
            <AvatarImage src={getAvatarSrc(log as any)} alt={fullName} />
            <AvatarFallback className="text-[10px] font-semibold">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 border-0 font-medium ${config.bg} ${config.color}`}
          >
            {log.action}
          </Badge>
        </div>
      </div>
    </div>
  )
}

// ─── Paginação ────────────────────────────────────────────────────────────────

interface ActivityPaginationProps {
  currentPage: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

function ActivityPagination({
  currentPage,
  totalPages,
  total,
  onPageChange,
}: ActivityPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col items-center gap-2 pt-2 sm:flex-row sm:justify-between">
      <p className="text-xs text-muted-foreground order-2 sm:order-1">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        {" · "}
        <strong>{total}</strong> {total === 1 ? "registo" : "registos"}
      </p>

      <Pagination className="order-1 sm:order-2 sm:w-auto sm:mx-0 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            const isEdge = page === 1 || page === totalPages
            const isNear = Math.abs(page - currentPage) <= 1

            if (!isEdge && !isNear) {
              // Exibe ellipsis apenas nos "pontos de corte"
              if (page === 2 || page === totalPages - 1) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return null
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CompanyWorkspaceActivityFeedTab() {
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading: isContextLoading, company } = useCompanyDashboardContext()

  const {
    isLoading: isAuditLogLoading,
    isError,
    data,
  } = useAuditLogs(company?.id as string, {
    page: currentPage,
    take: ITEMS_PER_PAGE,
  })

  const isLoading = isContextLoading || isAuditLogLoading
  const logs: IAuditLog[] = data?.audit_logs ?? []
  const totalPages = data?.total_pages ?? 1
  const total = data?.total ?? 0

  // Volta à primeira página ao mudar (segurança caso a página actual
  // fique fora do intervalo após um refetch)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll suave para o topo da lista
    document
      .getElementById("activity-feed-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="space-y-4" id="activity-feed-top">
      {isLoading ? (
        <ActivityFeedSkeleton ITEMS_PER_PAGE={ITEMS_PER_PAGE}  />
      ) : isError ? (
        <ErrorState />
      ) : logs.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ScrollArea className="h-[calc(8*5.5rem)]">
            <div className="space-y-3 pr-4">
              {logs.map((log) => (
                <ActivityItem key={log.id} log={log} />
              ))}
            </div>
          </ScrollArea>

          <ActivityPagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}