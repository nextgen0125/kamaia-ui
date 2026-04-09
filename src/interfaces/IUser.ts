import { IClient } from "./IClient";
import { ICompanyACL } from "./ICompanyACL";
import { IRefreshToken } from "./IRefreshToken";


export interface IUser {
    id: string;
    created_at: Date;

    firstName: string;
    lastName: string;

    full_name: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    avatar_url: string;
    avatar_key: string;
    email_verified: boolean;
    phone_verified: boolean;
    is_online: boolean;
    last_time_online: Date;
    
    roles: any[];
    refresh_token: IRefreshToken;
    registered_companies: any[];
    company_acls?: ICompanyACL[]
    costumer_infos: IClient[]
}

// Interface de criação de usuário
export interface ICreateUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
};

// Interface de atualizar usuário a partir da lista de controllo de acesso
export interface IUpadateUserACLData {
    user_id: string;
    email: string;
    password: string;                                                      
    full_name: string;
    phone: string;                          
}