import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import {
  IProcess,
  ICreateProcessData,
  IUpdateProcessData,
  IProcessFilters,
  IPaginatedProcesses,
} from '@/interfaces/IProcess';

/**
 * Service de processos jurídicos.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 *
 * Todas as rotas são escopadas por empresa:
 * /v1/companies/:company_id/processes[/:id]
 */
class ProcessService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies/:company_id/processes
  // Criar processo  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY (process:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cadastra um novo processo jurídico vinculado a uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR ou ATTORNEY
   * com permissão process:manage.
   *
   * @param companyId   UUID da empresa/escritório de advocacia
   * @param processData Dados do processo a ser criado
   * @returns           Processo criado
   */
  async createProcess(
    companyId: string,
    processData: ICreateProcessData
  ): Promise<IProcess> {
    try {
      const response: AxiosResponse<IProcess> = await this.api.post(
        `/v1/companies/${companyId}/processes`,
        processData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao criar processo');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/processes?page=1&take=10
  // Listar processos  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todos os processos jurídicos de uma empresa com paginação.
   * Acessível a múltiplos roles via canOrIs (process:view | process:manage).
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de processos
   */
  async getProcesses(
    companyId: string,
    filters?: IProcessFilters
  ): Promise<IPaginatedProcesses> {
    try {
      const response: AxiosResponse<IPaginatedProcesses> = await this.api.get(
        `/v1/companies/${companyId}/processes`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar processos');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies/:company_id/processes/:id
  // Atualizar processo  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (process:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza os dados de um processo jurídico existente.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão process:manage.
   *
   * @param companyId   UUID da empresa/escritório de advocacia
   * @param processId   UUID do processo a ser atualizado
   * @param processData Dados parciais para atualização
   * @returns           Processo atualizado
   */
  async updateProcess(
    companyId: string,
    processId: string,
    processData: IUpdateProcessData
  ): Promise<IProcess> {
    try {
      const response: AxiosResponse<IProcess> = await this.api.put(
        `/v1/companies/${companyId}/processes/${processId}`,
        processData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao atualizar processo');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DELETE /v1/companies/:company_id/processes/:id
  // Remover processo  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (process:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Remove um processo jurídico de uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão process:manage.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param processId UUID do processo a ser removido
   */
  async deleteProcess(companyId: string, processId: string): Promise<void> {
    try {
      await this.api.delete(
        `/v1/companies/${companyId}/processes/${processId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção dos demais services
export const processService = new ProcessService();
export default processService;