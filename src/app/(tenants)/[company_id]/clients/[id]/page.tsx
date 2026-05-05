"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClient } from "@/hooks/queries/clients/use-clients";
import { ClientProfileHeader } from "@/components/clients/client-profile-header";
import { ClientProfileStats } from "@/components/clients/client-profile-stats";
import { ClientProfileSidebar } from "@/components/clients/client-profile-sidebar";
import { ClientOverviewTab } from "@/components/clients/client-overview-tab";
import { ClientNotesTab } from "@/components/clients/client-notes-tab";
import { ClientProcessesTab } from "@/components/clients/client-processes-tab";
import { ClientDocumentsTab } from "@/components/clients/client-documents-tab";
import { EditClientDialog } from "@/components/clients/edit-client-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DollarSign } from "lucide-react";

export default function ClientDetailsPage() {
  const params = useParams();
  const companyId = params.company_id as string;
  const clientId = params.id as string;

  const { data: client, isLoading } = useClient(companyId, clientId);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ClientProfileHeader
        client={client}
        isLoading={isLoading}
        onEdit={() => setIsEditOpen(true)}
      />

      <ClientProfileStats companyId={companyId} clientId={clientId} client={client} />

      <div className="grid gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="md:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="processes">Processos</TabsTrigger>
              <TabsTrigger value="notes">Anotações</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ClientOverviewTab client={client} />
            </TabsContent>

            <TabsContent value="processes">
              <ClientProcessesTab companyId={companyId} client={client} />
            </TabsContent>

            <TabsContent value="notes">
              <ClientNotesTab companyId={companyId} clientId={clientId} />
            </TabsContent>

            <TabsContent value="documents">
              <ClientDocumentsTab companyId={companyId} client={client} />
            </TabsContent>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Consulte o financeiro nos processos individuais.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <ClientProfileSidebar companyId={companyId} clientId={clientId} client={client} />
        </div>
      </div>

      {client && (
        <EditClientDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          client={client}
        />
      )}
    </div>
  );
}
