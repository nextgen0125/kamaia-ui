



// ─── Helpers ──────────────────────────────────────────────────────────────────

import { IAuditLogAction } from "@/interfaces/IAuditLog"

/**
 * Traduz o enum IAuditLogAction para um verbo legível em PT.
 * Ex: "CREATE" → "criou"
 */
export const ACTION_LABEL: Record<IAuditLogAction, string> = {
  [IAuditLogAction.CREATE]:          "criou",
  [IAuditLogAction.UPDATE]:          "actualizou",
  [IAuditLogAction.DELETE]:          "removeu",
  [IAuditLogAction.READ]:            "consultou",
  [IAuditLogAction.EXPORT]:          "exportou",
  [IAuditLogAction.IMPORT]:          "importou",
  [IAuditLogAction.LOGIN]:           "iniciou sessão",
  [IAuditLogAction.LOGOUT]:          "encerrou sessão",
  [IAuditLogAction.PASSWORD_CHANGE]: "alterou a senha",
  [IAuditLogAction.PASSWORD_RESET]:  "redefiniu a senha",
}

/**
 * Traduz o entity_type (nome da entity TypeORM) para PT legível.
 * Ex: "Case" → "um processo"
 */
export const ENTITY_LABEL: Record<string, string> = {
  Case:       "um processo",
  Client:     "um cliente",
  Task:       "uma tarefa",
  Finance:    "um lançamento financeiro",
  Document:   "um documento",
  CompanyACL: "um membro da equipe",
  Company:    "a empresa",
  User:       "um usuário",
}

export function resolveEntityLabel(entity_type: string): string {
  return ENTITY_LABEL[entity_type] ?? `um registo (${entity_type})`
}

