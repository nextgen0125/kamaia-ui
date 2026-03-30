import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import {
  ICompanyACL,
  ICreateCompanyACLData,
  IUpdateCompanyACLData,
  ICompanyACLFilters,
  IPaginatedCompanyACL,
  IPaginatedAttorneyACL,
} from '@/interfaces/ICompanyACL';

/**
 * Service de Lista de Controle de Acesso (ACL) das empresas/escritórios.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 */
class CompanyACLService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies/:company_id/company-acl/add
  // Adicionar usuário à ACL  [SUPER_ADMIN | ADMINISTRATOR]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cadastra/adiciona um usuário à lista de controle de acesso de uma empresa.
   * Aceita tanto criação de novo usuário (firstName, lastName, email, password…)
   * quanto vinculação de usuário já existente (user_id).
   * Requer role SUPER_ADMIN ou ADMINISTRATOR.
   *
   * @param companyId  UUID da empresa/escritório de advocacia
   * @param aclData    Dados do usuário e roles/permissões a serem atribuídas
   * @returns          Entrada de ACL criada
   */
  async addUserToACL(
    companyId: string,
    aclData: ICreateCompanyACLData
  ): Promise<ICompanyACL> {
    try {
      const response: AxiosResponse<ICompanyACL> = await this.api.post(
        `/v1/companies/${companyId}/company-acl/add`,
        aclData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao adicionar usuário à ACL da empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/company-acl/list
  // Listar ACL com funcionários  [SUPER_ADMIN | ADMINISTRATOR]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todos os registros de ACL de uma empresa com dados dos funcionários.
   * Suporta paginação via query params (page, take).
   * Requer role SUPER_ADMIN ou ADMINISTRATOR.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de registros de ACL
   */
  async getCompanyACL(
    companyId: string,
    filters?: ICompanyACLFilters
  ): Promise<IPaginatedCompanyACL> {
    try {
      const response: AxiosResponse<IPaginatedCompanyACL> = await this.api.get(
        `/v1/companies/${companyId}/company-acl/list`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar ACL da empresa');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/company-acl/list/attorney
  // Listar ACL do advogado  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista os registros de ACL de uma empresa filtrados para a visão de advogado.
   * Rota com permissões mais abertas — acessível a múltiplos roles via canOrIs.
   * Suporta paginação via query params (page, take).
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de registros de ACL do advogado
   */
  async getAttorneyACL(
    companyId: string,
    filters?: ICompanyACLFilters
  ): Promise<IPaginatedAttorneyACL> {
    try {
      const response: AxiosResponse<IPaginatedAttorneyACL> = await this.api.get(
        `/v1/companies/${companyId}/company-acl/list/attorney`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar ACL do advogado');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies/:id/:company_id
  // Atualizar entrada de ACL  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza os roles e permissões de uma entrada de ACL existente.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão company_acl:manage.
   *
   * @param aclId     UUID do registro de ACL a ser atualizado
   * @param companyId UUID da empresa/escritório de advocacia
   * @param aclData   Dados parciais de atualização (roles, permissões)
   * @returns         Entrada de ACL atualizada
   */
  async updateACLEntry(
    aclId: string,
    companyId: string,
    aclData: IUpdateCompanyACLData
  ): Promise<ICompanyACL> {
    try {
      const response: AxiosResponse<ICompanyACL> = await this.api.put(
        `/v1/companies/${aclId}/${companyId}`,
        aclData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao atualizar entrada de ACL');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DELETE /v1/companies/:id/:company_id
  // Remover entrada de ACL  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Remove um usuário da lista de controle de acesso de uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão company_acl:manage.
   *
   * @param aclId     UUID do registro de ACL a ser removido
   * @param companyId UUID da empresa/escritório de advocacia
   */
  async deleteACLEntry(aclId: string, companyId: string): Promise<void> {
    try {
      await this.api.delete(`/v1/companies/${aclId}/${companyId}`);
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção do auth-service e company-service
export const companyACLService = new CompanyACLService();
export default companyACLService;