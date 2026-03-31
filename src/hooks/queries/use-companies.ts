import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateCompanyData, UpdateCompanyData, CompanyFilters } from '@/interfaces/ICompany';
import companyService from '@/services/company-service';

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Chaves de query para React Query.
 * Estrutura hierárquica que permite invalidações granulares.
 */
export const companyQueryKeys = {
  all: ['companies'] as const,
  lists: () => [...companyQueryKeys.all, 'list'] as const,
  list: (filters?: CompanyFilters) => [...companyQueryKeys.lists(), filters] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Lista empresas/escritórios de advocacia com paginação e filtros.
 * Endpoint: GET /v1/companies?page=1&take=9
 * @param filters Filtros de paginação (page, take)
 * @returns Query com lista paginada de empresas
 */
export function useCompanies(filters?: CompanyFilters) {
  return useQuery({
    queryKey: companyQueryKeys.list(filters),
    queryFn: () => companyService.getCompanies(filters),
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: (failureCount, error: any) => {
      // Não tentar novamente em erros de autorização
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Busca uma empresa/escritório de advocacia pelo ID.
 * Endpoint: GET /v1/companies/:id
 * @param CompanyId ID da empresa/escritório
 * @returns Query com a empresa ou escritório
 */
export function useCompany(companyId: string) {
  return useQuery({
    queryKey: companyQueryKeys.list({ companyId }),
    queryFn: () => companyService.getCompany(companyId),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!companyId,
    retry: (failureCount, error: any) => {
      // Não tentar novamente em erros de autorização
      if (error?.status === 401 || error?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Busca uma empresa/escritório de advocacia pelo ID.
 * Endpoint: GET /v1/companies/:id
 * @param CompanyId ID da empresa/escritório
 * @param Page Página para o filtro do KPIs da empresa/escritório
 * @returns Query com o KPIS da empresa
 */
export function useCompanyKPIs (companyId: string, page: string) {
  return useQuery({
    queryKey: companyQueryKeys.list({ companyId }),
    queryFn: () => companyService.getCompanyKPIs(companyId, page),
    staleTime: 10 * 60 * 1000, // 10 minutos
    enabled: !!companyId && !!page,
    retry: (failureCount, error: any) => {
      // Não tentar novamente em erros de autorização
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
 * Cria uma nova empresa/escritório de advocacia.
 * Endpoint: POST /v1/companies
 * Requer role SUPER_ADMIN.
 * @returns Mutation para criação de empresa
 */
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyData: CreateCompanyData) =>
      companyService.createCompany(companyData),
    onSuccess: () => {
      // Invalida todas as listas para refletir o novo registro
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() });
    },
    onError: (error) => {
      console.error('Erro ao criar empresa:', error);
    },
  });
}

/**
 * Atualiza dados de uma empresa/escritório de advocacia.
 * Endpoint: PUT /v1/companies
 * Requer role SUPER_ADMIN ou ADMINISTRATOR.
 * @returns Mutation para atualização de empresa
 */
export function useUpdateCompany(company_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyData: UpdateCompanyData) =>
      companyService.updateCompany(companyData, company_id),
    onSuccess: () => {
      // Invalida listas para refletir as alterações
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.list({ companyId: company_id }) });
    },
    onError: (error) => {
      console.error('Erro ao atualizar empresa:', error);
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Utilitários para invalidação manual do cache de empresas.
 * Útil quando uma ação externa precisa forçar o recarregamento dos dados.
 */
export function useInvalidateCompanies() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    },
    invalidateLists: () => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hook combinado para operações de empresas.
 * Centraliza mutations e estados derivados em uma única interface.
 */
export function useCompanyOperations(company_id: string) {
  const createCompanyMutation = useCreateCompany();
  const updateCompanyMutation = useUpdateCompany(company_id);

  return {
    // Mutations
    createCompany: createCompanyMutation,
    updateCompany: updateCompanyMutation,

    // Estados combinados
    isLoading:
      createCompanyMutation.isPending ||
      updateCompanyMutation.isPending,

    isError:
      createCompanyMutation.isError ||
      updateCompanyMutation.isError,

    error:
      createCompanyMutation.error?.message ||
      updateCompanyMutation.error?.message,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Default export
// ─────────────────────────────────────────────────────────────────────────────

export default {
  useCompanies,
  useCreateCompany,
  useUpdateCompany,
  useCompanyOperations,
  useInvalidateCompanies,
  useCompanyKPIs,
  useCompany
};