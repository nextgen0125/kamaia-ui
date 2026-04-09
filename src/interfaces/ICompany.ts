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

