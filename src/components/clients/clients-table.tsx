"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical, Edit, Trash2, Eye, Phone, Building2, Search, Users } from "lucide-react";
import Link from "next/link";
import { useClients } from "@/hooks/queries/clients/use-clients";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileCard } from "@/components/ui/mobile-card-variants";
import { MobileCardList } from "@/components/ui/mobile-card-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DeleteClientDialog } from "./delete-client-dialog";
import { EditClientDialog } from "./edit-client-dialog";

export function ClientsTable({ companyId }: { companyId?: string }) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "pf" | "pj">("all");

  const [selectedClientToDelete, setSelectedClientToDelete] = useState<string | null>(null);
  const [selectedClientToEdit, setSelectedClientToEdit] = useState<any | null>(null);

  const { data, isLoading } = useClients(companyId || "", page, 50);

  if (isLoading || !companyId) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const clients = data?.clients || [];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      (client.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.cpf || client.rg || client.nif || '').includes(searchQuery);

    const matchesType = filterType === "all" || client.type === filterType;

    return matchesSearch && matchesType;
  });

  const getInitials = (name: string) => {
    return (name || "C")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Tabs defaultValue="all" className="space-y-4" onValueChange={(v) => setFilterType(v as any)}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pf">Pessoas Físicas</TabsTrigger>
            <TabsTrigger value="pj">Pessoas Jurídicas</TabsTrigger>
          </TabsList>

          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou NIF..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value={filterType} className="space-y-4">
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Documento (NIF/BI)</TableHead>
                  <TableHead>Telemóvel</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum cliente encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {client.type === "pj" ? (
                                <Building2 className="size-4" />
                              ) : (
                                getInitials(client.name)
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {client.type === "pf" ? "PF" : "PJ"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{client.cpf || client.nif || client.rg || "N/A"}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="size-3.5 text-muted-foreground" />
                          {client.phone || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.is_active ? "default" : "secondary"}>
                          {client.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acções</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/${companyId}/clients/${client.id}`}>
                                <Eye className="mr-2 size-4" />
                                Ver Perfil
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedClientToEdit(client)}>
                              <Edit className="mr-2 size-4" />
                              Editar Dados
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setSelectedClientToDelete(client.id)}>
                              <Trash2 className="mr-2 size-4" />
                              Desactivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <MobileCardList className="md:hidden">
            {filteredClients.map((client) => (
              <ProfileCard
                key={client.id}
                id={client.id}
                name={client.name}
                subtitle={client.cpf || client.nif || "Sem Documento"}
                badges={[
                  {
                    label: client.type === "pj" ? "PJ" : "PF",
                    variant: "secondary" as const
                  },
                  {
                    label: client.is_active ? "Activo" : "Inactivo",
                    variant: client.is_active ? "default" as const : "outline" as const
                  }
                ]}
                stats={[
                  { label: "Tel", value: client.phone || "N/A" }
                ]}
                actions={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/${companyId}/clients/${client.id}`}>
                          <Eye className="mr-2 size-4" />
                          Ver Perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedClientToEdit(client)}>
                        <Edit className="mr-2 size-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => setSelectedClientToDelete(client.id)}>
                        <Trash2 className="mr-2 size-4" />
                        Desactivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              />
            ))}
          </MobileCardList>
        </TabsContent>
      </Tabs>

      {selectedClientToDelete && companyId && (
        <DeleteClientDialog
          open={!!selectedClientToDelete}
          onOpenChange={(open) => !open && setSelectedClientToDelete(null)}
          clientId={selectedClientToDelete}
        />
      )}

      {selectedClientToEdit && companyId && (
        <EditClientDialog
          open={!!selectedClientToEdit}
          onOpenChange={(open: boolean) => !open && setSelectedClientToEdit(null)}
          client={selectedClientToEdit}
        />
      )}
    </>
  );
}
