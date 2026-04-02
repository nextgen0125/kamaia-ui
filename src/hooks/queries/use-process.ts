import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { processService } from '@/services/process-service';
import {
  ICreateProcessData,
  IUpdateProcessData,
  IProcessFilters,
} from '@/interfaces/IProcess';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Estrutura hierárquica escopada por empresa, permitindo invalidações
 * granulares por empresa ou por processo individual.
 */
export const processQueryKeys = {
  all: ['processes'] as const,

  // Escopo por empresa
  byCompany: (companyId: string) =>
    [...processQueryKeys.all, companyId] as const,

  // Listas paginadas de uma empresa
  lists: (companyId: string) =>
    [...processQueryKeys.byCompany(companyId), 'list'] as const,
  list: (companyId: string, filters?: IProcessFilters) =>
    [...processQueryKeys.lists(companyId), filters] as const,

  // Detalhe de um processo individual
  details: (companyId: string) =>
    [...processQueryKeys.byCompany(companyId), 'detail'] as const,
  detail: (companyId: string, processId: string) =>
    [...processQueryKeys.details(companyId), processId] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista todos os processos jurídicos de uma empresa com paginação.
 * Endpoint: GET /v1/companies/:company_id/processes?page=1&take=10
 * Acessível a SUPER_ADMIN, ADMINISTRATOR, ATTORNEY, ASSISTANT e VISUALIZER
 * com permissão process:view ou process:manage.
 *
 * @param companyId UUID da empresa/escritório de advocacia
 * @param filters   Filtros de paginação opcionais (page, take)
 * @returns         Query com lista paginada de processos
 */
export function useProcesses(companyId: string, filters?: IProcessFilters) {
  return useQuery({
    queryKey: processQueryKeys.list(companyId, filters),
    queryFn: () => processService.getProcesses(companyId, filters),
    enabled: !!companyId,
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: (failureCount, error: any) => {
      if (
        error?.status === 401 ||
        error?.status === 403 ||
        error?.status === 404
      ) {
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
 * Cadastra um novo processo jurídico vinculado a uma empresa.
 * Endpoint: POST /v1/companies/:company_id/processes
 * Requer role SUPER_ADMIN, ADMINISTRATOR ou ATTORNEY com process:manage.
 *
 * @returns Mutation para criação de processo
 */
export function useCreateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      processData,
    }: {
      companyId: string;
      processData: ICreateProcessData;
    }) => processService.createProcess(companyId, processData),
    onSuccess: (_, { companyId }) => {
      // Invalida apenas as listas da empresa onde o processo foi criado
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.lists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao criar processo:', error);
    },
  });
}

/**
 * Atualiza os dados de um processo jurídico existente.
 * Endpoint: PUT /v1/companies/:company_id/processes/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT com process:manage.
 *
 * @returns Mutation para atualização de processo
 */
export function useUpdateProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      processId,
      processData,
    }: {
      companyId: string;
      processId: string;
      processData: IUpdateProcessData;
    }) => processService.updateProcess(companyId, processId, processData),
    onSuccess: (updatedProcess, { companyId, processId }) => {
      // Atualiza o detalhe do processo diretamente no cache
      queryClient.setQueryData(
        processQueryKeys.detail(companyId, processId),
        updatedProcess
      );
      // Invalida as listas para refletir as alterações
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.lists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar processo:', error);
    },
  });
}

/**
 * Remove um processo jurídico de uma empresa.
 * Endpoint: DELETE /v1/companies/:company_id/processes/:id
 * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT com process:manage.
 *
 * @returns Mutation para remoção de processo
 */
export function useDeleteProcess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      processId,
    }: {
      companyId: string;
      processId: string;
    }) => processService.deleteProcess(companyId, processId),
    onSuccess: (_, { companyId, processId }) => {
      // Remove o detalhe do processo do cache
      queryClient.removeQueries({
        queryKey: processQueryKeys.detail(companyId, processId),
      });
      // Invalida as listas da empresa afetada
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.lists(companyId),
      });
    },
    onError: (error) => {
      console.error('Erro ao remover processo:', error);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de processos.
 * Útil quando uma ação externa (ex.: mudança de status via webhook)
 * precisa forçar o recarregamento dos dados.
 */
export function useInvalidateProcesses() {
  const queryClient = useQueryClient();

  return {
    /** Invalida todo o cache de processos (todas as empresas) */
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: processQueryKeys.all });
    },
    /** Invalida todo o cache de processos de uma empresa específica */
    invalidateByCompany: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.byCompany(companyId),
      });
    },
    /** Invalida apenas as listas de processos de uma empresa */
    invalidateLists: (companyId: string) => {
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.lists(companyId),
      });
    },
    /** Invalida o detalhe de um processo específico */
    invalidateProcess: (companyId: string, processId: string) => {
      queryClient.invalidateQueries({
        queryKey: processQueryKeys.detail(companyId, processId),
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para operações de processos jurídicos.
 * Centraliza todas as mutations e seus estados derivados em uma única interface.
 */
export function useProcessOperations() {
  const createProcessMutation = useCreateProcess();
  const updateProcessMutation = useUpdateProcess();
  const deleteProcessMutation = useDeleteProcess();

  return {
    // Mutations
    createProcess: createProcessMutation,
    updateProcess: updateProcessMutation,
    deleteProcess: deleteProcessMutation,

    // Estados combinados
    isLoading:
      createProcessMutation.isPending ||
      updateProcessMutation.isPending ||
      deleteProcessMutation.isPending,

    isError:
      createProcessMutation.isError ||
      updateProcessMutation.isError ||
      deleteProcessMutation.isError,

    error:
      createProcessMutation.error?.message ||
      updateProcessMutation.error?.message ||
      deleteProcessMutation.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export — mesma convenção dos demais hooks
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useProcesses,
  useCreateProcess,
  useUpdateProcess,
  useDeleteProcess,
  useProcessOperations,
  useInvalidateProcesses,
};