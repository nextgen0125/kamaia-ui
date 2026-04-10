import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import taskListService from '@/services/task-list-service';
import { toast } from 'sonner';

export const taskListQueryKeys = {
  all: ['task-lists'] as const,
  byCompany: (companyId: string) => [...taskListQueryKeys.all, companyId] as const,
  list: (companyId: string, params?: any) => [...taskListQueryKeys.byCompany(companyId), 'list', params] as const,
};

export function useTaskLists(companyId: string, params?: any) {
  return useQuery({
    queryKey: taskListQueryKeys.list(companyId, params),
    queryFn: () => taskListService.getTaskLists(companyId, params),
    enabled: !!companyId,
  });
}

export function useCreateTaskList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: { name: string; company_acl_id: string } }) =>
      taskListService.createTaskList(companyId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskListQueryKeys.byCompany(companyId) });
      toast.success('Lista de tarefas criada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar lista de tarefas.');
    },
  });
}

export function useUpdateTaskList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, id, data }: { companyId: string; id: string; data: { name: string; company_acl_id: string } }) =>
      taskListService.updateTaskList(companyId, id, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskListQueryKeys.byCompany(companyId) });
      toast.success('Lista de tarefas atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar lista de tarefas.');
    },
  });
}

export function useDeleteTaskList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, id }: { companyId: string; id: string }) =>
      taskListService.deleteTaskList(companyId, id),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskListQueryKeys.byCompany(companyId) });
      toast.success('Lista de tarefas removida com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao remover lista de tarefas.');
    },
  });
}
