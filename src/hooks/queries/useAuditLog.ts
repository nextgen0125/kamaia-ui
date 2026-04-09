import { useQuery, useQueryClient } from '@tanstack/react-query';
import { auditLogService } from '@/services/audit-log-service';
import { IAuditLogFilters } from '@/interfaces/IAuditLog';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Audit logs são dados de leitura pesada com filtros ricos (ação, entidade,
 * intervalo de datas), por isso os filtros fazem parte da chave — garantindo
 * que cada combinação de filtros tenha seu próprio cache independente.
 *
 * Hierarquia:
 * ['audit-logs']
 *   └── ['audit-logs', companyId]
 *         └── ['audit-logs', companyId, 'list', filters?]
 */
export const auditLogQueryKeys = {
  all: ['audit-logs'] as const,

  // Escopo por empresa
  byCompany: (companyId: string) =>
    [...auditLogQueryKeys.all, companyId] as const,

  // Listas filtradas de uma empresa
  lists: (companyId: string) =>
    [...auditLogQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: IAuditLogFilters) =>
    [...auditLogQueryKeys.lists(companyId), filters] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista os registros de auditoria de uma empresa com paginação e filtros.
 * Endpoint: GET /v1/companies/:company_id/audit-logs
 * Requer role SUPER_ADMIN ou ADMINISTRATOR com permissão audit_log:view.
 *
 * Filtros disponíveis: page, take, action, entity_type, start_date, end_date.
 *
 * staleTime curto (30s) — audit logs são dados sensíveis e de alta frequência
 * de escrita no backend, portanto o cache deve expirar rapidamente para
 * garantir que a listagem reflita o estado mais recente do sistema.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação e busca opcionais
 * @returns         Query com lista paginada de audit logs
 */
export function useAuditLogs(companyId: string, filters?: IAuditLogFilters) {
  return useQuery({
    queryKey: auditLogQueryKeys.list(companyId, filters),
    queryFn: () => auditLogService.getAuditLogs(companyId, filters),
    enabled: !!companyId,
    staleTime: 30 * 1000, // 30 segundos — dados de auditoria mudam com alta frequência
    retry: (failureCount, error: any) => {
      // Sem retry em erros de autorização — o usuário simplesmente não tem acesso
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de audit logs.
 * Útil após operações críticas que geram logs no backend e onde
 * se deseja forçar o recarregamento imediato da listagem.
 */
export function useInvalidateAuditLogs() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de audit logs (todas as empresas) */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: auditLogQueryKeys.all });
    },
    /** Invalida todo o cache de audit logs de uma empresa específica */
    invalidateByCompany: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: auditLogQueryKeys.byCompany(companyId),
      });
    },
    /** Invalida apenas as listas de uma empresa (preserva outros escopos) */
    invalidateLists: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: auditLogQueryKeys.lists(companyId),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção dos demais hooks
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useAuditLogs,
  useInvalidateAuditLogs,
};