import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import taskService from '@/services/task-service';
import { ICreateTaskData, IUpdateTaskData, ITaskFilters, ITaskStatus } from '@/interfaces/ITask';
import { authService } from '@/services/auth-service';

export const taskQueryKeys = {
  all: ['tasks'] as const,
  byCompany: (companyId: string) => [...taskQueryKeys.all, companyId] as const,
  lists: (companyId: string) => [...taskQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: ITaskFilters) => [...taskQueryKeys.lists(companyId), filters] as const,
  progress: (companyId: string) => [...taskQueryKeys.byCompany(companyId), 'progress'] as const,
  kpis: (companyId: string) => [...taskQueryKeys.byCompany(companyId), 'kpis'] as const,
};

export function useInfiniteTasks(companyId: string, filters?: Omit<ITaskFilters, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...taskQueryKeys.lists(companyId), 'infinite', filters],
    queryFn: ({ pageParam }) =>
      taskService.getTasks(companyId, { 
        ...filters, 
        page: pageParam as number, 
        take: 10 
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTaskProgress(companyId: string) {
  return useQuery({
    queryKey: taskQueryKeys.progress(companyId),
    queryFn: () => taskService.getTaskProgress(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

// Para buscar KPIs via controller modificado
export function useTaskKPIs(companyId: string) {
  return useQuery({
    queryKey: taskQueryKeys.kpis(companyId),
    queryFn: async () => {
        const api = authService.getApiInstance();
        const response = await api.get(`/v1/companies/${companyId}/kpis?page=tasks`);
        return response.data;
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: string; data: ICreateTaskData }) =>
      taskService.createTask(companyId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.kpis(companyId) });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, taskId, data }: { companyId: string; taskId: string; data: IUpdateTaskData }) =>
      taskService.updateTask(companyId, taskId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.kpis(companyId) });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, taskId }: { companyId: string; taskId: string }) =>
      taskService.deleteTask(companyId, taskId),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(companyId) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.kpis(companyId) });
    },
  });
}
