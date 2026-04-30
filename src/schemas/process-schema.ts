import { z } from "zod"
import { ILegalArea, IProcessPriority, AccessTypeProcecess } from "@/interfaces/IProcess"

/**
 * Schema Zod para criação e edição de processos jurídicos
 * Sincronizado com o backend createProcessSchema.ts
 */

export const processFormSchema = z.object({
  // ─── Dados Básicos ───────────────────────────────────────────────────────
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(255, "Título não pode ter mais de 255 caracteres"),

  process_number: z
    .string()
    .optional()
    .default(""),

  description: z
    .string()
    .optional()
    .default(""),

  instance: z
    .number()
    .min(1, "Instância é obrigatória"),

  legal_area: z
    .enum(
      [
        ILegalArea.CIVIL,
        ILegalArea.PENAL,
        ILegalArea.TRABALHO,
        ILegalArea.FAMILIA,
        ILegalArea.COMERCIAL,
        ILegalArea.ADMINISTRATIVO,
        ILegalArea.CONSTITUCIONAL,
        ILegalArea.TRIBUTARIO,
        ILegalArea.INTERNACIONAL,
        ILegalArea.OUTRO,
      ],
      { errorMap: () => ({ message: "Área legal inválida" }) }
    )
    .describe("Área de Direito"),

  object: z
    .string()
    .min(1, "Objeto/Assunto é obrigatório")
    .max(500, "Objeto não pode ter mais de 500 caracteres"),

  // ─── Informações do Tribunal ──────────────────────────────────────────────
  court: z
    .string()
    .optional()
    .default(""),

  court_type: z
    .enum(["Federal", "Estadual", "Trabalho"], {
      errorMap: () => ({ message: "Ramo da justiça inválido" }),
    })
    .default("Estadual"),

  jurisdiction: z
    .string()
    .optional()
    .default(""),

  // ─── Valores e Datas ──────────────────────────────────────────────────────
  case_value: z
    .number()
    .min(0, "Valor da causa deve ser maior ou igual a 0"),

  sentence_value: z
    .number()
    .min(0, "Valor da sentença deve ser maior ou igual a 0"),

  distributed_in: z
    .string()
    .datetime()
    .or(z.string().pipe(z.coerce.date()).transform(date => date.toISOString()))
    .optional()
    .describe("Data de distribuição/início do processo"),

  // ─── Controle e Status ────────────────────────────────────────────────────
  status: z
    .enum(["active", "pending", "completed"], {
      errorMap: () => ({ message: "Status inválido" }),
    })
    .default("active"),

  priority: z
    .enum([IProcessPriority.LOW, IProcessPriority.MEDIUM, IProcessPriority.HIGH], {
      errorMap: () => ({ message: "Prioridade inválida" }),
    })
    .default(IProcessPriority.MEDIUM),

  access: z
    .enum(
      [AccessTypeProcecess.PRIVATE, AccessTypeProcecess.PUBLIC, AccessTypeProcecess.INVOLVED],
      { errorMap: () => ({ message: "Tipo de acesso inválido" }) }
    )
    .default(AccessTypeProcecess.PRIVATE),

  // ─── Relacionamentos ──────────────────────────────────────────────────────
  client_id: z
    .string()
    .min(1, "Cliente é obrigatório"),

  company_acl_id: z
    .string()
    .min(1, "Advogado responsável é obrigatório"),
})

export type ProcessFormValues = z.infer<typeof processFormSchema>

/**
 * Schema para validação do servidor
 * Mapeia para a interface ICreateProcesse do backend
 */
export const processBackendSchema = z.object({
  company_acl_id: z.string().min(1, "Id do controle de acesso é obrigatório"),
  title: z.string().min(1, "Título é obrigatório"),
  instance: z.number().min(1, "Instância é obrigatória"),
  legal_area: z.string().min(1, "Área de Direito é obrigatória"),
  priority: z.string().min(1, "Prioridade do processo é obrigatória"),
  object: z.string().min(1, "Objeto é obrigatório"),
  case_value: z.number().min(1, "Valor do caso é obrigatório"),
  sentence_value: z.number().min(1, "Valor da sentença é obrigatório"),
  access: z.string().min(1, "Acesso é obrigatório"),
  distributed_in: z.string().min(1, "Distribuição é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  process_number: z.string().optional(),
  description: z.string().optional(),
  action: z.string().optional(),
  jurisdiction: z.string().optional(),
  court: z.string().optional(),
  court_type: z.string().optional(),
})
