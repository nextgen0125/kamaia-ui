import { AxiosInstance, AxiosResponse } from 'axios';
import { authService } from './auth-service';
import {
  IEvent,
  ICreateEventData,
  IUpdateEventData,
  IEventFilters,
  IPaginatedEvents,
} from '@/interfaces/IEvent';

/**
 * Service de eventos jurídicos.
 * Reutiliza a instância Axios do AuthService — interceptors de token,
 * refresh automático e tratamento de erros já estão configurados.
 *
 * Todas as rotas são escopadas por empresa:
 * /v1/companies/:company_id/events[/:id]
 */
class EventService {
  /**
   * Instância Axios compartilhada com o AuthService.
   * Herdada via getApiInstance() para evitar duplicação de interceptors.
   */
  private api: AxiosInstance;

  constructor() {
    this.api = authService.getApiInstance();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // POST /v1/companies/:company_id/events
  // Criar evento  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (event:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Cadastra um novo evento jurídico vinculado a uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão event:manage.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param eventData Dados do evento a ser criado
   * @returns         Evento criado
   */
  async createEvent(
    companyId: string,
    eventData: ICreateEventData
  ): Promise<IEvent> {
    try {
      const response: AxiosResponse<IEvent> = await this.api.post(
        `/v1/companies/${companyId}/events`,
        eventData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao criar evento');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/events
  // Listar todos os eventos  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista todos os eventos jurídicos de uma empresa com paginação,
   * independentemente do tipo (audiência, reunião, prazo, videoconferência).
   *
   * Nota: no backend esta rota está registada com o método PUT e o controller
   * GetAllEventsController — o frontend consome-a corretamente como GET.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de eventos
   */
  async getAllEvents(
    companyId: string,
    filters?: IEventFilters
  ): Promise<IPaginatedEvents> {
    try {
      const response: AxiosResponse<IPaginatedEvents> = await this.api.get(
        `/v1/companies/${companyId}/events`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar eventos');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/events/hearing
  // Listar audiências  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista os eventos do tipo Audiência de uma empresa com paginação.
   * Acessível a múltiplos roles via canOrIs (event:view | event:manage).
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de audiências
   */
  async getHearings(
    companyId: string,
    filters?: IEventFilters
  ): Promise<IPaginatedEvents> {
    try {
      const response: AxiosResponse<IPaginatedEvents> = await this.api.get(
        `/v1/companies/${companyId}/events/hearing`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar audiências');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/events/meeting
  // Listar reuniões  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista os eventos do tipo Reunião de uma empresa com paginação.
   * Acessível a múltiplos roles via canOrIs (event:view | event:manage).
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de reuniões
   */
  async getMeetings(
    companyId: string,
    filters?: IEventFilters
  ): Promise<IPaginatedEvents> {
    try {
      const response: AxiosResponse<IPaginatedEvents> = await this.api.get(
        `/v1/companies/${companyId}/events/meeting`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar reuniões');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // GET /v1/companies/:company_id/events/term
  // Listar prazos  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT | VISUALIZER]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Lista os eventos do tipo Prazo de uma empresa com paginação.
   * Acessível a múltiplos roles via canOrIs (event:view | event:manage).
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param filters   Filtros de paginação opcionais (page, take)
   * @returns         Lista paginada de prazos
   */
  async getTerms(
    companyId: string,
    filters?: IEventFilters
  ): Promise<IPaginatedEvents> {
    try {
      const response: AxiosResponse<IPaginatedEvents> = await this.api.get(
        `/v1/companies/${companyId}/events/term`,
        { params: filters }
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao listar prazos');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUT /v1/companies/:company_id/events/:id
  // Atualizar evento  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (event:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Atualiza os dados de um evento jurídico existente.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão event:manage.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param eventId   UUID do evento a ser atualizado
   * @param eventData Dados parciais para atualização
   * @returns         Evento atualizado
   */
  async updateEvent(
    companyId: string,
    eventId: string,
    eventData: IUpdateEventData
  ): Promise<IEvent> {
    try {
      const response: AxiosResponse<IEvent> = await this.api.put(
        `/v1/companies/${companyId}/events/${eventId}`,
        eventData
      );

      const data = response.data;
      if (data) {
        return data;
      }

      throw new Error('Erro ao atualizar evento');
    } catch (error) {
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DELETE /v1/companies/:company_id/events/:id
  // Remover evento  [SUPER_ADMIN | ADMINISTRATOR | ATTORNEY | ASSISTANT (event:manage)]
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Remove um evento jurídico de uma empresa.
   * Requer role SUPER_ADMIN, ADMINISTRATOR, ATTORNEY ou ASSISTANT
   * com permissão event:manage.
   *
   * @param companyId UUID da empresa/escritório de advocacia
   * @param eventId   UUID do evento a ser removido
   */
  async deleteEvent(companyId: string, eventId: string): Promise<void> {
    try {
      await this.api.delete(`/v1/companies/${companyId}/events/${eventId}`);
    } catch (error) {
      throw error;
    }
  }
}

// Exportar instância singleton — mesma convenção dos demais services
export const eventService = new EventService();
export default eventService;