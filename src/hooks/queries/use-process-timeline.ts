import { useInfiniteQuery } from '@tanstack/react-query';
import { processTimelineService } from '@/services/process-timeline.service';

export const processTimelineKeys = {
  all: ['process-timeline'] as const,
  byProcess: (companyId: string, processId: string) =>
    [...processTimelineKeys.all, companyId, processId] as const,
};

export function useCaseTimeline(companyId: string, processId: string) {
  return useInfiniteQuery({
    queryKey: processTimelineKeys.byProcess(companyId, processId),
    queryFn: ({ pageParam }) =>
      processTimelineService.getTimeline(companyId, processId, pageParam as number, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!companyId && !!processId,
  });
}
