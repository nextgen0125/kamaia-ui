import { IBaseEntity } from "./IBaseEntity";
import { ICompany } from "./ICompany";
import { ICompanyACL } from "./ICompanyACL";
import { IInvolved } from "./IInvolved";

export interface IProcess extends IBaseEntity {
    company_id: string
    company_acl_id: string
    title: string
    instance: number
    process_number?: string
    action?: string
    object: string
    case_value: number
    sentence_value: number
    distributed_in: Date
    description?: string
    court?: string
    court_type: "Federal" | "Estadual" | "Trabalho"
    jurisdiction?: string

    status: "active" | "pending" | "completed"
    priority: IProcessPriority
    legal_area: ILegalArea
    access: AccessTypeProcecess

    is_archived: boolean
    archived_at?: Date
    updated_at: Date

    company: ICompany
    company_acl: ICompanyACL
    service: any[]
    involveds: IInvolved[]
    finance: any
}

export interface ICreateProcessData {
    priority: IProcessPriority
    company_id: string
    company_acl_id: string
    title: string
    instance: number
    action?: string
    object: string
    case_value: number
    sentence_value: number
    access: AccessTypeProcecess
    distributed_in: Date
    status: "active" | "pending" | "completed"
    legal_area: ILegalArea
    process_number?: string
    description?: string
    court_type: "Federal" | "Estadual" | "Trabalho"
    court?: string
    jurisdiction?: string
}

export interface IUpdateProcessData {
    id: string
    company_id: string
    company_acl_id: string
    title: string
    instance: number
    legal_area: ILegalArea
    action?: string
    object: string
    case_value: number
    sentence_value: number
    access: AccessTypeProcecess
    distributed_in: Date
    status: "active" | "pending" | "completed"
    priority: IProcessPriority
    process_number?: string
    description?: string
    court_type: "Federal" | "Estadual" | "Trabalho"
    court?: string
    jurisdiction?: string
}

export interface IProcessFilters {
    page?: number;
    take?: number;
    companyId?: string;
}

export interface IPaginatedProcesses {
    processes: IProcess[]
    total: number
    total_pages: number
    remaining_pages: number
    last_page: number
    page: number
}

export enum AccessTypeProcecess {
    PRIVATE = "private",
    PUBLIC = "public",
    INVOLVED = "involved"
}

/**
 * Enum para os tipos de prioridades dos processos
 */
export enum IProcessPriority {
   HIGH = 'high',
   MEDIUM = 'medium',
   LOW = 'low'
}

/**
 * Enum para as diferentes áreas legais dos processos ou casos
 */
export enum ILegalArea {
  CIVIL = "CIVIL",
  PENAL = "PENAL",
  TRABALHO = "TRABALHO",
  FAMILIA = "FAMÍLIA",
  COMERCIAL = "COMERCIAL",
  ADMINISTRATIVO = "ADMINISTRATIVO",
  CONSTITUCIONAL = "CONSTITUCIONAL",
  TRIBUTARIO = "TRIBUTÁRIO",
  INTERNACIONAL = "INTERNACIONAL",
  OUTRO = "OUTRO"
}

export interface ILegalAreaStat {
    /** Área legal do agrupamento. */
    legal_area: ILegalArea;
    /** Total de processos nessa área. */
    total: number;
    /** Percentual em relação ao total geral de processos da empresa (2 casas decimais). */
    percentage: number;
    /** Média do valor da causa dos processos nessa área. */
    avg_case_value: number;
    /** Média do valor da sentença dos processos nessa área. */
    avg_sentence_value: number;
}

export interface IProcessesByAreaStatistics {
    /** Total geral de processos da empresa (todas as áreas). */
    total_processes: number;
    /** Estatísticas por área legal, ordenadas por total decrescente. */
    by_area: ILegalAreaStat[];
}