import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ICreateEventData, IUpdateEventData, IEventFilters } from '@/interfaces/IEvent';
import eventService from '@/services/event-service';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Estrutura hierárquica escopada por empresa, com sub-escopos por tipo
 * de evento — permitindo invalidações cirúrgicas sem afetar outros tipos.
 *
 * Hierarquia:
 * ['events']
 *   └── ['events', companyId]
 *         ├── ['events', companyId, 'all',     filters?]
 *         ├── ['events', companyId, 'hearing', filters?]
 *         ├── ['events', companyId, 'meeting', filters?]
 *         ├── ['events', companyId, 'term',    filters?]
 *         └── ['events', companyId, 'detail',  eventId]
 */
export const eventQueryKeys = {
  all: ['events'] as const,

  // Escopo por empresa
  byCompany: (companyId: string) =>
    [...eventQueryKeys.all, companyId] as const,

  // Listagem geral (todos os tipos)
  allEvents: (companyId: string, filters?: IEventFilters) =>
    [...eventQueryKeys.byCompany(companyId), 'all', filters] as const,

  allClientEvents: (companyId: string, clientId: string, filters?: IEventFilters) =>
    [...eventQueryKeys.byCompany(companyId), 'client', clientId, filters] as const,

  // Listagens por tipo
  hearings: (companyId: string, filters?: IEventFilters) =>
    [...eventQueryKeys.byCompany(companyId), 'hearing', filters] as const,
  meetings: (companyId: string, filters?: IEventFilters) =>
    [...eventQueryKeys.byCompany(companyId), 'meeting', filters] as const,
  terms: (companyId: string, filters?: IEventFilters) =>
    [...eventQueryKeys.byCompany(companyId), 'term', filters] as const,

  // Detalhe de um evento individual
  details: (companyId: string) =>
    [...eventQueryKeys.byCompany(companyId), 'detail'] as const,
  detail: (companyId: string, eventId: string) =>
    [...eventQueryKeys.details(companyId), eventId] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista todos os eventos de uma empresa, independente do tipo.
 * Endpoint: GET /v1/companies/:company_id/events
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de eventos
 */
export function useAllEvents(companyId: string, filters?: IEventFilters) {
  return useQuery({
    queryKey: eventQueryKeys.allEvents(companyId, filters),
    queryFn: () => eventService.getAllEvents(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista todos os eventos de um cliente, independente do tipo.
 * Endpoint: GET /v1/companies/:company_id/events
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param clientId  UUID do cliente
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de eventos
 */
export function useAllClientEvents(companyId: string, clientId: string, filters?: IEventFilters) {
  return useQuery({
    queryKey: eventQueryKeys.allClientEvents(companyId, clientId, filters),
    queryFn: () => eventService.getAllClientEvents(companyId, clientId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// 

/**
 * Lista todos os eventos de uma empresa com paginação infinita.
 * Endpoint: GET /v1/companies/:company_id/events
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (take)
 * @returns         Query infinita com lista paginada de eventos
 */
export function useAllEventsInfinite(companyId: string, filters?: Omit<IEventFilters, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...eventQueryKeys.allEvents(companyId), 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      eventService.getAllEvents(companyId, { ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista os eventos do tipo Audiência de uma empresa.
 * Endpoint: GET /v1/companies/:company_id/events/hearing
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER
 * com permissão event:view ou event:manage.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de audiências
 */
export function useHearings(companyId: string, filters?: IEventFilters) {
  return useQuery({
    queryKey: eventQueryKeys.hearings(companyId, filters),
    queryFn: () => eventService.getHearings(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista os eventos do tipo Reunião de uma empresa.
 * Endpoint: GET /v1/companies/:company_id/events/meeting
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER
 * com permissão event:view ou event:manage.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de reuniões
 */
export function useMeetings(companyId: string, filters?: IEventFilters) {
  return useQuery({
    queryKey: eventQueryKeys.meetings(companyId, filters),
    queryFn: () => eventService.getMeetings(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista os eventos do tipo Prazo de uma empresa.
 * Endpoint: GET /v1/companies/:company_id/events/term
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER
 * com permissão event:view ou event:manage.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de prazos
 */
export function useTerms(companyId: string, filters?: IEventFilters) {
  return useQuery({
    queryKey: eventQueryKeys.terms(companyId, filters),
    queryFn: () => eventService.getTerms(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cadastra um novo evento jurídico vinculado a uma empresa.
 * Endpoint: POST /v1/companies/:company_id/events
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT com event:manage.
 *
 * Na invalidação, o tipo do evento criado é usado para invalidar apenas
 * a lista correspondente, além da lista geral — evitando refetches desnecessários.
 *
 * @returns Mutation para criação de evento
 */
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      eventData,
    }: {
      companyId: string;
      eventData: ICreateEventData;
    }) => eventService.createEvent(companyId, eventData),
    onSuccess: (createdEvent, { companyId }) => {
      // Invalida a lista geral
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.byCompany(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao criar evento:', error);
    },
  });
}

/**
 * Atualiza os dados de um evento jurídico existente.
 * Endpoint: PUT /v1/companies/:company_id/events/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT com event:manage.
 *
 * @returns Mutation para atualização de evento
 */
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      eventId,
      eventData,
    }: {
      companyId: string;
      eventId: string;
      eventData: IUpdateEventData;
    }) => eventService.updateEvent(companyId, eventId, eventData),
    onSuccess: (updatedEvent, { companyId, eventId }) => {
      // Atualiza o detalhe do evento diretamente no cache
      queryClient.setQueryData(
        eventQueryKeys.detail(companyId, eventId),
        updatedEvent
      );
      // Invalida todas as listas da empresa (o tipo pode ter mudado)
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.byCompany(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar evento:', error);
    },
  });
}

/**
 * Remove um evento jurídico de uma empresa.
 * Endpoint: DELETE /v1/companies/:company_id/events/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT com event:manage.
 *
 * @returns Mutation para remoção de evento
 */
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      eventId,
    }: {
      companyId: string;
      eventId: string;
    }) => eventService.deleteEvent(companyId, eventId),
    onSuccess: (_, { companyId, eventId }) => {
      // Remove o detalhe do evento do cache
      queryClient.removeQueries({
        queryKey: eventQueryKeys.detail(companyId, eventId),
      });
      // Invalida todas as listas da empresa
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.byCompany(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao remover evento:', error);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de eventos.
 * Útil para forçar recarregamento após ações externas
 * (ex.: notificações push, WebSocket, polling).
 */
export function useInvalidateEvents() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de eventos (todas as empresas) */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: eventQueryKeys.all });
    },
    /** Invalida todo o cache de eventos de uma empresa específica */
    invalidateByCompany: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.byCompany(companyId),
      });
    },
    /** Invalida apenas a listagem geral de uma empresa */
    invalidateAllEvents: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: [...eventQueryKeys.byCompany(companyId), 'all'],
      });
    },
    /** Invalida apenas a listagem de um cliente */
    invalidateAllClientEvents: (companyId: string, clientId: string) => {
      queryClient.invalidateQueries({
        queryKey: [...eventQueryKeys.byCompany(companyId), 'client', clientId, 'all'],
      });
    },
    /** Invalida apenas as audiências de uma empresa */
    invalidateHearings: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: [...eventQueryKeys.byCompany(companyId), 'hearing'],
      });
    },
    /** Invalida apenas as reuniões de uma empresa */
    invalidateMeetings: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: [...eventQueryKeys.byCompany(companyId), 'meeting'],
      });
    },
    /** Invalida apenas os prazos de uma empresa */
    invalidateTerms: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: [...eventQueryKeys.byCompany(companyId), 'term'],
      });
    },
    /** Invalida o detalhe de um evento específico */
    invalidateEvent: (companyId: string, eventId: string) => {
      queryClient.invalidateQueries({
        queryKey: eventQueryKeys.detail(companyId, eventId),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para operações de eventos jurídicos.
 * Centraliza todas as mutations e seus estados derivados em uma única interface.
 */
export function useEventOperations() {
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  return {
    // Mutations
    createEvent: createEventMutation,
    updateEvent: updateEventMutation,
    deleteEvent: deleteEventMutation,

    // Estados combinados
    isLoading:
      createEventMutation.isPending ||
      updateEventMutation.isPending ||
      deleteEventMutation.isPending,

    isError:
      createEventMutation.isError ||
      updateEventMutation.isError ||
      deleteEventMutation.isError,

    error:
      createEventMutation.error?.message ||
      updateEventMutation.error?.message ||
      deleteEventMutation.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção dos demais hooks
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useAllEvents,
  useHearings,
  useMeetings,
  useTerms,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  useEventOperations,
  useInvalidateEvents,
  useAllClientEvents
};