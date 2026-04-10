import { IBaseEntity } from './IBaseEntity';
import { ICompany } from './ICompany';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tipos de notificação suportados pelo sistema.
 * Espelha o enum NotificationType da entidade Notification no backend.
 */
export enum INotificationType {
  DEADLINE = 'deadline',
  MEETING  = 'meeting',
  TASK     = 'task',
  DOCUMENT = 'document',
  SYSTEM   = 'system',
}

/**
 * Níveis de prioridade de uma notificação.
 * Espelha o enum NotificationPriority da entidade Notification no backend.
 */
export enum INotificationPriority {
  HIGH   = 'high',
  MEDIUM = 'medium',
  LOW    = 'low',
}

// ─────────────────────────────────────────────────────────────────────────────
// Entidade principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Representa uma notificação completa retornada pela API.
 */
export interface INotification extends IBaseEntity {
  company_id: string;
  user_id:    string;
  type:       INotificationType;
  title:      string;
  message:    string;
  priority:   INotificationPriority;
  is_read:    boolean;
  /** Metadados opcionais: process_id, event_id, task_id, document_id, etc. */
  metadata:   Record<string, any> | null;

  // Relacionamento hidratado
  company: ICompany;
}

// ─────────────────────────────────────────────────────────────────────────────
// Payloads de criação e atualização
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Payload para criação de uma nova notificação.
 * Endpoint: POST /v1/companies/:company_id/notifications
 */
export interface ICreateNotificationData {
  user_id:   string;
  type:      INotificationType;
  title:     string;
  message:   string;
  priority:  INotificationPriority;
  metadata?: Record<string, any>;
}

/**
 * Payload para atualização do estado de leitura de uma notificação.
 * Endpoint: PUT /v1/companies/:company_id/notifications/:id
 *
 * Dois casos de uso mutuamente exclusivos:
 * - { is_read: boolean }       → marca uma notificação específica como lida/não lida
 * - { mark_all_read: true }    → marca todas as notificações do utilizador como lidas
 */
export interface IUpdateNotificationData {
  is_read?:       boolean;
  mark_all_read?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtros e paginação
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filtros aceitos pela rota de listagem de notificações.
 * Endpoint: GET /v1/companies/:company_id/notifications
 */
export interface INotificationFilters {
  page?:     number;
  take?:     number;
  type?:     INotificationType;
  priority?: INotificationPriority;
  is_read?:  boolean;
}

/**
 * Estrutura de resposta paginada para listagens de notificações.
 * Inclui unread_count para alimentar badges de UI sem query adicional.
 */
export interface IPaginatedNotifications {
  notifications:   INotification[];
  total:           number;
  total_pages:     number;
  remaining_pages: number;
  last_page:       number;
  page:            number;
  unread_count:    number;
}