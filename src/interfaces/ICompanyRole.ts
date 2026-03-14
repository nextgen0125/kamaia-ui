import { IBaseEntity } from "./IBaseEntity";
import { ICompanyACL } from "./ICompanyACL";


export interface ICompanyRole extends IBaseEntity {
    name: string;
    type: string;
    description: string;

    associated_acl: ICompanyACL[];
}