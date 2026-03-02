import { IUser } from "./IUser";


export interface ICompany {
    user_id: string;
    name: string;
    phone: string;
    email: string;
    logo_url: string;
    logo_key: string;
    email_verified: boolean;
    phone_verified: boolean;

    registering_user: IUser;
    acl: any[]
}