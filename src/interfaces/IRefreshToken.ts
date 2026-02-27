import { IUser } from "./IUser";


export interface IRefreshToken {
    id: string;
    user_id: string;
    expires_in: number;
    user: IUser;
}