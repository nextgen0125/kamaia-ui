import { IBaseEntity } from './IBaseEntity';
import { ICompany } from './ICompany';
import { ICompanyACL } from './ICompanyACL';
import { IProcess } from './IProcess';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tipos de evento suportados pelo sistema.
 * Espelha o enum da entidade Event no backend.
 */
export enum IEventType {
  HEARING = 'AUDIENCIA',
  MEETING = 'REUNIAO',
  TERM = 'PRAZO',
  VIDEO = 'VIDEOCONFERENCIA',
}

export const IEventTypeLabels: Record<string, string> = {
  [IEventType.HEARING]: 'Audiência',
  [IEventType.MEETING]: 'Reunião',
  [IEventType.TERM]: 'Prazo',
  [IEventType.VIDEO]: 'Videoconferência',
};

/**
 * Níveis de prioridade de um evento.
 * Espelha o enum da entidade Event no backend.
 */
export enum IEventPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

// ─────────────────────────────────────────────────────────────────────────────
// Entidade principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Representa um evento jurídico completo retornado pela API.
 * Inclui os relacionamentos hidratados (company, company_acl, process).
 */
export interface IEvent extends IBaseEntity {
  company_id: string;
  company_acl_id: string;
  process_id: string;
  title: string;
  observations: string;
  all_day: boolean;
  start_date: Date;
  end_date: Date;
  internal_advance_alerts: number;
  location: string;
  type: IEventType;
  priority: IEventPriority;

  // Relacionamentos hidratados
  company: ICompany;
  company_acl: ICompanyACL;
  process: IProcess;
}

// ─────────────────────────────────────────────────────────────────────────────
// Payloads de criação e atualização
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload para criação de um novo evento.
 * Endpoint: POST /v1/companies/:company_id/events
 */
export interface ICreateEventData {
  company_id: string;
  process_id: string;
  title: string;
  observations: string;
  all_day: boolean;
  start_date: Date;
  end_date: Date;
  internal_advance_alerts: number;
  location: string;
  type: IEventType;
  priority: IEventPriority;
}

/**
 * Payload para atualização de um evento existente.
 * Endpoint: PUT /v1/companies/:company_id/events/:id
 * Todos os campos são opcionais — envie apenas o que for alterar.
 */
export interface IUpdateEventData {
  company_acl_id?: string;
  process_id?: string;
  title?: string;
  observations?: string;
  all_day?: boolean;
  start_date?: Date;
  end_date?: Date;
  internal_advance_alerts?: number;
  location?: string;
  type?: IEventType;
  priority?: IEventPriority;
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtros e paginação
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filtros de paginação comuns a todas as rotas de listagem de eventos.
 */
export interface IEventFilters {
  page?: number;
  take?: number;
  search?: string;
  orderBy?: "title" | "created_at";
  order?: "ASC" | "DESC";
}

/**
 * Estrutura de resposta paginada padrão para listagens de eventos.
 * Espelha as interfaces IGetAllHeringEventsResponse,
 * IGetAllMeetingEventsResponse e IGetAllTermEventsResponse do backend —
 * unificadas aqui pois são estruturalmente idênticas.
 */
export interface IPaginatedEvents {
  events: IEvent[];
  total: number;
  total_pages: number;
  remaining_pages: number;
  last_page: number;
  page: number;
}