import { IBaseEntity } from './IBaseEntity';

export interface IFolder extends IBaseEntity {
    company_id: string;
    company_acl_id: string;
    name: string;
}

export interface ICreateFolderData {
    name: string;
    company_acl_id: string;
}

export interface IUpdateFolderData {
    name?: string;
}
