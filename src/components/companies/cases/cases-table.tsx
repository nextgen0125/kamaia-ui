import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CasesRowActions } from "./cases-row-actions";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";
import { IProcess } from "@/interfaces/IProcess";

interface CasesTableProps {
  cases: IProcess[];
  companyId: string;
}

export function CasesTable({ cases, companyId }: CasesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "pending": return "secondary";
      case "completed": return "outline";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Em Andamento";
      case "pending": return "Aguardando";
      case "completed": return "Concluído";
      default: return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="size-4 text-red-500" />;
      case "medium": return <Clock className="size-4 text-yellow-500" />;
      case "low": return <CheckCircle className="size-4 text-green-500" />;
      default: return null;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "AOA",
    }).format(value);
  };

  return (
    <div className="hidden md:block rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Processo</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Advogado</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                Nenhum processo encontrado
              </TableCell>
            </TableRow>
          ) : (
            cases.map((case_) => {
              const clientName = case_.involveds?.[0]?.client?.name || "Sem cliente";
              const lawyerName = case_.company_acl?.user ? `${case_?.company_acl?.user?.firstName} ${case_?.company_acl?.user?.lastName}` : "Sem advogado";

              return (
                <TableRow key={case_.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{case_.title}</div>
                      <div className="text-sm text-muted-foreground font-mono">{case_.process_number}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{clientName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{lawyerName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">
                      {case_.case_value > 0 ? formatCurrency(case_.case_value) : "-"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(case_.status) as any}>
                      {getStatusLabel(case_.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(case_.priority)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <CasesRowActions companyId={companyId} caseId={case_.id} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
