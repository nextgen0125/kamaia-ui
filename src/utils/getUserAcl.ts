import { ICompanyACL } from "@/interfaces/ICompanyACL";


export function getUserAcl (company_acls: ICompanyACL[] | undefined, company_id: string | undefined): ICompanyACL | undefined {
    return company_acls?.find(
        company_acl => company_acl.company_id === company_id
    )
}