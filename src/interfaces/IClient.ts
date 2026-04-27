import { ICompany } from "./ICompany"
import { IInvolved } from "./IInvolved"
import { IUser } from "./IUser"


export interface IClient {
    user_id: string
    company_id: string
    nacionality: string
    birth_place: string
    address: string
    Id_validity: string
    Identity_card_number: string
    nif: string
    country: string
    city: string
    profile: string
    marital_status: string
    father_name: string
    mother_name: string
    profission: string
    company_name: string

    user: IUser
    company: ICompany
    involved: IInvolved[]
}