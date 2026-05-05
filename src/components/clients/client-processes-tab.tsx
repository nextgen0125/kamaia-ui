"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Briefcase } from "lucide-react";
import Link from "next/link";
import { IClient } from "@/services/clients.service";
import { IProcess } from "@/interfaces/IProcess";
import { useState } from "react";
import { CreateCaseDialog } from "@/components/companies/cases/create-case-dialog";

interface ClientProcessesTabProps {
  companyId: string;
  client?: IClient;
}

export function ClientProcessesTab({ companyId, client }: ClientProcessesTabProps) {
  if (!client) return null;

  const processes = client.involved?.map(inv => inv.process).filter(Boolean) || [];

  const getStatusBadge = (status?: string) => {
    const s = (status || "Pendente").toLowerCase();
    if (s.includes("ganho") || s.includes("concluido")) return { label: "Concluído", variant: "default" as const };
    if (s.includes("andamento")) return { label: "Em Andamento", variant: "default" as const };
    return { label: "Pendente", variant: "secondary" as const };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Processos do Cliente
          </CardTitle>
          <CreateCaseDialog onSuccess={() => setIsCreateDialogOpen(false)} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Acções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Nenhum processo encontrado para este cliente.
                </TableCell>
              </TableRow>
            ) : (
              processes.map((proc: IProcess) => (
                <TableRow key={proc.id}>
                  <TableCell className="font-mono text-xs">
                    {proc.process_number || "N/A"}
                  </TableCell>
                  <TableCell>{proc.title || "Sem título"}</TableCell>
                  <TableCell>{proc.legal_area || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(proc.status).variant}>
                      {getStatusBadge(proc.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(proc.case_value || 0)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/${companyId}/cases/${proc.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
