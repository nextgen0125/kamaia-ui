import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientNotesService } from '@/services/client-notes.service';

export function useClientNotes(companyId: string, clientId: string) {
  return useQuery({
    queryKey: ['client-notes', companyId, clientId],
    queryFn: () => clientNotesService.getNotes(companyId, clientId),
    enabled: !!companyId && !!clientId,
  });
}

export function useCreateClientNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ companyId, clientId, data }: { clientId: string; companyId: string; data: { client_id: string; title?: string; content: string } }) =>
      clientNotesService.createNote(companyId, clientId, data),
    onSuccess: (_, { companyId, data }) => {
      queryClient.invalidateQueries({ queryKey: ['client-notes', companyId, data.client_id] });
    },
  });
}

export function useDeleteClientNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ companyId, clientId, noteId }: { companyId: string; clientId: string; noteId: string }) =>
      clientNotesService.deleteNote(companyId, noteId, clientId),
    onSuccess: (_, { companyId, clientId }) => {
      queryClient.invalidateQueries({ queryKey: ['client-notes', companyId, clientId] });
    },
  });
}
