import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { ICompanyRole } from '@/interfaces/ICompanyRole';
import { ICompanyPermission } from '@/interfaces/ICompanyPermission';

/**
 * Service de Roles e Permissões das empresas/escritórios de advocacia.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 */
class CompanyRolesPermissionsService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/roles  — Listar roles  [autenticado]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todos os roles disponíveis para empresas/escritórios de advocacia.
   * Requer apenas autenticação — sem restrição de role específica.
   *
   * @returns Lista de roles da empresa
   */
  async getCompanyRoles(): Promise<ICompanyRole[]> {
    try {
      const response: AxiosResponse<ICompanyRole[]> = await this.api.get(
        '/v1/companies/roles'
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar roles da empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/permissions  — Listar permissões  [autenticado]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todas as permissões disponíveis para empresas/escritórios de advocacia.
   * Requer apenas autenticação — sem restrição de role específica.
   *
   * @returns Lista de permissões da empresa
   */
  async getCompanyPermissions(): Promise<ICompanyPermission[]> {
    try {
      const response: AxiosResponse<ICompanyPermission[]> = await this.api.get(
        '/v1/companies/permissions'
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar permissões da empresa');
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção dos demais services
export const companyRolesPermissionsService = new CompanyRolesPermissionsService();
export default companyRolesPermissionsService;