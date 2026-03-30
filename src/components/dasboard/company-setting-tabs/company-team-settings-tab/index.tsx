"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, array, string, union, null as zodNull } from "zod"
import { toast } from "sonner"
import {
  MoreHorizontal,
  Plus,
  UserRound,
  Pencil,
  Trash2,
  Eye,
  ShieldCheck,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { MobileTableWrapper } from "@/components/ui/mobile-table-wrapper"
import { ProfileCardSkeleton } from "@/components/ui/skeleton-cards"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useCompanyDashboardContext } from "@/contexts/company-contexts/company-dashboard"
import { DialogAddMember } from "./dialog-add-member"
import { DialogEditMember } from "./dialog-edit-member"
import { AlertRemoveMember } from "./alert-remove-member"
import { IUser } from "@/interfaces/IUser"
import { getUserAcl } from "@/utils/getUserAcl"
import { formatDate } from "@/utils/formatDate"

// ─── Constantes ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 8


// ─── Tipos ────────────────────────────────────────────────────────────────────

interface CompanyRole {
  id: string
  name: string
  type: string
}

interface CompanyPermission {
  id: string
  name: string
  type: string
}

export interface TeamMember {
  id: string
  user_id: string
  full_name: string
  email: string
  phone: string
  avatar_url?: string
  company_roles: CompanyRole[]
  company_permissions: CompanyPermission[]
  created_at: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_MEMBERS: IUser[] = [
  {
    id: "acl-1",
    user_id: "usr-1",
    full_name: "Gabriel Pereira",
    email: "gabriel@escritorio.com",
    phone: "+244 924 585 752",
    company_acls: [
      {
        company_roles: [{ id: "r1", name: "Advogado", type: "ATTORNEY" }],
        company_permissions: [
          { id: "p1", name: "Listar Advogados", type: "LIST:ATTORNEY" },
          { id: "p2", name: "Criar Processos", type: "CREATE:CASE" },
        ],
      }
    ],
    created_at: new Date("2025-01-15T10:00:00Z"),
  },
  {
    id: "acl-2",
    user_id: "usr-2",
    full_name: "Ana Luísa Ferreira",
    email: "ana@escritorio.com",
    phone: "+244 912 345 678",
    company_acls: [
      {
        company_roles: [{ id: "r2", name: "Administrador", type: "ADMINISTRATOR" }],
        company_permissions: [
          { id: "p3", name: "Listar Advogados", type: "LIST:ATTORNEY" },
          { id: "p4", name: "Remover Advogados", type: "DELETE:ATTORNEY" },
          { id: "p5", name: "Listar Finanças", type: "LIST:FINANCE" },
        ],
      }
    ],
    
    created_at: new Date("2025-01-10T08:30:00Z"),
  },
  {
    id: "acl-3",
    user_id: "usr-3",
    full_name: "Carlos Manuel Dias",
    email: "carlos@escritorio.com",
    phone: "+244 933 111 222",
    
    company_acls: [
      {
        company_roles: [{ id: "r3", name: "Assistente", type: "ASSISTANT" }],
        company_permissions: [
          { id: "p6", name: "Listar Processos", type: "LIST:CASE" },
        ],
      }
    ],
    
    created_at: new Date("2025-02-01T09:00:00Z"),
  },
  {
    id: "acl-4",
    user_id: "usr-4",
    full_name: "Maria João Santos",
    email: "maria@escritorio.com",
    phone: "+244 942 999 000",
    company_acls: [
      {
        company_roles: [{ id: "r1b", name: "Advogado", type: "ATTORNEY" }],
        company_permissions: [
          { id: "p7", name: "Listar Advogados", type: "LIST:ATTORNEY" },
          { id: "p8", name: "Editar Processos", type: "EDIT:CASE" },
        ],
      }
    ],
    
    created_at: new Date("2025-02-14T11:00:00Z"),
  },
  {
    id: "acl-5",
    user_id: "usr-5",
    full_name: "Rui Alexandre Costa",
    email: "rui@escritorio.com",
    phone: "+244 921 777 888",
    
    company_acls: [
      {
        company_roles: [{ id: "r4", name: "Visualizador", type: "VIEWER" }],
        company_permissions: [
          { id: "p9", name: "Listar Processos", type: "LIST:CASE" },
          { id: "p10", name: "Listar Finanças", type: "LIST:FINANCE" },
        ],
      }
    ],
    created_at: new Date("2025-03-01T14:00:00Z"),
  },
  {
    id: "acl-6",
    user_id: "usr-6",
    full_name: "Filomena Vieira",
    email: "filomena@escritorio.com",
    phone: "+244 915 666 444",

    company_acls: [
      {
        company_roles: [{ id: "r1c", name: "Advogado", type: "ATTORNEY" }],
        company_permissions: [
          { id: "p11", name: "Criar Processos", type: "CREATE:CASE" },
        ],
      }
    ],
    created_at: new Date("2025-03-10T16:00:00Z"),
  },
  {
    id: "acl-7",
    user_id: "usr-7",
    full_name: "Tomás Araújo",
    email: "tomas@escritorio.com",
    phone: "+244 930 222 111",

    company_acls: [
      {
        company_roles: [{ id: "r3b", name: "Assistente", type: "ASSISTANT" }],
        company_permissions: [],
      }
    ],
    created_at: new Date("2025-03-20T10:00:00Z"),
  },
  {
    id: "acl-8",
    user_id: "usr-8",
    full_name: "Beatriz Neto",
    email: "beatriz@escritorio.com",
    phone: "+244 944 333 555",
    company_acls: [
      {
        company_roles: [{ id: "r3b", name: "Assistente", type: "ASSISTANT" }],
        company_permissions: [],
      }
    ],
    created_at: new Date("2025-03-25T09:00:00Z"),
  },
  {
    id: "acl-9",
    user_id: "usr-9",
    full_name: "Sérgio Lopes",
    email: "sergio@escritorio.com",
    phone: "+244 925 888 777",
        company_acls: [
      {
        company_roles: [{ id: "r2b", name: "Administrador", type: "ADMINISTRATOR" }],
        company_permissions: [
          { id: "p13", name: "Listar Advogados", type: "LIST:ATTORNEY" },
          { id: "p14", name: "Criar Advogados", type: "CREATE:ATTORNEY" },
          { id: "p15", name: "Editar Advogados", type: "EDIT:ATTORNEY" },
        ],
      }
    ],
    created_at: new Date("2025-01-05T07:00:00Z"),
  },
]



// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}



function roleBadgeVariant(type: string): "default" | "secondary" | "outline" | "destructive" {
  switch (type) {
    case "ADMINISTRATOR": return "default"
    case "ATTORNEY":      return "secondary"
    default:              return "outline"
  }
}





// ─── Skeleton da tabela ───────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <>
      {/* Desktop skeleton */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Cargos</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead>Adicionado em</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-3.5 w-28" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20 rounded-full" /></TableCell>
                <TableCell>
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </TableCell>
                <TableCell><Skeleton className="h-3.5 w-24" /></TableCell>
                <TableCell><Skeleton className="size-8 rounded-md" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProfileCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CompanyTeamSettingTab() {
  const { company } = useCompanyDashboardContext()

  // ── State ──────────────────────────────────────────────────────────────────
  const [members, setMembers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [removeOpen, setRemoveOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<IUser | null>(null)

  // ── Data fetching simulado ─────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 1200))
      setMembers(MOCK_MEMBERS)
      setIsLoading(false)
    }
    load()
  }, [])

  // ── Paginação ──────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE)
  const paginated = members.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAddSuccess = (member: IUser) => {
    setMembers((prev) => [member, ...prev])
    setCurrentPage(1)
  }



  const openEdit = (member: IUser | null) => {
    setSelectedMember(member)
    setEditOpen(true)
  }

  const openRemove = (member: IUser | null) => {
    setSelectedMember(member)
    setRemoveOpen(true)
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <TabsContent value="team" className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              Gerenciamento de Equipe
            </CardTitle>
            <CardDescription className="mt-1">
              Lista de membros e controlo de acesso da organização
            </CardDescription>
          </div>

          <Button
            size="sm"
            className="cursor-pointer shrink-0"
            onClick={() => setAddOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Membro
          </Button>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <TableSkeleton />
          ) : members.length === 0 ? (
            // ── Estado vazio ────────────────────────────────────────────────
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <UserRound className="size-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Nenhum membro encontrado</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Adicione o primeiro membro para começar.
                </p>
              </div>
              <Button size="sm" onClick={() => setAddOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Membro
              </Button>
            </div>
          ) : (
            <>
              <MobileTableWrapper
                // ── Vista desktop (tabela) ──────────────────────────────
                children={
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Membro</TableHead>
                          <TableHead>Telemóvel</TableHead>
                          <TableHead>Cargos</TableHead>
                          <TableHead>Permissões</TableHead>
                          <TableHead>Adicionado em</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginated.map((member: IUser) => (
                          <TableRow key={member.id}>
                            {/* Membro */}
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="size-9">
                                  <AvatarImage src={member.avatar_url} />
                                  <AvatarFallback className="text-xs font-semibold">
                                    {getInitials(member.full_name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm leading-tight">
                                    {member.full_name}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {member.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>

                            {/* Telemóvel */}
                            <TableCell className="text-sm text-muted-foreground">
                              {member.phone}
                            </TableCell>

                            {/* Cargos */}
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {getUserAcl(member?.company_acls, company?.id)?.company_roles?.map((role) => (
                                  <Badge
                                    key={role.id}
                                    variant={roleBadgeVariant(role.type)}
                                    className="text-xs"
                                  >
                                    {role.name}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>

                            {/* Permissões */}
                            <TableCell>
                              {getUserAcl(member?.company_acls, company?.id)?.company_permissions.length === 0 ? (
                                <span className="text-muted-foreground text-xs italic">
                                  Nenhuma
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {getUserAcl(member?.company_acls, company?.id)?.company_permissions.slice(0, 2).map((p) => (
                                    <Badge key={p.id} variant="outline" className="text-xs">
                                      <ShieldCheck className="mr-1 h-3 w-3" />
                                      {p.name}
                                    </Badge>
                                  ))}
                                  {(getUserAcl(member?.company_acls, company?.id)?.company_permissions?.length ?? 0) > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{(getUserAcl(member?.company_acls, company?.id)?.company_permissions?.length ?? 0) - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </TableCell>

                            {/* Data */}
                            <TableCell className="text-sm text-muted-foreground">
                              {formatDate(member.created_at)}
                            </TableCell>

                            {/* Acções */}
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 cursor-pointer"
                                    aria-label="Mais opções"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => toast.info(`Ver perfil de ${member.full_name}`)}
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver perfil
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openEdit(member)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => openRemove(member)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remover
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                }

                // ── Vista mobile (cards) ────────────────────────────────
                mobileView={
                  <div className="space-y-3">
                    {paginated.map((member) => (
                      <Card key={member.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="size-10">
                                <AvatarImage src={member.avatar_url} />
                                <AvatarFallback className="text-sm font-semibold">
                                  {getInitials(member.full_name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{member.full_name}</p>
                                <p className="text-muted-foreground text-xs">{member.email}</p>
                                <p className="text-muted-foreground text-xs">{member.phone}</p>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => toast.info(`Ver perfil de ${member.full_name}`)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver perfil
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openEdit(member)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => openRemove(member)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remover
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {getUserAcl(member?.company_acls, company?.id)?.company_roles?.map((role) => (
                              <Badge key={role.id} variant={roleBadgeVariant(role.type)} className="text-xs">
                                {role.name}
                              </Badge>
                            ))}
                            {getUserAcl(member?.company_acls, company?.id)?.company_permissions.slice(0, 2).map((p) => (
                              <Badge key={p.id} variant="outline" className="text-xs">
                                <ShieldCheck className="mr-1 h-3 w-3" />
                                {p.name}
                              </Badge>
                            ))}
                            {(getUserAcl(member?.company_acls, company?.id)?.company_permissions.length ?? 0) > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{(getUserAcl(member?.company_acls, company?.id)?.company_permissions.length ?? 0) - 2}
                              </Badge>
                            )}
                          </div>

                          <p className="mt-3 text-xs text-muted-foreground border-t pt-2">
                            Adicionado em {formatDate(member.created_at)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                }
              />

              {/* ── Paginação ─────────────────────────────────────────────── */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Página <strong>{currentPage}</strong> de{" "}
                    <strong>{totalPages}</strong> · {members.length} membros
                  </p>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const page = i + 1
                        const isEdge = page === 1 || page === totalPages
                        const isNear = Math.abs(page - currentPage) <= 1
                        if (!isEdge && !isNear) {
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
                              onClick={() => setCurrentPage(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Dialogs ────────────────────────────────────────────────────────── */}
      <DialogAddMember
        open={addOpen}
        onOpenChange={setAddOpen}
        onSuccess={handleAddSuccess}
      />

      <DialogEditMember
        member={selectedMember}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <AlertRemoveMember
        member={selectedMember}
        open={removeOpen}
        onOpenChange={setRemoveOpen}
      />
    </TabsContent>
  )
}