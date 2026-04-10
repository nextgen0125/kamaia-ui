import { useQuery } from '@tanstack/react-query';
import taskListService from '@/services/task-list-service';

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
