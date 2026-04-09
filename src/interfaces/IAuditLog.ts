import { IBaseEntity } from './IBaseEntity';
import { ICompany } from './ICompany';
import { ICompanyACL } from './ICompanyACL';

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ações auditáveis pelo sistema.
 * Espelha o enum AuditLogAction da entidade AuditLog no backend.
 */
export enum IAuditLogAction {
  CREATE          = 'CREATE',
  UPDATE          = 'UPDATE',
  DELETE          = 'DELETE',
  READ            = 'READ',
  EXPORT          = 'EXPORT',
  IMPORT          = 'IMPORT',
  LOGIN           = 'LOGIN',
  LOGOUT          = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET  = 'PASSWORD_RESET',
}

// ─────────────────────────────────────────────────────────────────────────────
// Entidade principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Representa um registro de log de auditoria retornado pela API.
 * Inclui os relacionamentos hidratados (company, company_acl).
 */
export interface IAuditLog extends IBaseEntity {
  company_id:     string;
  company_acl_id: string | null;
  entity_type:    string;
  entity_id:      string;
  action:         IAuditLogAction;
  old_data:       string | null;
  new_data:       string | null;
  details:        string | null;
  ip_address:     string | null;
  user_agent:     string | null;

  // Relacionamentos hidratados
  company:     ICompany | null;
  company_acl: ICompanyACL | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtros e paginação
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filtros aceitos pela rota de listagem de audit logs.
 * Endpoint: GET /v1/companies/:company_id/audit-logs
 * Todos os campos são opcionais — envie apenas os que desejar aplicar.
 */
export interface IAuditLogFilters {
  page?:        number;
  take?:        number;
  action?:      IAuditLogAction;
  entity_type?: string;
  start_date?:  Date | string;
  end_date?:    Date | string;
  company_acl_id?: string | undefined;
}

/**
 * Estrutura de resposta paginada para listagens de audit logs.
 * Espelha IAuditLogResponse do backend com tipagem forte em audit_logs.
 */
export interface IPaginatedAuditLogs {
  audit_logs:      IAuditLog[];
  total:           number;
  total_pages:     number;
  remaining_pages: number;
  last_page:       number;
  page:            number;
}


/**
 * Shape do AuditLog com o company_acl populado pelo backend.
 * Espelho da entity + relação eager/join do backend.
 */
export interface IAuditLogEntry {
  id: string
  action: IAuditLogAction
  entity_type: string
  entity_id: string
  details?: string
  ip_address?: string
  created_at: string
  company_acl?: {
    id: string
    user?: {
      id: string
      firstName: string
      lastName: string
      avatar_url?: string
    }
  }
}