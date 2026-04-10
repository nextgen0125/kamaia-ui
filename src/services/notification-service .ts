import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import {
  INotification,
  ICreateNotificationData,
  IUpdateNotificationData,
  INotificationFilters,
  IPaginatedNotifications,
} from '@/interfaces/INotification';

/**
 * Service de notificações.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 *
 * Todas as rotas são escopadas por empresa:
 * /v1/companies/:company_id/notifications[/:id]
 *
 */
class NotificationService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/notifications
  // Listar notificações  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista as notificações do utilizador autenticado dentro de uma empresa,
   * com paginação e filtros opcionais.
   * Acessível a múltiplos roles via canOrIs (notification:view | notification:manage).
   *
   * Filtros suportados via query params:
   * - page, take     → paginação
   * - type           → filtrar por tipo (deadline, meeting, task, document, system)
   * - priority       → filtrar por prioridade (high, medium, low)
   * - is_read        → filtrar por estado de leitura (true | false)
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação e busca opcionais
   * @returns         Lista paginada de notificações com contagem de não lidas
   */
  async getNotifications(
    companyId: string,
    filters?: INotificationFilters
  ): Promise<IPaginatedNotifications> {
    try {
      const response: AxiosResponse<IPaginatedNotifications> = await this.api.get(
        `/v1/companies/${companyId}/notifications`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar notificações');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies/:company_id/notifications
  // Criar notificação  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (notification:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cria uma nova notificação para um utilizador dentro do tenant (empresa).
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão notification:manage.
   *
   * @param companyId        UUID da empresa/escritório de advocacia
   * @param notificationData Dados da notificação a ser criada
   * @returns                Notificação criada
   */
  async createNotification(
    companyId: string,
    notificationData: ICreateNotificationData
  ): Promise<INotification> {
    try {
      const response: AxiosResponse<INotification> = await this.api.post(
        `/v1/companies/${companyId}/notifications`,
        notificationData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao criar notificação');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies/:company_id/notifications/:id
  // Atualizar notificação  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (notification:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza o estado de leitura de uma notificação específica,
   * ou marca todas as notificações do utilizador como lidas via mark_all_read.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão notification:manage.
   *
   * @param companyId        UUID da empresa/escritório de advocacia
   * @param notificationId   UUID da notificação a ser atualizada
   * @param notificationData Dados de atualização ({ is_read } ou { mark_all_read })
   * @returns                Notificação atualizada
   */
  async updateNotification(
    companyId: string,
    notificationId: string,
    notificationData: IUpdateNotificationData
  ): Promise<INotification> {
    try {
      const response: AxiosResponse<INotification> = await this.api.put(
        `/v1/companies/${companyId}/notifications/${notificationId}`,
        notificationData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao atualizar notificação');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DELETE /v1/companies/:company_id/notifications/:id
  // Eliminar notificação  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (notification:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Elimina uma notificação específica de uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão notification:manage.
   *
   * @param companyId      UUID da empresa/escritório de advocacia
   * @param notificationId UUID da notificação a ser eliminada
   */
  async deleteNotification(
    companyId: string,
    notificationId: string
  ): Promise<void> {
    try {
      await this.api.delete(
        `/v1/companies/${companyId}/notifications/${notificationId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção dos demais services
export const notificationService = new NotificationService();
export default notificationService;