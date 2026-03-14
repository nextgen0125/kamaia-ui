import { IBaseEntity } from "./IBaseEntity";
import { ICompany } from "./ICompany";
import { ICompanyPermission } from "./ICompanyPermission";
import { ICompanyRole } from "./ICompanyRole";
import { IUser } from "./IUser";


export interface ICompanyACL extends IBaseEntity {
    user_id: string;
    company_id: string;

    user: IUser;
    company: ICompany;
    company_permissions: ICompanyPermission[];
    company_roles: ICompanyRole[];
}