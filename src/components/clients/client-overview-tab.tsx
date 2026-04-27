"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IClient } from "@/services/clients.service";

interface ClientOverviewTabProps {
  client?: IClient;
}

export function ClientOverviewTab({ client }: ClientOverviewTabProps) {
  if (!client) return null;

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">NIF</h4>
              <p className="text-sm font-medium">{client.cpf || client.nif || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">BI (Bilhete de Identidade)</h4>
              <p className="text-sm font-medium">{client.rg || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Nacionalidade</h4>
              <p className="text-sm font-medium">{client.nacionality || "Angolana"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Profissão</h4>
              <p className="text-sm font-medium">{client.profession || "N/A"}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Residência</h4>
            <div className="space-y-1 text-sm">
              <p>{client.address || "N/A"}</p>
              <p>{client.city || ""}</p>
              <p>{client.country || "Angola"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
