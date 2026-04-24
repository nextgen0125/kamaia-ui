import { IBaseEntity } from './IBaseEntity';

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
}

export interface IDocumentFilters {
    search?: string;
    folder_id?: string;
    orderBy?: 'name' | 'created_at' | 'file_size';
    order?: 'ASC' | 'DESC';
}

export interface IDownloadData {
    url: string;
    name: string;
    mimetype: string;
}
