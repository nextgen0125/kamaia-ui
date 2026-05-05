import { IBaseEntity } from './IBaseEntity';
import { ICompany } from './ICompany';
import { ICompanyACL } from './ICompanyACL';
import { IFolder } from './IFolder';
import { IProcess } from './IProcess';

export interface IDocument extends IBaseEntity {
    company_id: string;
    company_acl_id: string;
    folder_id: string | null;
    process_id: string | null;
    name: string;
    tags: string;
    file_url: string;
    file_key: string;
    file_mimetype: string;
    file_size: string;

    company?: ICompany;
    company_acl?: ICompanyACL;
    folder?: IFolder;
    process?: IProcess;
}

export interface IPaginatedDocuments {
    documents: IDocument[];
    total: number;
    total_pages: number;
    remaining_pages: number;
    last_page: number;
    page: number;
}

export interface IDocumentFilters {
    search?: string;
    folder_id?: string;
    orderBy?: 'name' | 'created_at' | 'file_size';
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
}

export interface IDownloadData {
    url: string;
    name: string;
    mimetype: string;
}
