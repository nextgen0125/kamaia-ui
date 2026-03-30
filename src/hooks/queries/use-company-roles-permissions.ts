import { useQuery, useQueryClient } from '@tanstack/react-query';
import { companyRolesPermissionsService } from '@/services/company-roles-permissions-service';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Roles e permissões são dados de referência — mudam raramente,
 * por isso ficam agrupados sob uma raiz comum para facilitar
 * invalidações em lote quando necessário.
 */
export const companyRolesPermissionsQueryKeys = {
  all: ['company-roles-permissions'] as const,
  roles: () => [...companyRolesPermissionsQueryKeys.all, 'roles'] as const,
  permissions: () => [...companyRolesPermissionsQueryKeys.all, 'permissions'] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista todos os roles disponíveis para empresas/escritórios de advocacia.
 * Endpoint: GET /v1/companies/roles
 * Requer apenas autenticação.
 *
 * staleTime elevado (10 min) pois roles são dados de referência
 * que raramente mudam em runtime.
 *
 * @returns Query com lista de roles
 */
export function useCompanyRoles() {
  return useQuery({
    queryKey: companyRolesPermissionsQueryKeys.roles(),
    queryFn: () => companyRolesPermissionsService.getCompanyRoles(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista todas as permissões disponíveis para empresas/escritórios de advocacia.
 * Endpoint: GET /v1/companies/permissions
 * Requer apenas autenticação.
 *
 * staleTime elevado (10 min) pois permissões são dados de referência
 * que raramente mudam em runtime.
 *
 * @returns Query com lista de permissões
 */
export function useCompanyPermissions() {
  return useQuery({
    queryKey: companyRolesPermissionsQueryKeys.permissions(),
    queryFn: () => companyRolesPermissionsService.getCompanyPermissions(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403) {
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
 * Utilitários para invalidação manual do cache de roles e permissões.
 * Útil após operações administrativas que possam alterar o catálogo
 * de roles/permissões disponíveis.
 */
export function useInvalidateCompanyRolesPermissions() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de roles e permissões */
    invalidateAll: () => {
      queryClient.invalidateQueries({
        queryKey: companyRolesPermissionsQueryKeys.all,
      });
    },
    /** Invalida apenas o cache de roles */
    invalidateRoles: () => {
      queryClient.invalidateQueries({
        queryKey: companyRolesPermissionsQueryKeys.roles(),
      });
    },
    /** Invalida apenas o cache de permissões */
    invalidatePermissions: () => {
      queryClient.invalidateQueries({
        queryKey: companyRolesPermissionsQueryKeys.permissions(),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para roles e permissões de empresas.
 * Dispara ambas as queries em paralelo e expõe estados derivados unificados.
 * Ideal para formulários que precisam de roles e permissões simultaneamente,
 * como o formulário de criação/edição de ACL.
 */
export function useCompanyRolesAndPermissions() {
  const rolesQuery = useCompanyRoles();
  const permissionsQuery = useCompanyPermissions();

  return {
    // Dados
    roles: rolesQuery.data ?? [],
    permissions: permissionsQuery.data ?? [],

    // Queries individuais expostas para casos de uso específicos
    rolesQuery,
    permissionsQuery,

    // Estados combinados
    isLoading: rolesQuery.isLoading || permissionsQuery.isLoading,
    isFetching: rolesQuery.isFetching || permissionsQuery.isFetching,
    isError: rolesQuery.isError || permissionsQuery.isError,
    error: rolesQuery.error?.message || permissionsQuery.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção dos demais hooks
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useCompanyRoles,
  useCompanyPermissions,
  useCompanyRolesAndPermissions,
  useInvalidateCompanyRolesPermissions,
};