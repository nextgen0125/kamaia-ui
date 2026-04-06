import { IBaseEntity } from "./IBaseEntity"
import { IClient } from "./IClient"
import { IProcess } from "./IProcess"

export enum AccessTypeInvolved {
    CLIENT = "client",
    ENVOLVED = "envolved"
}

export interface IInvolved extends IBaseEntity {
    process_id: string
    client_id: string
    involved_qualification: string

    type: AccessTypeInvolved
    process: IProcess
    client: IClient
}