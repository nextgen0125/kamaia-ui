import { IBaseEntity } from "./IBaseEntity";
import { IUser } from "./IUser";


export interface ICompany extends IBaseEntity{
    user_id: string;
    name: string;
    phone: string;
    email: string;
    nif: string;
    address: string;
    time_zone: string;
    logo_url: string;
    logo_key: string;
    email_verified: boolean;
    phone_verified: boolean;

    registering_user: IUser;
    acl: any[]
}

export interface CreateCompanyData {
    name: string;
    phone: string;
    email: string;
}

export interface UpdateCompanyData {
    name: string;
    phone: string;
    email: string;
    nif: string;
    address: string;
    time_zone: string;
    file: any;
}

export interface CompanyFilters {
    page?: number;
    take?: number;
    companyId?: string;
}

export interface PaginatedCompanies {
    companies: ICompany[];
    total: number;
    total_pages: number;    // total de páginas calculadas
    remaining_pages: number;     // páginas que ainda faltam
    last_page: number;          // última página (igual a totalPages)
    page: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// KPIs Types
// ─────────────────────────────────────────────────────────────────────────────

export type IKpiTrend = "up" | "down" | "neutral";

export interface IKpiComparativePercent {
    /** Valor absoluto do mês corrente. */
    value: number;
    /** Variação percentual em relação ao mês anterior (positivo = crescimento). */
    percentChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

export interface IKpiComparativeNumeric {
    /** Valor absoluto do mês corrente. */
    value: number;
    /** Diferença numérica em relação ao mês anterior (positivo = crescimento). */
    numericChange: number;
    /** Indicativo visual de direção. */
    trend: IKpiTrend;
}

export interface ICompanyDashboardIKPIs {
    /** Total de processos criados no mês corrente vs. mês anterior. */
    totalProcesses: IKpiComparativePercent;
    /** Clientes com ao menos um processo ativo (≠ Arquivado) no mês corrente vs. anterior. */
    activeClients: IKpiComparativePercent;
    /** Membros com role do tipo "lawyer" ingressados no mês corrente vs. anterior. */
    lawyers: IKpiComparativeNumeric;
    /** Soma das receitas (AccessTypeFinance.income) no mês corrente vs. anterior. */
    monthlyRevenue: IKpiComparativePercent;
}
