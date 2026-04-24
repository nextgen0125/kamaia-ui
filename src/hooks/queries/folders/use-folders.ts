import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import folderService from '@/services/folders.service';
import { ICreateFolderData, IUpdateFolderData } from '@/interfaces/IFolder';

export const folderQueryKeys = {
  all: ['folders'] as const,
  byCompany: (companyId: string) => [...folderQueryKeys.all, companyId] as const,
  lists: (companyId: string) => [...folderQueryKeys.byCompany(companyId), 'list'] as const,
};

export function useFolders(companyId: string) {
  return useQuery({
    queryKey: folderQueryKeys.lists(companyId),
    queryFn: () => folderService.getFolders(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: ICreateFolderData }) =>
      folderService.createFolder(companyId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.lists(companyId) });
    },
  });
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, folderId, data }: { companyId: string; folderId: string; data: IUpdateFolderData }) =>
      folderService.updateFolder(companyId, folderId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.lists(companyId) });
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, folderId }: { companyId: string; folderId: string }) =>
      folderService.deleteFolder(companyId, folderId),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: folderQueryKeys.lists(companyId) });
    },
  });
}
