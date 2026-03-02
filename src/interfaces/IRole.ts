import { IUser } from "./IUser";


export interface IRole {
    id: string;
    created_at: Date;

    name: string;
    type: string;
    description: string;
    users: IUser[];
}