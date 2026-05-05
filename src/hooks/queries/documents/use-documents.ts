import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import documentService from '@/services/documents.service';
import { IDocumentFilters } from '@/interfaces/IDocument';

export const documentQueryKeys = {
  all: ['documents'] as const,
  byCompany: (companyId: string) => [...documentQueryKeys.all, companyId] as const,
  lists: (companyId: string) => [...documentQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: IDocumentFilters) => [...documentQueryKeys.lists(companyId), filters] as const,
  byClient: (companyId: string, clientId: string) => [...documentQueryKeys.byCompany(companyId), 'client', clientId] as const,
  clientList: (companyId: string, clientId: string, filters?: IDocumentFilters) => [...documentQueryKeys.byClient(companyId, clientId), filters] as const,
  byProcess: (companyId: string, processId: string) => [...documentQueryKeys.byCompany(companyId), 'process', processId] as const,
  processList: (companyId: string, processId: string, filters?: IDocumentFilters) => [...documentQueryKeys.byProcess(companyId, processId), filters] as const,
  detail: (companyId: string, id: string) => [...documentQueryKeys.byCompany(companyId), 'detail', id] as const,
  kpis: (companyId: string) => ['kpis', companyId, 'dashboard'] as const,
};

export function useDocuments(companyId: string, filters?: IDocumentFilters) {
  return useQuery({
    queryKey: documentQueryKeys.list(companyId, filters),
    queryFn: () => documentService.getDocuments(companyId, filters),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useClientDocuments(companyId: string, clientId: string, filters?: IDocumentFilters) {
  return useQuery({
    queryKey: documentQueryKeys.clientList(companyId, clientId, filters),
    queryFn: () => documentService.getClientDocuments(companyId, clientId, filters),
    enabled: !!companyId && !!clientId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProcessDocuments(companyId: string, processId: string, filters?: IDocumentFilters) {
  return useQuery({
    queryKey: documentQueryKeys.processList(companyId, processId, filters),
    queryFn: () => documentService.getProcessDocuments(companyId, processId, filters),
    enabled: !!companyId && !!processId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDocumentById(companyId: string, id: string) {
  return useQuery({
    queryKey: documentQueryKeys.detail(companyId, id),
    queryFn: () => documentService.getDocumentById(companyId, id),
    enabled: !!companyId && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, formData }: { companyId: string; formData: FormData }) =>
      documentService.createDocument(companyId, formData),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: documentQueryKeys.lists(companyId) });
      queryClient.invalidateQueries({ queryKey: documentQueryKeys.kpis(companyId) });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, id }: { companyId: string; id: string }) =>
      documentService.deleteDocument(companyId, id),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: documentQueryKeys.lists(companyId) });
      queryClient.invalidateQueries({ queryKey: documentQueryKeys.kpis(companyId) });
    },
  });
}

export function useDownloadDocument() {
  return useMutation({
    mutationFn: ({ companyId, id }: { companyId: string; id: string }) =>
      documentService.downloadDocument(companyId, id),
  });
}
