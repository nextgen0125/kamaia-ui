import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { ICompany, CreateCompanyData, UpdateCompanyData, CompanyFilters, PaginatedCompanies } from '@/interfaces/ICompany';

/**
 * Service de empresas/escritórios de advocacia.
 * Herda a instância Axios configurada do AuthService (interceptors,
 * token automático, refresh, tratamento de erros etc.).
 */
class CompanyService {
  /**
   * Instância Axios já configurada com interceptors de autenticação,
   * refresh-token e tratamento de erros centralizado — herdada do AuthService.
   */
  private api: AxiosInstance;

  constructor() {
    // Reutiliza a instância singleton do AuthService para não duplicar
    // interceptors, base URL ou lógica de token.
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies  — Cadastrar empresa  [SUPER_ADMIN]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cria uma nova empresa/escritório de advocacia.
   * Requer role SUPER_ADMIN.
   * @param companyData Dados da empresa a ser criada
   * @returns Empresa criada
   */
  async createCompany(companyData: CreateCompanyData): Promise<ICompany> {
    try {
      const response: AxiosResponse<ICompany> = await this.api.post(
        '/v1/companies',
        companyData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao criar empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies?page=1&take=9  — Listar empresas  [SUPER_ADMIN]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todas as empresas/escritórios de advocacia com paginação.
   * Requer role SUPER_ADMIN.
   * @param filters Filtros opcionais de paginação (page, take)
   * @returns Lista paginada de empresas
   */
  async getCompanies(filters?: CompanyFilters): Promise<PaginatedCompanies> {
    try {
      const response: AxiosResponse<PaginatedCompanies> = await this.api.get(
        '/v1/companies',
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar empresas');
    } catch (error) {
      throw error;
    }
  }


    // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:id  — Busca uma empresa
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Busca uma empresa/escritório de advocacia pelo ID.
   * @returns Empresa
   */
  async getCompany(companyId: string): Promise<ICompany> {
    try {
      const response: AxiosResponse<ICompany> = await this.api.get(
        `/v1/companies/${companyId}`,
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao buscar a empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies  — Atualizar empresa  [SUPER_ADMIN | ADMINISTRATOR]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza dados de uma empresa/escritório de advocacia.
   * Requer role SUPER_ADMIN ou ADMINISTRATOR (via canOrIs).
   * @param companyData Dados parciais para atualização
   * @returns Empresa atualizada
   */
  async updateCompany(companyData: UpdateCompanyData): Promise<ICompany> {
    try {
      const response: AxiosResponse<ICompany> = await this.api.put(
        '/v1/companies',
        companyData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao atualizar empresa');
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção do auth-service
export const companyService = new CompanyService();
export default companyService;