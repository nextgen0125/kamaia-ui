"use client";

import { useState } from "react";
import { useProcessDocuments } from "@/hooks/queries/documents/use-documents";
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
import { MoreVertical, Download, Trash2, FileText, Upload } from "lucide-react";
import { DeleteDocumentDialog } from "@/components/companies/documents/delete-document-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IDocument } from "@/interfaces/IDocument";
import { UploadDocumentDialog } from "../documents/upload-document-dialog";
import { formatBytes, formatMime } from "@/utils/documentUtils";

interface CaseDocumentsTabProps {
  companyId?: string;
  caseId?: string;
}

export function CaseDocumentsTab({
  companyId: propCompanyId,
  caseId: propCaseId,
}: CaseDocumentsTabProps) {
  const params = useParams();
  const companyId = propCompanyId || (params.company_id as string);
  const caseId = propCaseId || (params.id as string);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(null);

  // Carregar documentos da empresa
  const { data: documentsData, isLoading } = useProcessDocuments(companyId, caseId, {
    page: currentPage,
    take: 10,
  });


  // Filtrar documentos associados a este processo
  const documents = documentsData?.documents || [];

  const totalPages = documentsData?.total_pages || 1;

  const handleDeleteClick = (doc: IDocument) => {
    setSelectedDocument(doc);
    setIsDeleteDialogOpen(true);
  };

  const handleDownload = (doc: IDocument) => {
    // Implementar download se houver função
    console.log("Baixar documento:", doc);
  };

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
              Documentos do Processo
            </CardTitle>
            <Button
              onClick={() => setUploadDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="size-4" />
              Fazer Upload
            </Button>
            <UploadDocumentDialog
              open={uploadDialogOpen}
              onOpenChange={setUploadDialogOpen}
            />
          </div>
        </CardHeader>

        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Nenhum documento encontrado para este processo.</p>
              <p className="text-sm mt-1">
                Comece adicionando um novo documento usando o botão acima.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
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
                          {formatMime(doc.file_mimetype)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatBytes(Number(doc.file_size || 0))}
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
