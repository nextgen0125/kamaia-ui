import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import { IAuditLogFilters, IPaginatedAuditLogs } from '@/interfaces/IAuditLog';

/**
 * Service de logs de auditoria.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 *
 * Audit logs são imutáveis pelo frontend: apenas leitura é permitida.
 * Rota escopada por empresa: /v1/companies/:company_id/audit-logs
 */
class AuditLogService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/audit-logs
  // Listar logs  [SUPER_ADMIN | ADMINISTRATOR (audit_log:view)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista os registros de auditoria de uma empresa com paginação e filtros.
   * Requer role SUPER_ADMIN ou ADMINISTRATOR com permissão audit_log:view.
   *
   * Filtros suportados via query params:
   * - page, take       → paginação
   * - action           → filtrar por tipo de ação (CREATE, UPDATE, DELETE…)
   * - entity_type      → filtrar pela entidade auditada (ex.: "Process", "User")
   * - start_date       → data de início do intervalo
   * - end_date         → data de fim do intervalo
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros opcionais de paginação e busca
   * @returns         Lista paginada de audit logs
   */
  async getAuditLogs(
    companyId: string,
    filters?: IAuditLogFilters
  ): Promise<IPaginatedAuditLogs> {
    try {
      const response: AxiosResponse<IPaginatedAuditLogs> = await this.api.get(
        `/v1/companies/${companyId}/audit-logs`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar logs de auditoria');
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção dos demais services
export const auditLogService = new AuditLogService();
export default auditLogService;