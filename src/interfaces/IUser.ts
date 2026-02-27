import { IRefreshToken } from "./IRefreshToken";


export interface IUser {
    id: string;
    created_at: Date;

    full_name: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    avatar_url: string;
    avatar_key: string;
    email_verified: boolean;
    phone_verified: boolean;
    
    roles: any[];
    refresh_token: IRefreshToken;
    registered_companies: any[];
    company_acls: any[]
}