



// ─── Helpers ──────────────────────────────────────────────────────────────────

import { IAuditLogAction } from "@/interfaces/IAuditLog"
import { Download, Eye, FileText, KeyRound, LogIn, LogOut, LucideIcon, Pencil, Trash2, Upload } from "lucide-react";

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

/**
 * Configuração visual por action: ícone, cor do ícone e cor do fundo.
 * Novos actions podem ser adicionados aqui sem tocar no componente.
 */
export const ACTION_CONFIG: Record<
  IAuditLogAction,
  { icon: LucideIcon; color: string; bg: string; label: string }
> = {
  [IAuditLogAction.CREATE]: {
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "criou",
  },
  [IAuditLogAction.UPDATE]: {
    icon: Pencil,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "actualizou",
  },
  [IAuditLogAction.DELETE]: {
    icon: Trash2,
    color: "text-red-500",
    bg: "bg-red-500/10",
    label: "removeu",
  },
  [IAuditLogAction.READ]: {
    icon: Eye,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    label: "consultou",
  },
  [IAuditLogAction.EXPORT]: {
    icon: Download,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "exportou",
  },
  [IAuditLogAction.IMPORT]: {
    icon: Upload,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    label: "importou",
  },
  [IAuditLogAction.LOGIN]: {
    icon: LogIn,
    color: "text-green-500",
    bg: "bg-green-500/10",
    label: "iniciou sessão",
  },
  [IAuditLogAction.LOGOUT]: {
    icon: LogOut,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    label: "encerrou sessão",
  },
  [IAuditLogAction.PASSWORD_CHANGE]: {
    icon: KeyRound,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    label: "alterou a senha",
  },
  [IAuditLogAction.PASSWORD_RESET]: {
    icon: KeyRound,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    label: "redefiniu a senha",
  },
}

export function resolveEntityLabel(entity_type: string): string {
  return ENTITY_LABEL[entity_type] ?? `um registo (${entity_type})`
}

