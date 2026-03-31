import { IBaseEntity } from "./IBaseEntity";
import { ICompany } from "./ICompany";
import { ICompanyPermission } from "./ICompanyPermission";
import { ICompanyRole } from "./ICompanyRole";
import { ICreateUserData, IUpadateUserACLData, IUser } from "./IUser";


export interface ICompanyACL extends IBaseEntity {
    user_id: string;
    company_id: string;

    user: IUser;
    company: ICompany;
    company_permissions: ICompanyPermission[];
    company_roles: ICompanyRole[];
}

export interface ICreateCompanyACLData {
    createUserRequest?: ICreateUserData;

    company_roles: string[];
    user_id?: string | undefined;
    password?: string | undefined;
    company_permissions?: string[] | null | undefined;
}

export interface IUpdateCompanyACLData {
    id: string,
    user_id?: string
    updateUserRequest?: IUpadateUserACLData

    company_roles: string[];
    password?: string | undefined;
    company_permissions?: string[] | null | undefined;
}

export interface ICompanyACLFilters {
    company_id?: string;
    page?: number;
    take?: number;
}

export interface IPaginatedCompanyACL {
    company_acls: ICompanyACL[];
    total: number;
    total_pages: number;    // total de páginas calculadas
    remaining_pages: number;     // páginas que ainda faltam
    last_page: number;          // última página (igual a totalPages)
    page: number;
}

export interface IPaginatedAttorneyACL {
    company_acls: ICompanyACL[];
    total: number;
    total_pages: number;    // total de páginas calculadas
    remaining_pages: number;     // páginas que ainda faltam
    last_page: number;          // última página (igual a totalPages)
    page: number;
}