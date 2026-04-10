"use client"

import { useEffect, useRef, useCallback } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  MessageSquare,
  MoreVertical,
  Phone,
  Users,
  Video,
  Loader2,
  AlertCircle,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import companyACLService from "@/services/company-acl-service"
import { companyACLQueryKeys } from "@/hooks/queries/use-company-acl"
import type { ICompanyACL } from "@/interfaces/ICompanyACL"

// ─── Constantes ───────────────────────────────────────────────────────────────

const TAKE = 10

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(acl: ICompanyACL): string {
  const { firstName, lastName } = acl.user
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase()
}

function getFullName(acl: ICompanyACL): string {
  return acl.user.full_name || `${acl.user.firstName} ${acl.user.lastName}`.trim()
}

function getPrimaryRole(acl: ICompanyACL): string {
  return acl.company_roles?.[0]?.name ?? "Membro"
}

/**
 * Deriva o status de presença a partir dos campos `is_online` e
 * `last_time_online` da IUser — sem dados extras do backend.
 *
 * Regras:
 *  - is_online === true                       → "online"
 *  - last_time_online < 15 min atrás          → "away"
 *  - qualquer outro caso                      → "offline"
 */
function deriveStatus(acl: ICompanyACL): "online" | "away" | "offline" {
  const { is_online, last_time_online } = acl.user

  if (is_online) return "online"

  if (last_time_online) {
    const diffMs = Date.now() - new Date(last_time_online).getTime()
    const diffMin = diffMs / 1000 / 60
    if (diffMin <= 15) return "away"
  }

  return "offline"
}

function formatLastSeen(last_time_online: Date | null): string | null {
  if (!last_time_online) return null
  return formatDistanceToNow(new Date(last_time_online), {
    addSuffix: true,
    locale: ptBR,
  })
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

const STATUS_DOT: Record<"online" | "away" | "offline", string> = {
  online:  "bg-green-500",
  away:    "bg-yellow-500",
  offline: "bg-gray-400",
}

const STATUS_LABEL: Record<"online" | "away" | "offline", string> = {
  online:  "Online",
  away:    "Ausente",
  offline: "Offline",
}

function MemberSkeleton() {
  return (
    <div className="flex items-center justify-between space-x-3 py-1">
      <div className="flex items-center space-x-3">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="size-8 rounded-md" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-muted">
        <UserRound className="size-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">Nenhum membro encontrado</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Adicione membros à equipa para os ver aqui.
        </p>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-5 text-destructive" />
      </div>
      <p className="text-sm font-medium">Erro ao carregar membros</p>
    </div>
  )
}

// ─── Item de membro ───────────────────────────────────────────────────────────

function MemberItem({ acl }: { acl: ICompanyACL }) {
  const status    = deriveStatus(acl)
  const fullName  = getFullName(acl)
  const role      = getPrimaryRole(acl)
  const lastSeen  = status !== "online" ? formatLastSeen(acl.user.last_time_online) : null

  return (
    <div className="flex items-center justify-between space-x-3 rounded-md px-1 py-1.5 transition-colors hover:bg-muted/50">
      {/* Avatar + indicador de status */}
      <div className="flex items-center space-x-3 min-w-0">
        <div className="relative shrink-0">
          <Avatar className="size-10">
            <AvatarImage
              src={
                acl.user.avatar_url ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`
              }
              alt={fullName}
            />
            <AvatarFallback className="text-xs font-semibold">
              {getInitials(acl)}
            </AvatarFallback>
          </Avatar>

          {/* Bolinha de status posicionada sobre o avatar */}
          <span
            title={STATUS_LABEL[status]}
            className={`
              absolute bottom-0 right-0
              size-3 rounded-full border-2 border-background
              ${STATUS_DOT[status]}
            `}
          />
        </div>

        {/* Nome, cargo e última vez visto */}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-none">
            {fullName}
          </p>
          <p className="truncate text-xs text-muted-foreground mt-0.5">
            {role}
          </p>
          {lastSeen && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {lastSeen}
            </p>
          )}
        </div>
      </div>

      {/* Menu de acções */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 cursor-pointer"
            aria-label={`Opções para ${fullName}`}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            Enviar mensagem
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Phone className="mr-2 h-4 w-4" />
            Ligar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Video className="mr-2 h-4 w-4" />
            Videochamada
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CardCompanyTeamMembers() {
  const { isLoading: isContextLoading, company } = useCompanyDashboardContext()

  // ── Scroll infinito com useInfiniteQuery ───────────────────────────────────
  //
  // Cada "página" do React Query corresponde a um request paginado ao backend.
  // `getNextPageParam` usa `remaining_pages` da resposta para saber se há mais.
  // Ao chegar ao sentinel (div invisível no fundo da lista), `fetchNextPage` é
  // chamado automaticamente via IntersectionObserver.

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: companyACLQueryKeys.list(company?.id ?? "", { take: TAKE }),
    queryFn: ({ pageParam = 1 }) =>
      companyACLService.getCompanyACL(company?.id as string, {
        page: pageParam as number,
        take: TAKE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.remaining_pages > 0 ? lastPage.page + 1 : undefined,
    enabled: !!company?.id,
    staleTime: 2 * 60 * 1000,
  })

  // ── Sentinel: elemento observado para disparar o próximo fetch ─────────────
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(handleIntersection, {
      // Dispara 100px antes do sentinel entrar na viewport — pré-carrega
      rootMargin: "0px 0px 100px 0px",
      threshold: 0,
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [handleIntersection])

  // ── Dados achatados de todas as páginas carregadas ─────────────────────────
  const allMembers: ICompanyACL[] = data?.pages.flatMap((p) => p.company_acls) ?? []
  const onlineCount = allMembers.filter((m) => m.user.is_online).length
  const totalCount  = data?.pages[0]?.total ?? 0

  const showSkeleton = isContextLoading || (isLoading && !data)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          Equipe
        </CardTitle>
        <CardDescription>
          {showSkeleton ? (
            <Skeleton className="h-3.5 w-40" />
          ) : (
            <>
              <span className="text-green-500 font-medium">{onlineCount}</span>
              {" online · "}
              <span>{totalCount}</span>
              {" no total"}
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {showSkeleton ? (
          // Skeleton inicial — antes do primeiro fetch completar
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <MemberSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState />
        ) : allMembers.length === 0 ? (
          <EmptyState />
        ) : (
          <ScrollArea className="h-[280px] pr-3">
            <div className="space-y-1">
              {allMembers.map((acl) => (
                <MemberItem key={acl.id} acl={acl} />
              ))}

              {/* ── Sentinel de scroll infinito ─────────────────────────── */}
              {/* Div invisível no fundo da lista. Quando entra na viewport,
                  o IntersectionObserver dispara fetchNextPage(). */}
              <div ref={sentinelRef} className="h-px" aria-hidden />

              {/* Indicador de carregamento da próxima página */}
              {isFetchingNextPage && (
                <div className="flex justify-center py-3">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              )}

              {/* Mensagem de fim da lista */}
              {!hasNextPage && allMembers.length > 0 && (
                <p className="py-3 text-center text-xs text-muted-foreground">
                  Todos os {totalCount} membros carregados
                </p>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}