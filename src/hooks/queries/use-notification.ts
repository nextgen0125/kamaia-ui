import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ICreateNotificationData,
  IUpdateNotificationData,
  INotificationFilters,
} from '@/interfaces/INotification';
import notificationService from '@/services/notification-service ';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Os filtros (type, priority, is_read, page, take) fazem parte da chave
 * para que cada combinação tenha seu próprio cache — essencial para
 * que abas de "não lidas" e "todas" não se contaminem mutuamente.
 *
 * Hierarquia:
 * ['notifications']
 *   └── ['notifications', companyId]
 *         └── ['notifications', companyId, 'list', filters?]
 */
export const notificationQueryKeys = {
  all: ['notifications'] as const,

  // Escopo por empresa
  byCompany: (companyId: string) =>
    [...notificationQueryKeys.all, companyId] as const,

  // Listas filtradas de uma empresa
  lists: (companyId: string) =>
    [...notificationQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: INotificationFilters) =>
    [...notificationQueryKeys.lists(companyId), filters] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista as notificações do utilizador autenticado dentro de uma empresa.
 * Endpoint: GET /v1/companies/:company_id/notifications
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER
 * com permissão notification:view ou notification:manage.
 *
 * staleTime de 30s — notificações são geradas em tempo real pelo backend
 * e o utilizador espera ver novos itens rapidamente sem intervenção manual.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros opcionais (page, take, type, priority, is_read)
 * @returns         Query com lista paginada de notificações e unread_count
 */
export function useNotifications(
  companyId: string,
  filters?: INotificationFilters
) {
  return useQuery({
    queryKey: notificationQueryKeys.list(companyId, filters),
    queryFn: () => notificationService.getNotifications(companyId, filters),
    enabled: !!companyId,
    staleTime: 30 * 1000, // 30 segundos — notificações mudam com alta frequência
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403) {
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
 * Cria uma nova notificação para um utilizador dentro do tenant.
 * Endpoint: POST /v1/companies/:company_id/notifications
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
 * com permissão notification:manage.
 *
 * @returns Mutation para criação de notificação
 */
export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      notificationData,
    }: {
      companyId: string;
      notificationData: ICreateNotificationData;
    }) => notificationService.createNotification(companyId, notificationData),
    onSuccess: (_, { companyId }) => {
      // Invalida todas as listas da empresa — o unread_count também muda
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao criar notificação:', error);
    },
  });
}

/**
 * Atualiza o estado de leitura de uma notificação.
 * Endpoint: PUT /v1/companies/:company_id/notifications/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
 * com permissão notification:manage.
 *
 * Suporta dois casos de uso via payload:
 * - { is_read: boolean }     → marca notificação específica
 * - { mark_all_read: true }  → marca todas como lidas
 *
 * Quando mark_all_read é usado, todas as listas são invalidadas pois
 * o unread_count e o estado is_read de múltiplos registros muda.
 *
 * @returns Mutation para atualização de estado de leitura
 */
export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      notificationId,
      notificationData,
    }: {
      companyId: string;
      notificationId: string;
      notificationData: IUpdateNotificationData;
    }) =>
      notificationService.updateNotification(
        companyId,
        notificationId,
        notificationData
      ),
    onSuccess: (updatedNotification, { companyId, notificationData }) => {
      if (notificationData.mark_all_read) {
        // mark_all_read altera múltiplos registros — invalida tudo
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.lists(companyId),
        });
      } else {
        // Atualização pontual — invalida todas as listas para manter
        // unread_count consistente entre views filtradas e não filtradas
        queryClient.invalidateQueries({
          queryKey: notificationQueryKeys.lists(companyId),
        });
      }
    },
    onError: (error) => {
      console.error('Erro ao atualizar notificação:', error);
    },
  });
}

/**
 * Elimina uma notificação específica de uma empresa.
 * Endpoint: DELETE /v1/companies/:company_id/notifications/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
 * com permissão notification:manage.
 *
 * @returns Mutation para eliminação de notificação
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      notificationId,
    }: {
      companyId: string;
      notificationId: string;
    }) => notificationService.deleteNotification(companyId, notificationId),
    onSuccess: (_, { companyId }) => {
      // Invalida listas para atualizar total, unread_count e paginação
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao eliminar notificação:', error);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de notificações.
 * Útil para forçar recarregamento após eventos de WebSocket/SSE
 * ou após polling de novas notificações.
 */
export function useInvalidateNotifications() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de notificações (todas as empresas) */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
    /** Invalida todo o cache de notificações de uma empresa específica */
    invalidateByCompany: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.byCompany(companyId),
      });
    },
    /** Invalida apenas as listas de uma empresa */
    invalidateLists: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(companyId),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para operações de notificações.
 * Centraliza todas as mutations e seus estados derivados em uma única interface.
 */
export function useNotificationOperations() {
  const createNotificationMutation = useCreateNotification();
  const updateNotificationMutation = useUpdateNotification();
  const deleteNotificationMutation = useDeleteNotification();

  return {
    // Mutations
    createNotification: createNotificationMutation,
    updateNotification: updateNotificationMutation,
    deleteNotification: deleteNotificationMutation,

    // Estados combinados
    isLoading:
      createNotificationMutation.isPending ||
      updateNotificationMutation.isPending ||
      deleteNotificationMutation.isPending,

    isError:
      createNotificationMutation.isError ||
      updateNotificationMutation.isError ||
      deleteNotificationMutation.isError,

    error:
      createNotificationMutation.error?.message ||
      updateNotificationMutation.error?.message ||
      deleteNotificationMutation.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção dos demais hooks
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useNotifications,
  useCreateNotification,
  useUpdateNotification,
  useDeleteNotification,
  useNotificationOperations,
  useInvalidateNotifications,
};