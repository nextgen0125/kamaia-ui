import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { caseNotesService, ICreateCaseNoteData } from '@/services/case-notes.service';

export const caseNotesKeys = {
  all: ['case-notes'] as const,
  byProcess: (companyId: string, processId: string) =>
    [...caseNotesKeys.all, companyId, processId] as const,
};

export function useCaseNotes(companyId: string, processId: string) {
  return useQuery({
    queryKey: caseNotesKeys.byProcess(companyId, processId),
    queryFn: () => caseNotesService.getNotes(companyId, processId),
    enabled: !!companyId && !!processId,
  });
}

export function useCreateCaseNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      processId,
      data,
    }: {
      companyId: string;
      processId: string;
      data: ICreateCaseNoteData;
    }) => caseNotesService.createNote(companyId, processId, data),
    onSuccess: (_, { companyId, processId }) => {
      queryClient.invalidateQueries({
        queryKey: caseNotesKeys.byProcess(companyId, processId),
      });
    },
  });
}
