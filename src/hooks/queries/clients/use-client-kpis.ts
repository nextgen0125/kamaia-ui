import { useQuery } from '@tanstack/react-query';
import { clientKPIsService } from '@/services/client-kpis.service';

export function useClientProfileKPIs(companyId: string, clientId: string) {
  return useQuery({
    queryKey: ['client-profile-kpis', companyId, clientId],
    queryFn: () => clientKPIsService.getClientProfileKPIs(companyId, clientId),
    enabled: !!companyId && !!clientId,
  });
}

export function useCompanyClientsKPIs(companyId: string) {
  return useQuery({
    queryKey: ['company-clients-kpis', companyId],
    queryFn: () => clientKPIsService.getCompanyClientsKPIs(companyId),
    enabled: !!companyId,
  });
}
