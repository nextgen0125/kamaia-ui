"use client";

import { useState } from "react";
import { useClientDocuments } from "@/hooks/queries/documents/use-documents";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, Download, Trash2, FileText } from "lucide-react";
import { UploadDocumentDialog } from "@/components/documents/upload-document-dialog";
import { DeleteDocumentDialog } from "@/components/companies/documents/delete-document-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IDocument } from "@/interfaces/IDocument";
import { IClient } from "@/services/clients.service";

interface ClientDocumentsTabProps {
  companyId: string;
  client?: IClient;
}

export function ClientDocumentsTab({
  companyId,
  client,
}: ClientDocumentsTabProps) {
  const params = useParams();
  const actualCompanyId = companyId || (params.company_id as string);
  const clientId = client?.id;

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

  // Carregar documentos do cliente
  const { data: documentsData, isLoading } = useClientDocuments(
    actualCompanyId,
    clientId || "",
    {
      page: currentPage,
      take: 10,
    }
  );

  const documents = Array.isArray(documentsData?.documents) ? documentsData.documents : [];
  const totalPages = Math.ceil(documents.length / 10);

  const handleDeleteClick = (doc: IDocument) => {
    setSelectedDocument(doc);
    setIsDeleteDialogOpen(true);
  };

  const handleDownload = (doc: IDocument) => {
    // Implementar download se houver função
    console.log("Baixar documento:", doc);
  };

  if (!client) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Cliente não encontrado
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Carregando documentos...
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos dos Processos
            </CardTitle>
            <UploadDocumentDialog />
          </div>
        </CardHeader>

        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum documento encontrado para este cliente.</p>
              <p className="text-sm mt-1">
                Os documentos associados aos processos deste cliente aparecerão aqui.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Processo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc: IDocument) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {doc.process?.process_number || "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {doc.file_mimetype || "Documento"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {doc.file_size ? `${(Number(doc.file_size || 0) / 1024 / 1024).toFixed(2)} MB` : "N/A"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {doc.created_at
                            ? format(new Date(doc.created_at), "dd/MM/yyyy", {
                              locale: ptBR,
                            })
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDownload(doc)}>
                                <Download className="mr-2 h-4 w-4" />
                                Baixar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteClick(doc)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="cursor-pointer"
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog de exclusão */}
      <DeleteDocumentDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        document={selectedDocument}
      />
    </>
  );
}
