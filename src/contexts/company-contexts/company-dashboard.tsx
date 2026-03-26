'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useParams } from 'next/navigation';
import { useCompany } from '@/hooks/queries/use-companies';
import { ICompany } from '@/interfaces/ICompany';

type CompanyDashboardContextProps = {
    company: ICompany | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
}

interface CompanyDashboardProps {
  children: ReactNode;
}


export const CompanyDashboardContext = createContext({} as CompanyDashboardContextProps);

export const useCompanyDashboardContext = () => useContext(CompanyDashboardContext);

export function CompanyDashboardContextProvider ({ children }: CompanyDashboardProps) {
    const params = useParams();

    const { data: company, isLoading, isError, error } = useCompany(params?.company_id as string);

    return (
        <CompanyDashboardContext.Provider value={{
            company,
            isLoading,
            isError,
            error,
        }}>
            {children}
        </CompanyDashboardContext.Provider>
    );
}