import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ICreateCompanyACLData,
  IUpdateCompanyACLData,
  ICompanyACLFilters,
} from '@/interfaces/ICompanyACL';
import companyACLService from '@/services/company-acl-service';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Estrutura hierárquica que permite invalidações granulares por empresa,
 * por tipo de listagem (geral vs. advogado) e por entrada individual de ACL.
 */
export const companyACLQueryKeys = {
  all: ['company-acl'] as const,

  // Escopo por empresa
  byCompany: (companyId: string) =>
    [...companyACLQueryKeys.all, companyId] as const,

  // Lista geral de ACL (com funcionários)
  lists: (companyId: string) =>
    [...companyACLQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: ICompanyACLFilters) =>
    [...companyACLQueryKeys.lists(companyId), filters] as const,

  // Lista específica de ACL do advogado
  attorneyLists: (companyId: string) =>
    [...companyACLQueryKeys.byCompany(companyId), 'attorney-list'] as const,
  attorneyList: (companyId: string, filters?: ICompanyACLFilters) =>
    [...companyACLQueryKeys.attorneyLists(companyId), filters] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista todos os registros de ACL de uma empresa com dados dos funcionários.
 * Endpoint: GET /v1/companies/:company_id/company-acl/list
 * Requer role SUPER_ADMIN ou ADMINISTRATOR.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de ACL
 */
export function useCompanyACL(companyId: string, filters?: ICompanyACLFilters) {
  return useQuery({
    queryKey: companyACLQueryKeys.list(companyId, filters),
    queryFn: () => companyACLService.getCompanyACL(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Lista os registros de ACL de uma empresa na visão do advogado.
 * Endpoint: GET /v1/companies/:company_id/company-acl/list/attorney
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de ACL do advogado
 */
export function useAttorneyACL(companyId: string, filters?: ICompanyACLFilters) {
  return useQuery({
    queryKey: companyACLQueryKeys.attorneyList(companyId, filters),
    queryFn: () => companyACLService.getAttorneyACL(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000, // 2 minutos
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
 * Adiciona um usuário à lista de controle de acesso de uma empresa.
 * Endpoint: POST /v1/companies/:company_id/company-acl/add
 * Requer role SUPER_ADMIN ou ADMINISTRATOR.
 *
 * @returns Mutation para adição de usuário à ACL
 */
export function useAddUserToCompanyACL() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      aclData,
    }: {
      companyId: string;
      aclData: ICreateCompanyACLData;
    }) => companyACLService.addUserToACL(companyId, aclData),
    onSuccess: (_, { companyId }) => {
      // Invalida tanto a lista geral quanto a lista de advogados da empresa
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.lists(companyId),
      });
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.attorneyLists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao adicionar usuário à ACL:', error);
    },
  });
}

/**
 * Atualiza os roles e permissões de uma entrada de ACL existente.
 * Endpoint: PUT /v1/companies/:id/:company_id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
 * com permissão company_acl:manage.
 *
 * @returns Mutation para atualização de entrada de ACL
 */
export function useUpdateCompanyACLEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      aclId,
      companyId,
      aclData,
    }: {
      aclId: string;
      companyId: string;
      aclData: IUpdateCompanyACLData;
    }) => companyACLService.updateACLEntry(aclId, companyId, aclData),
    onSuccess: (_, { companyId }) => {
      // Invalida ambas as listas da empresa afetada
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.lists(companyId),
      });
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.attorneyLists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar entrada de ACL:', error);
    },
  });
}

/**
 * Remove um usuário da lista de controle de acesso de uma empresa.
 * Endpoint: DELETE /v1/companies/:id/:company_id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
 * com permissão company_acl:manage.
 *
 * @returns Mutation para remoção de entrada de ACL
 */
export function useDeleteACLEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      aclId,
      companyId,
    }: {
      aclId: string;
      companyId: string;
    }) => companyACLService.deleteACLEntry(aclId, companyId),
    onSuccess: (_, { companyId }) => {
      // Remove cache e invalida listas da empresa afetada
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.lists(companyId),
      });
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.attorneyLists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao remover entrada de ACL:', error);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de ACL.
 * Útil quando uma ação externa (ex.: mudança de role global) precisa
 * forçar o recarregamento dos dados de uma empresa específica.
 */
export function useInvalidateCompanyACL() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de ACL (todas as empresas) */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: companyACLQueryKeys.all });
    },
    /** Invalida todo o cache de ACL de uma empresa específica */
    invalidateByCompany: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.byCompany(companyId),
      });
    },
    /** Invalida apenas a lista geral de ACL de uma empresa */
    invalidateLists: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.lists(companyId),
      });
    },
    /** Invalida apenas a lista de ACL de advogados de uma empresa */
    invalidateAttorneyLists: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: companyACLQueryKeys.attorneyLists(companyId),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para operações de ACL de empresas.
 * Centraliza todas as mutations e seus estados derivados em uma única interface.
 */
export function useCompanyACLOperations() {
  const addUserMutation = useAddUserToCompanyACL();
  const updateACLMutation = useUpdateCompanyACLEntry();
  const deleteACLMutation = useDeleteACLEntry();

  return {
    // Mutations
    addUser: addUserMutation,
    updateACL: updateACLMutation,
    deleteACL: deleteACLMutation,

    // Estados combinados
    isLoading:
      addUserMutation.isPending ||
      updateACLMutation.isPending ||
      deleteACLMutation.isPending,

    isError:
      addUserMutation.isError ||
      updateACLMutation.isError ||
      deleteACLMutation.isError,

    error:
      addUserMutation.error?.message ||
      updateACLMutation.error?.message ||
      deleteACLMutation.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção do useUser.ts e useCompany.ts
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useCompanyACL,
  useAttorneyACL,
  useAddUserToCompanyACL,
  useUpdateCompanyACLEntry,
  useDeleteACLEntry,
  useCompanyACLOperations,
  useInvalidateCompanyACL,
};