import { IBaseEntity } from "./IBaseEntity";
import { ICompany } from "./ICompany";
import { ICompanyACL } from "./ICompanyACL";


export interface IProcess extends IBaseEntity {
    company_id: string
    company_acl_id: string
    title: string
    instance: number
    process_number: string
    action: string
    object: string
    case_value: number
    sentence_value: number
    distributed_in: Date
    status: string

    priority: IProcessPriority;
    legal_area: ILegalArea;

    company: ICompany
    company_acl: ICompanyACL
    access: AccessTypeProcecess
    service: any[]
    involved: any
    finance: any
}

export interface ICreateProcessData {
    priority: IProcessPriority,
    company_id: string,
    company_acl_id: string,
    title: string,
    instance: number,
    action: string,
    object: string,
    case_value: number,
    sentence_value: number,
    access: AccessTypeProcecess,
    distributed_in: Date,
    status: string,
    legal_area: ILegalArea;
}

export interface IUpdateProcessData {
    id: string,
   company_id: string,
   company_acl_id: string,
   title: string,
   instance: number,
   legal_area: ILegalArea;
   action: string,
   object: string,
   case_value: number,
   sentence_value: number,
   access: AccessTypeProcecess,
   distributed_in: Date,
   status: string
   priority: IProcessPriority;
}

export interface IProcessFilters {
    page?: number;
    take?: number;
    companyId?: string;
}

export interface IPaginatedProcesses {
    processes: IProcess[],
   total: number,
   total_pages: number,    // total de páginas calculadas
   remaining_pages: number,     // páginas que ainda faltam
   last_page: number,          // última página (igual a totalPages)
   page: number
}

export  enum  AccessTypeProcecess {
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
  FAMILIA = "FAMILIA",
  COMERCIAL = "COMERCIAL",
  ADMINISTRATIVO = "ADMINISTRATIVO",
  CONSTITUCIONAL = "CONSTITUCIONAL",
  TRIBUTARIO = "TRIBUTARIO",
  INTERNACIONAL = "INTERNACIONAL",
  OUTRO = "OUTRO"
}